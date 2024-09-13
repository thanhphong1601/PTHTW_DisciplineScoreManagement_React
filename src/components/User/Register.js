import { useEffect, useRef, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import APIs, { endpoints } from "../../configs/APIs";
import MySpinner from "../Common/MySpinner";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const fields = [{
        label: "Họ tên",
        type: "text",
        field: "name",
        placeholder: "Họ tên của bạn"
    }, {
        label: "Email",
        type: "email",
        field: "email",
        placeholder: "Email của bạn"
    }, {
        label: "Tài khoản",
        type: "text",
        field: "username",
        placeholder: "Tài khoản của bạn"
    }, {
        label: "Mật khẩu",
        type: "password",
        field: "password",
        placeholder: "Mật khẩu của bạn"
    }, {
        label: "Xác nhận mật khẩu",
        type: "password",
        field: "confirm",
        placeholder: "Xác nhận mật khẩu"
    }]

    const [user, setUser] = useState({
        "facultyId": 1,
        "classId": 1
    });
    const [faculties, setFaculties] = useState([]);
    const [studentClasses, setStudentClasses] = useState();
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const nav = useNavigate();

    const avatar = useRef();


    const loadFaculties = async () => {
        try {
            let res = await APIs.get(endpoints['faculties']);


            setFaculties(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const loadClasses = async () => {
        try {
            let res = await APIs.get(endpoints['classes']);


            setStudentClasses(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }


    useEffect(() => {
        loadFaculties();
        loadClasses();
    }, [])

    const change = (e, field) => {
        setUser(current => {
            return { ...current, [field]: e.target.value }
        })
    }

    const register = async (e) => {
        e.preventDefault();
        setErrMsg("");
        let form = new FormData();
  
        for (let key in user)
            if (key !== 'confirm')
                form.append(key, user[key]);

        if (avatar)
            form.append('file', avatar.current.files[0]);

        try {
            if (user.confirm === user.password) {
                // console.log('User:', user);
                let res = await APIs.post(endpoints['register'], form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                if (res.status === 201)
                    nav("/login");
            }

            else
                setErrMsg("Mật khẩu xác nhận sai. Hãy nhập lại!");

        } catch (ex) {
            console.error(ex);
            setErrMsg("Email không hợp lệ. Hãy kiểm tra lại email!");
        }
    }


    return <>
        <div style={{ alignItems: "center", alignContent: "center", backgroundColor: "lightblue", borderRadius: 10, height: 60, marginLeft: 20, marginRight: 20, margin: 10 }}>
            <h1 className="text-center mt-3 mb-3">Trang đăng ký</h1>
        </div>
        {errMsg == "" ? <></> : <>
            <Alert variant="danger">
                <div>
                    {errMsg}
                </div>
            </Alert>
        </>}

        <Container>
            <Form onSubmit={register}>
                {fields.map(f => <Form.Group className="mb-3" controlId={f.field}>
                    <Form.Label>{f.label}</Form.Label>
                    <Form.Control onChange={e => change(e, f.field)} value={user[f.field]} type={f.type} placeholder={f.placeholder} />
                </Form.Group>
                )}
                <Form.Group className="mb-3" controlId="facultyId">
                    <Form.Label>Hãy chọn khoa:</Form.Label>
                    <Form.Select aria-label="Hãy chọn khoa" onChange={e => change(e, "facultyId")} value={user["facultyId"]}>
                        {faculties == null ? <MySpinner /> : <>
                            {faculties.map(f => <option key={f.id} value={f.id}>
                                {f.name}
                            </option>)}
                        </>}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="classId">
                    <Form.Label>Hãy chọn lớp:</Form.Label>
                    <Form.Select aria-label="Hãy chọn lớp" onChange={e => change(e, "classId")} value={user["classId"]}>
                        {studentClasses == null ? <MySpinner /> : <>
                            {studentClasses.map(c => <option key={c.id} value={c.id}>
                                {c.name}
                            </option>)}
                        </>}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="avatar" className="mb-3">
                    <Form.Label>Ảnh đại diện:</Form.Label>
                    <Form.Control type="file" accept=".png,.jpg" ref={avatar} />
                </Form.Group>
                <Form.Group className="mb-3 text-center">
                    <Button type="submit" variant="success" style={{ fontSize: 20, fontWeight: "bold" }}>Đăng ký</Button>
                </Form.Group>
            </Form>
        </Container>

    </>
}

export default Register;