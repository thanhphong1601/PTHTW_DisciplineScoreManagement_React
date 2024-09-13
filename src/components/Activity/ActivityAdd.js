import { useContext, useEffect, useRef, useState } from "react"
import { Button, Container, FloatingLabel, Form } from "react-bootstrap"
import { MyUserContext } from "../../configs/Contexts"
import APIs, { authApi, endpoints } from "../../configs/APIs";
import MySpinner from "../Common/MySpinner";
import { useNavigate, useParams } from "react-router-dom";

const ActivityAdd = () => {
    const fields = [{
        "label": "Tiêu đề hoạt động",
        "type": "text",
        "field": "title",
        "placeholder": "Hoạt động 1..." 
    },{
        "label": "Nội dung hoạt động",
        "type": "textarea",
        "field": "description",
        "placeholder": "Đây là hoạt động nhằm giúp..." 
    }];

    let { userId } = useParams();

    const user = useContext(MyUserContext);
    const [faculties, setFaculties] = useState([]);
    const [scores, setScores] = useState([]);
    const [activity, setActivity] = useState({
        "userId": userId,
        "facultyId": 1,
        "disciplineScoreId": 1
    });
    const [title,  setTitle] = useState("");
    const [description, setDescription] = useState("");
    const image = useRef();
    const nav = useNavigate();

    if (user === null)
        nav("/login");


    const loadFaculties = async () => {
        try {
            let res = await authApi().get(endpoints['faculties']);

            setFaculties(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }
    const loadScores = async () => {
        try {
            let url = `${endpoints['scores-detail']}?studentId=${-1}`;
            let res = await authApi().get(url);

            setScores(res.data)
        } catch (ex) {
            console.error(ex);
        }
    }


    const change = (e, field) => {
        setActivity(current => {
            return { ...current, [field]: e.target.value }
        })
    }

    const createActivity = async (e) => {
        e.preventDefault();

        let form = new FormData();
  
        for (let key in activity)
            form.append(key, activity[key]);

        if (image)
            form.append('file', image.current.files[0]);


        
        try {
            let res = await authApi().post(endpoints['activities'], form, {
                headers: {
                'Content-Type': 'multipart/form-data'
            }})

            if (res.status === 201)
                nav("/");

        } catch (ex) {
            console.error(ex);
        }
    }

    useEffect(() => {
        loadFaculties();
        loadScores();
    }, [])

    return <>
        <div style={{ alignItems: "center", alignContent: "center", backgroundColor: "lightblue", borderRadius: 10, height: 60, marginLeft: 20, marginRight: 20, margin: 10 }}>
            <h1 className="text-center mt-3 mb-3">Trang tạo hoạt động</h1>
        </div>
        <Container>
            <Form onSubmit={createActivity}>
                {fields.map(f => <Form.Group className="mb-3" controlId={f.field}>
                    <Form.Label>{f.label}</Form.Label>
                    <Form.Control onChange={e => change(e, f.field)} value={activity[f.field]} type={f.type} placeholder={f.placeholder} />
                </Form.Group>)}

                <Form.Group className="mb-3" controlId="facultyId">
                    <Form.Label>Hãy chọn khoa:</Form.Label>
                    <Form.Select aria-label="Hãy chọn khoa" onChange={e => change(e, "facultyId")} value={activity["facultyId"]}>
                        {faculties == null ? <MySpinner /> : <>
                            {faculties.map(f => <option key={f.id} value={f.id}>
                                {f.name}
                            </option>)}
                        </>}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="disciplineScoreId">
                    <Form.Label>Hãy chọn loại điểm:</Form.Label>
                    <Form.Select aria-label="Hãy chọn loại điểm" onChange={e => change(e, "disciplineScoreId")} value={activity["disciplineScoreId"]}>
                        {scores == null ? <MySpinner /> : <>
                            {scores.map(s => <option key={s.id} value={s.id}>
                                {s.score} điểm - Điều {s.criterion} - Kỳ {s.semester} - Năm học {s.fromYear} - {s.toYear}
                            </option>)}
                        </>}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="image" className="mb-3">
                    <Form.Label>Thêm hình ảnh:</Form.Label>
                    <Form.Control type="file" accept=".png,.jpg" ref={image} />
                </Form.Group>
                <Form.Group className="mb-3 text-center">
                    <Button type="submit" variant="success" style={{ fontSize: 20, fontWeight: "bold" }}>Tạo hoạt động</Button>
                </Form.Group>
                
            </Form>
        </Container>
    </>
}

export default ActivityAdd;