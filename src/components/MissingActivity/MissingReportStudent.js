import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, Container, Form, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import APIs, { authApi, endpoints } from "../../configs/APIs";
import { MyUserContext } from "../../configs/Contexts";

const MissingReportStudent = () => {
    const [data, setData] = useState([
        {
            "id": 7,
            "title": "Hoạt động test 7",
            "description": "Test test test test",
            "date": 1719066388000,
            "image": "https://res.cloudinary.com/dstjar2iy/image/upload/v1719066387/zythclgsgatzfhvrmmch.jpg",
            "facultyId": {
                "name": "CNTT",
                "id": 1
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
                "name": "Fonn",
                "roleId": {
                    "id": 2,
                    "role": "ROLE_ChuyenVienCTSV"
                },
                "avatar": "https://res.cloudinary.com/dstjar2iy/image/upload/v1718273669/wjzalgllvw5qnyvm39ep.png",
                "email": "fonn@ou.edu.vn",
                "password": "$2a$10$zCBjppU3dboZyAxK99f/.OhkB197FywOxaelOlH887IB9/be8fEP.",
                "username": "admin",
                "id": 9,
                "active": true,
                "facultyId": null,
                "classId": null,
                "file": null,
                "roleName": "Chuyên Viên CTSV"
            },
            "file": null
        },
        {
            "id": 6,
            "title": "Hoạt động test 6",
            "description": "test test",
            "date": 1718965384000,
            "image": "https://res.cloudinary.com/dstjar2iy/image/upload/v1718965384/u7zucwtrxz1fkge1u0uj.jpg",
            "facultyId": {
                "name": "CNTT",
                "id": 1
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
                "name": "Fonn",
                "roleId": {
                    "id": 2,
                    "role": "ROLE_ChuyenVienCTSV"
                },
                "avatar": "https://res.cloudinary.com/dstjar2iy/image/upload/v1718273669/wjzalgllvw5qnyvm39ep.png",
                "email": "fonn@ou.edu.vn",
                "password": "$2a$10$zCBjppU3dboZyAxK99f/.OhkB197FywOxaelOlH887IB9/be8fEP.",
                "username": "admin",
                "id": 9,
                "active": true,
                "facultyId": null,
                "classId": null,
                "file": null,
                "roleName": "Chuyên Viên CTSV"
            },
            "file": null
        },
        {
            "id": 5,
            "title": "Test Activity by Admin id 9",
            "description": "hehe",
            "date": 1718965185000,
            "image": "https://res.cloudinary.com/dstjar2iy/image/upload/v1718965184/nqdlfxur5rrl4jasxtsp.jpg",
            "facultyId": {
                "name": "CNTT",
                "id": 1
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
                "name": "Fonn",
                "roleId": {
                    "id": 2,
                    "role": "ROLE_ChuyenVienCTSV"
                },
                "avatar": "https://res.cloudinary.com/dstjar2iy/image/upload/v1718273669/wjzalgllvw5qnyvm39ep.png",
                "email": "fonn@ou.edu.vn",
                "password": "$2a$10$zCBjppU3dboZyAxK99f/.OhkB197FywOxaelOlH887IB9/be8fEP.",
                "username": "admin",
                "id": 9,
                "active": true,
                "facultyId": null,
                "classId": null,
                "file": null,
                "roleName": "Chuyên Viên CTSV"
            },
            "file": null
        },
    ])

    const { activityId } = useParams();
    const user = useContext(MyUserContext);
    const [activity, setActivity] = useState([]);
    const [checkNull, setCheckNull] = useState(false);
    const proof = useRef();
    const [url, setUrl] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [errMessage, setErrMessage] = useState('');

    const nav = useNavigate();

    // if (proof) {
    //     const file = proof.current.files[0];
    //     if (file && file.type.startsWith('image/')) {
    //         const fileUrl = URL.createObjectURL(file);
    //         setUrl(fileUrl);
    //       } else {
    //         // Thông báo cho người dùng biết đây không phải là file hình ảnh
    //         alert('Please select a valid image file.');
    //       }

    // }

    const loadActivityInfo = async () => {
        try {
            let res = await authApi().get(endpoints['activity-detail'](activityId));

            setActivity(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const report = async (e) => {
        e.preventDefault();
        setInfoMessage('');
        setErrMessage('');

        if (user === null)
            setErrMessage("Hãy đăng nhập trước!");
        else {
            let form = new FormData();

            form.append('studentId', user.id);
            form.append('activityId', activityId);

            if (proof)
                form.append('file', proof.current.files[0]);
            else
                setErrMessage("Hãy chọn hình ảnh làm minh chứng!");

            try {
                let res = await authApi().post(endpoints['create-report'], form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (res.status === 201)
                    setInfoMessage("Báo thiếu thành công!");

                setTimeout(() => {
                    nav("/activities/joined");
                }, 2000); // 2000ms = 2 giây



            } catch (ex) {
                console.error(ex);
                setErrMessage("Hãy chọn hình ảnh làm minh chứng!");
            }
        }


    }


    useEffect(() => {
        loadActivityInfo();
    }, []);


    return <>
        <div style={{ alignItems: "center", alignContent: "center", backgroundColor: "lightblue", borderRadius: 10, height: 60, marginLeft: 20, marginRight: 20, margin: 10 }}>
            <h1 className="text-center mt-3 mb-3">Báo thiếu hoạt động</h1>
        </div>
        {infoMessage === "" ? <></> : <>
            <Alert variant="success">
                <div>
                    {infoMessage}
                </div>
            </Alert>
        </>}
        {errMessage === "" ? <></> : <>
            <Alert variant="danger">
                <div>
                    {errMessage}
                </div>
            </Alert>
        </>}
        <Container>
            <Form onSubmit={report}>
                <Form.Group className="mb-3" controlId="test">
                    <Form.Label>Tên hoạt động</Form.Label>
                    <Form.Control value={activity.title} disabled type="text" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="test">
                    <Form.Label>Họ tên sinh viên:</Form.Label>
                    {user !== null ? <Form.Control value={user.name} disabled type="text" /> : <Form.Control value="Hehe" disabled type="text" />}

                </Form.Group>

                <Form.Group controlId="proof" className="mb-3">
                    <Form.Label>Thêm minh chứng:</Form.Label>
                    <Form.Control type="file" accept=".png,.jpg" ref={proof} />
                </Form.Group>

                {/* 
                {proof?<>
                    <Image src={url}/>
                </>:<></>} */}

                <div className="text-center">
                    <Button type="submit" style={{ fontSize: 20, margin: 10 }} variant="danger">Báo thiếu</Button>
                </div>

            </Form>
        </Container>
    </>
}

export default MissingReportStudent;