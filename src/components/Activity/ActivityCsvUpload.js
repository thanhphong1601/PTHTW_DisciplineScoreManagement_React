import { Alert, Button, Form } from "react-bootstrap";
import { authApi, endpoints } from "../../configs/APIs";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ActivityCsvUpload = () => {
    let { activityId } = useParams();
    const [activity, setActivity] = useState([]);
    const csvFile = useRef();
    const [infoMessage, setInfoMessage] = useState("");
    const nav = useNavigate();

    const loadActivity = async () => {
        try {
            // let res = await authApi().get(endpoints['activity-detail'](activityId));

            let res = await authApi().get(endpoints['activity-detail'](activityId));

            setActivity(res.data);

        } catch (ex) {
            console.error(ex);
        }
    }

    const uploadCsv = async (e) => {
        e.preventDefault();

        let form = new FormData();
        form.append("activityId", activityId);

        if (csvFile)
            form.append("file", csvFile.current.files[0]);

        try {
            let url = `${endpoints['activity-upload-csv']}?activityId=${activityId}`;
            let res = await authApi().post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status === 200)
                setInfoMessage("Đã upload file thành công!");

            setTimeout(() => {
                nav("/");
            }, 2000); // 2000ms = 2 giây

        } catch (ex) {
            console.error(ex);
        }

    }

    useEffect(() => {
        loadActivity();
    }, [])


    return <>
        <div style={{ alignItems: "center", alignContent: "center", backgroundColor: "lightblue", borderRadius: 10, height: 50, marginLeft: 20, marginRight: 20, margin: 10 }}>
            <h1 className="text-center mt-3 mb-3">Upload Danh Sách Đăng Ký</h1>
        </div>
        {infoMessage === "" ? <></> : <>
            <Alert variant="success">
                <div>
                    {infoMessage}
                </div>
            </Alert>
        </>}

        <Form onSubmit={uploadCsv}>
            <Form.Group className="mb-3" controlId="test">
                <Form.Label>Tên hoạt động</Form.Label>
                <Form.Control value={activity.title} disabled type="text" />
            </Form.Group>
            <Form.Group controlId="csvFile" className="mb-3">
                <Form.Label>File:</Form.Label>
                <Form.Control type="file" accept=".csv" ref={csvFile} />
            </Form.Group>
            <Form.Group className="mb-3 text-center">
                <Button type="submit" variant="success" style={{ fontSize: 20, fontWeight: "bold" }}>Upload</Button>
            </Form.Group>
        </Form>
    </>
}

export default ActivityCsvUpload;