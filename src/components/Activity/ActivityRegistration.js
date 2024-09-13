import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MyUserContext } from "../../configs/Contexts";
import APIs, { authApi, endpoints } from "../../configs/APIs";
import Header from "../Common/header";

const ActivityRegistration = () => {
    const [q,] = useSearchParams();
    const proof = useRef();
    const user = useContext(MyUserContext);
    const [activity, setActivity] = useState([]);
    const [request, setRequest] = useState({
        studentId: q.get("userId"),
        activityId: q.get("activityId"),
    });
    const [infoMessage, setInfoMessage] = useState("");
    const nav = useNavigate();
    
    const aId = q.get("activityId");

    if (user === null)
        nav('/login');

    //test func
    const click = () => {
        console.info(request.studentId);
        console.info(request.activityId);
    }

    const handleFileChange = () => {
        if (proof.current.files[0]) {
            setRequest(prevState => ({
                ...prevState,
                proof: proof.current.files[0]
            }));
        }
    };

    const loadActivityInfo = async () => {
        try {
            if (user !== null) {
                let res = await APIs.get(endpoints['activity-detail'](q.get("activityId")));
                setActivity(res.data);
            }

        } catch (ex) {
            console.error(ex);
        }
    }

    const register = async (e) => {
        e.preventDefault();
        setInfoMessage("");

        const form = new FormData();
        form.append('studentId', q.get("userId"));
        form.append('activityId', q.get("activityId"));

        if (proof) {
            form.append('file', proof.current.files[0]);
        }

        try {
            // let res = await APIs.post(endpoints['activity-registration'](q.get("activityId")), form, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })
            let res = await authApi().post(endpoints['activity-registration'](aId), form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setInfoMessage("Bạn đã đăng ký thành công! Bạn sẽ quay về trang hoạt động");

            setTimeout(() => {
                nav(`/activities/${aId}`);
            }, 1000); // 2000ms = 2 giây

            

        } catch (ex) {
            console.error(ex);
        }
    }

    useEffect(() => {
        loadActivityInfo();
    }, [aId])


    return <>
        <div style={{ alignItems: "center", alignContent: "center", backgroundColor: "lightblue", borderRadius: 10, height: 60, marginLeft: 20, marginRight: 20, margin: 10 }}>
            <h1 className="text-center mt-3 mb-3">Đăng ký hoạt động</h1>
        </div>
        {infoMessage === "" ? <></> : <>
            <Alert variant="success">
                <div>
                    {infoMessage}
                </div>
            </Alert>
        </>}
        <Container>
            <Form onSubmit={register}>
                <Form.Group className="mb-3" controlId="Test">
                    <Form.Label>Hoạt động</Form.Label>
                    <Form.Control value={activity.title} type="text" disabled />
                </Form.Group>
                <Form.Group className="mb-3" controlId="Test">
                    <Form.Label>Sinh viên đăng ký</Form.Label>
                    <Form.Control value={user? user.name: "Không có"} type="text" disabled />
                </Form.Group>
                <Form.Group controlId="image" className="mb-3">
                    <Form.Label>Minh chứng:</Form.Label>
                    <Form.Control type="file" accept=".png,.jpg" ref={proof} />
                </Form.Group>
                <Button type="submit">Đăng Ký Tham Gia</Button>
            </Form>

        </Container>

    </>
}

export default ActivityRegistration;