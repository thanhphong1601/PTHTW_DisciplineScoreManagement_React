import { useContext, useEffect, useState } from "react";
import { Button, Pagination, Table } from "react-bootstrap";
import { MyUserContext } from "../../configs/Contexts";
import APIs, { authApi, endpoints } from "../../configs/APIs";
import MySpinner from "../Common/MySpinner";
import { useNavigate } from "react-router-dom";

const ActivityJoined = () => {
    const data = [
        {
            "registeredDate": 1718050320000,
            "id": 6,
            "activityId": {
                "id": 2,
                "title": "Activity 2",
                "description": "hihi",
                "date": 1717859280000,
                "image": "https://res-console.cloudinary.com/dstjar2iy/thumbnails/v1/image/upload/v1715869058/a3d3NzZ6YmlvbjFwZ3Bwdmxta3A=/drilldown",
                "facultyId": {
                    "name": "KHMT",
                    "id": 2
                },
                "disciplineScoreid": {
                    "score": 3,
                    "criterion": "2",
                    "semester": 2,
                    "fromYear": 2023,
                    "toYear": 2024,
                    "id": 2
                },
                "createdBy": {
                    "name": "Test",
                    "roleId": {
                        "id": 1,
                        "role": "ROLE_SinhVien"
                    },
                    "avatar": null,
                    "email": "test@ou.edu.vn",
                    "password": "1",
                    "username": "admin1",
                    "id": 1,
                    "active": false,
                    "facultyId": {
                        "name": "CNTT",
                        "id": 1
                    },
                    "classId": {
                        "name": "DH21CS01",
                        "quantity": 75,
                        "id": 1
                    },
                    "file": null,
                    "roleName": "Sinh Viên"
                },
                "file": null
            },
            "studentId": {
                "name": "Test",
                "roleId": {
                    "id": 1,
                    "role": "ROLE_SinhVien"
                },
                "avatar": null,
                "email": "test@ou.edu.vn",
                "password": "1",
                "username": "admin1",
                "id": 1,
                "active": false,
                "facultyId": {
                    "name": "CNTT",
                    "id": 1
                },
                "classId": {
                    "name": "DH21CS01",
                    "quantity": 75,
                    "id": 1
                },
                "file": null,
                "roleName": "Sinh Viên"
            },
            "proof": "hehe",
            "file": null
        },
        {
            "registeredDate": 1718050320000,
            "id": 7,
            "activityId": {
                "id": 3,
                "title": "Test Test",
                "description": "Hế lô cả nhà huhuhuhu",
                "date": 1717951351000,
                "image": "https://res.cloudinary.com/dstjar2iy/image/upload/v1717951350/iyrdlcl8ro7ftaoviuhv.jpg",
                "facultyId": {
                    "name": "CNSH",
                    "id": 3
                },
                "disciplineScoreid": {
                    "score": 5,
                    "criterion": "1",
                    "semester": 2,
                    "fromYear": 2023,
                    "toYear": 2024,
                    "id": 1
                },
                "createdBy": {
                    "name": "Test",
                    "roleId": {
                        "id": 1,
                        "role": "ROLE_SinhVien"
                    },
                    "avatar": null,
                    "email": "test@ou.edu.vn",
                    "password": "1",
                    "username": "admin1",
                    "id": 1,
                    "active": false,
                    "facultyId": {
                        "name": "CNTT",
                        "id": 1
                    },
                    "classId": {
                        "name": "DH21CS01",
                        "quantity": 75,
                        "id": 1
                    },
                    "file": null,
                    "roleName": "Sinh Viên"
                },
                "file": null
            },
            "studentId": {
                "name": "Test",
                "roleId": {
                    "id": 1,
                    "role": "ROLE_SinhVien"
                },
                "avatar": null,
                "email": "test@ou.edu.vn",
                "password": "1",
                "username": "admin1",
                "id": 1,
                "active": false,
                "facultyId": {
                    "name": "CNTT",
                    "id": 1
                },
                "classId": {
                    "name": "DH21CS01",
                    "quantity": 75,
                    "id": 1
                },
                "file": null,
                "roleName": "Sinh Viên"
            },
            "proof": "heqheq",
            "file": null
        },
    ]

    const maxData = [];

    const [page, setPage] = useState(1);
    const user = useContext(MyUserContext);
    const [activities, setActivites] = useState([]);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    if (user === null)
        nav('/login');

    const loadActivities = async () => {
        try {
            setLoading(true);
            let url = `${endpoints['activity-joined']}?userId=${user.id}&page=${page}`;

            let res = await authApi().get(url);

            setActivites(res.data);
            if (res.data.length === 0)
                setPage(page - 1);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    const loadMore = (type, e) => {
        e.preventDefault();
        if (!loading){
            if (type === "next")
                setPage(page + 1);
            if (type === "previous")
                if (page === 1)
                    setPage(1);
                else        
                    setPage(page - 1)
        }
            
    }

    const navMissingReport = (e, id) => {
        e.preventDefault();

        nav(`/missingreport/${id}`);
    }   

    const test = (e) => {
        e.preventDefault();
        loadActivities();
    }

    useEffect(() => {
        loadActivities();
    }, [page])


    const convertTimestampToDatetime = (timestamp) => {
        let datetime = new Date(timestamp);
        return `${datetime.getHours()} giờ ${datetime.getMinutes()} phút - ${datetime.getDate()}/${datetime.getMonth()}/${datetime.getFullYear()}`;
    };


    return <>
        <div style={{ alignItems: "center", alignContent: "center", backgroundColor: "lightblue", borderRadius: 10, height: 60, marginLeft: 20, marginRight: 20, margin: 10 }}>
            <h1 className="text-center mt-3 mb-3">Danh sách hoạt động đã đăng ký</h1>
        </div>
        {loading?<MySpinner/>: <>
            <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Mã hoạt động</th>
                    <th>Tên hoạt động</th>
                    <th>Ngày đăng ký</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {activities.map(a => <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.activityId.title}</td>
                    <td>{convertTimestampToDatetime(a.registeredDate)}</td>
                    <td className="text-center" onClick={e => navMissingReport(e, a.activityId.id)}><Button>Báo thiếu</Button></td>
                </tr>)}
            </tbody>


        </Table>
        
        {/* {loading && page > 1 && <MySpinner/>} */}
        <div style={{alignContent: "center", alignItems: "center"}}>
            <Pagination>
                <Pagination.Prev onClick={e => loadMore("previous", e)}/>
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={e => loadMore("next", e)} />
            </Pagination>
        </div>
        </>}
    </>
}

export default ActivityJoined;