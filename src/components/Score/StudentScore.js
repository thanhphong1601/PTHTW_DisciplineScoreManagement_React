import { useContext, useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { authApi, endpoints } from "../../configs/APIs";
import { MyUserContext } from "../../configs/Contexts";
import { useNavigate, useSearchParams } from "react-router-dom";

const StudentScore = () => {
    const dataScoreDetail = [
        [
            {
                "score": 5,
                "criterion": "1",
                "semester": 2,
                "fromYear": 2023,
                "toYear": 2024,
                "id": 1
            },
            15
        ],
        [
            {
                "score": 3,
                "criterion": "2",
                "semester": 2,
                "fromYear": 2023,
                "toYear": 2024,
                "id": 2
            },
            3
        ]
    ]
    const dataScoreTotal = [
        [
            {
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
                "facultyId": {
                    "name": "KHMT",
                    "id": 2
                },
                "classId": {
                    "name": "DH21CS02",
                    "quantity": 74,
                    "id": 2
                },
                "file": null,
                "roleName": "Chuyên Viên CTSV"
            },
            25
        ]
    ]

    const semesterData = [
        "1",
        "2",
        "3"
    ]

    const fromYearData = [
        "2023",
        "2024",
        "2025",
        "2026",
        "2027"
    ]

    const toYearData = [
        "2024",
        "2025",
        "2026",
        "2027",
        "2028"
    ]


    const user = useContext(MyUserContext);
    const [semester, setSemester] = useState(-1);
    const [fromYear, setFromYear] = useState(-1);
    const [toYear, setToYear] = useState(-1);
    const [scoresDetail, setScoresDetail] = useState([]);
    const [scoreTotal, setScoreTotal] = useState([]);
    const [render, setRender] = useState(1);
    const [q,] = useSearchParams();
    const nav = useNavigate();




    const loadScores = async () => {
        try {
            let semesterValue = q.get("semester");
            let fromYearValue = q.get("fromYear");
            let toYearValue = q.get("toYear");


            let url = `${endpoints['scores-detail']}?studentId=${user.id}&semester=${semesterValue}&fromYear=${fromYearValue}&toYear=${toYearValue}`;
            let res = await authApi().get(url);

            let urlTotal = `${endpoints['score-total']}?studentId=${user.id}&semester=${semesterValue}&fromYear=${fromYearValue}&toYear=${toYearValue}`;
            let resTotal = await authApi().get(urlTotal);

            setScoresDetail(res.data);
            setScoreTotal(resTotal.data);
            console.info(resTotal.data);

        } catch (ex) {
            console.error(ex);
        }
    }


    const findScore = async (e) => {
        e.preventDefault();

        try {
            let url = `/scores/?studentId=${user.id}&semester=${semester}&fromYear=${fromYear}&toYear=${toYear}`;
            nav(url);
            setRender(render + 1);

        } catch (ex) {
            console.error(ex);
        }
    }

    // const test = (e) => {
    //     e.preventDefault();

    //     console.info(semester);
    //     console.info(toYear);
    //     console.info(render);
    // }


    useEffect(() => {
        loadScores();
    }, [render])



    return <>
        <div style={{ alignItems: "center", alignContent: "center", backgroundColor: "lightblue", borderRadius: 10, height: 60, marginLeft: 20, marginRight: 20, margin: 10 }}>
            <h1 className="text-center mt-3 mb-3">Danh sách điểm rèn luyện</h1>
        </div>
        <Form onSubmit={findScore}>
            <Form.Group className="mb-3 d-flex flex-row" controlId="semesterId">
                <Form.Select style={{ margin: 4 }} aria-label="Hãy chọn học kỳ" onChange={e => setSemester(e.target.value)} value={semester}>
                    <option value="-1">Toàn bộ kỳ</option>
                    {semesterData.map(s => <option value={s}>
                        Kỳ {s}
                    </option>
                    )}
                </Form.Select>
                <Form.Select style={{ margin: 4 }} aria-label="Hãy chọn năm" onChange={e => setFromYear(e.target.value)} value={fromYear}>
                    <option value="-1">Đầu năm học</option>
                    {fromYearData.map(y => <option value={y}>
                        Từ {y}
                    </option>)}
                </Form.Select>
                <Form.Select style={{ margin: 4 }} aria-label="Hãy chọn năm" onChange={e => setToYear(e.target.value)} value={toYear}>
                    <option value="-1">Kết thúc năm học</option>
                    {toYearData.map(y => <option value={y}>
                        Đến {y}
                    </option>)}
                </Form.Select>
                <Button type="submit" style={{ margin: 5 }}>Tìm</Button>
            </Form.Group>
        </Form>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Điều</th>
                    <th>Điểm</th>
                    <th>Kỳ</th>
                    <th>Năm học</th>
                    <th>Điểm đạt được theo điều</th>
                </tr>
            </thead>
            <tbody>
                {scoresDetail.map(d => <tr>
                    <td>{d[0].criterion}</td>
                    <td>{d[0].score}</td>
                    <td>{d[0].semester}</td>
                    <td>{d[0].fromYear} - {d[0].toYear}</td>
                    <td>{d[1]}</td>
                </tr>)}
            </tbody>
        </Table>
        <div className="d-flex flex-row bd-highlight mb-3">
            <div className="fst-italic fs-5">Tổng điểm rèn luyện đạt được:</div>
                {scoreTotal ? <>{scoreTotal.map(s => <div className="fw-bold fs-5" style={{ marginLeft: 5 }}>
                        {s[1]} điểm
                    </div>)}</> : <>
                    <div className="fw-bold fs-5" style={{ marginLeft: 5 }}>
                        0 điểm
                    </div>
                </>}

        </div>
    </>
}

export default StudentScore;