import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { authApi, endpoints } from "../../configs/APIs";

const Criterions = () => {
    const data = [
        {
            "id": 1,
            "criterionName": "1",
            "description": "hehe"
        },
        {
            "id": 2,
            "criterionName": "2",
            "description": "huhu"
        }
    ];

    const [criterions, setCriterions] = useState([]);

    const loadCriterions = async () => {
        try {
            let res = await authApi().get(endpoints['criterions']);

            setCriterions(res.data);
        } catch (ex) {
            console.info(ex);
        }
    }

    useEffect(() => {
        loadCriterions();
    }, []);

    return <>
        <div style={{ alignItems: "center", alignContent: "center", backgroundColor: "lightblue", borderRadius: 10, height: 60, marginLeft: 20, marginRight: 20, margin: 10 }}>
            <h1 className="text-center mt-3 mb-3">Danh sách điều</h1>
        </div>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Điều</th>
                    <th>Mô tả điều</th>
                </tr>

            </thead>
            <tbody>
                {criterions.map(d => <tr key={d.id}>
                    <td>{d.criterionName}</td>
                    <td>{d.description}</td>
                </tr>)}
            </tbody>
        </Table>
    </>
}

export default Criterions;