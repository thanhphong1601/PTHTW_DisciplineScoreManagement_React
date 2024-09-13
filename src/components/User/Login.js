import { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import APIs, { authApi, endpoints } from "../../configs/APIs";
import cookie from 'react-cookies'
import { useNavigate } from "react-router-dom";
import { MyDispatchContext } from "../../configs/Contexts";

const Login = () => {
    const fields = [{
        label: "Tài khoản",
        type: "text",
        field: "username",
        placeholder: "Tài khoản của bạn"
    }, {
        label: "Mật khẩu",
        type: "password",
        field: "password",
        placeholder: "Mật khẩu của bạn"
    }]

    const [user, setUser] = useState([]);
    const [errMsg, setErrMsg] = useState("");
    const nav = useNavigate();
    const dispatch = useContext(MyDispatchContext);


    const change = (e, field) => {
        setUser(current => {
            return { ...current, [field]: e.target.value }
        })
    }

    const login = async (e) => {
        e.preventDefault();
        setErrMsg("");
        try {
            let res = await APIs.post(endpoints['login'], { ...user })
            // console.log(res.data);
            cookie.save("token", res.data);

            let u = await authApi().get(endpoints['current-user']);
            // console.info(u.data);

            dispatch({
                "type": "login",
                "payload": u.data
            })
            nav("/");
        } catch (ex) {
            console.error(ex);
            setErrMsg("Tài khoản hoặc mật khẩu không đúng! Hãy thử lại")
        }
    }

    return <>
        <div style={{ alignItems: "center", alignContent: "center", backgroundColor: "lightblue", borderRadius: 10, height: 60, marginLeft: 20, marginRight: 20, margin: 10 }}>
            <h1 className="text-center mt-3 mb-3">Đăng nhập</h1>
        </div>
        {errMsg === "" ? <></> : <>
            <Alert variant="danger">
                <div>
                    {errMsg}
                </div>
            </Alert>
        </>}

        <Form onSubmit={login}>
            {fields.map(f => <Form.Group className="mb-3" controlId={f.field}>
                <Form.Label>{f.label}</Form.Label>
                <Form.Control onChange={e => change(e, f.field)} value={user[f.field]} type={f.type} placeholder={f.placeholder} />
            </Form.Group>)}
            <Form.Group className="mb-3 text-center">
                <Button type="submit" variant="success" style={{ fontSize: 20, fontWeight: "bold" }}>Đăng Nhập</Button>
            </Form.Group>
        </Form>

    </>
}

export default Login;