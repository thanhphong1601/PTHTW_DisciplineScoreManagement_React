import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Image, Row, Table } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { authApi, endpoints } from "../../configs/APIs";
import MySpinner from "../Common/MySpinner";
import Swal from "sweetalert2";

const MissingReportAssistant = () => {
    const data = [
        [
            {
                "registeredDate": 1718079420000,
                "proof": "https://res-console.cloudinary.com/dstjar2iy/media_explorer_thumbnails/d93e1bef917f8c8f0ce2070960dc7c36/detailed",
                "status": "Pending",
                "id": 1,
                "activityId": {
                    "id": 1,
                    "title": "Test Activity",
                    "description": "hehe",
                    "date": 1717686420000,
                    "image": "https://res-console.cloudinary.com/dstjar2iy/thumbnails/v1/image/upload/v1715869058/a3d3NzZ6YmlvbjFwZ3Bwdmxta3A=/drilldown",
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
                "file": null
            },
            {
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
            {
                "id": 1,
                "title": "Test Activity",
                "description": "hehe",
                "date": 1717686420000,
                "image": "https://res-console.cloudinary.com/dstjar2iy/thumbnails/v1/image/upload/v1715869058/a3d3NzZ6YmlvbjFwZ3Bwdmxta3A=/drilldown",
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
            {
                "name": "CNTT",
                "id": 1
            },
            {
                "name": "DH21CS01",
                "quantity": 75,
                "id": 1
            }
        ],
        [
            {
                "registeredDate": 1718079600000,
                "proof": "https://res-console.cloudinary.com/dstjar2iy/media_explorer_thumbnails/d93e1bef917f8c8f0ce2070960dc7c36/detailed",
                "status": "Pending",
                "id": 2,
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
                "file": null
            },
            {
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
            {
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
            {
                "name": "CNTT",
                "id": 1
            },
            {
                "name": "DH21CS01",
                "quantity": 75,
                "id": 1
            }
        ]
    ]
    const [faculties, setFaculties] = useState([]);
    const [facultyId, setFacultyId] = useState(0);
    const [reports, setReports] = useState([]);
    const [infoMessage, setInfoMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const loadFaculties = async () => {
        try {
            let res = await authApi().get(endpoints['faculties']);

            setFaculties(res.data);
        } catch (ex) {
            console.error(ex);
        }
    };

    const findReportByFaculty = async (e) => {
        e.preventDefault();
        setLoading(true);
        setInfoMessage('');

        let url = `${endpoints['reports']}?facultyId=${facultyId}`;

        try {
            let res = await authApi().get(url);

            setReports(res.data);

        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    const confirmReport = async (e, id) => {
        e.preventDefault();
        setInfoMessage('');
        let url = `${endpoints['reports']}${id}/`;

        try {
            let res = await authApi().post(url);

            if (res.status === 200)
                setInfoMessage("Đã xác nhận thành công");
        } catch (ex) {
            console.error(ex);
        }
    }

    const deleteReport = async (e, id) => {
        e.preventDefault();   
        // Swal.fire({
        //     title: 'Are you sure?',
        //     text: "You won't be able to revert this!",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Yes, delete it!'
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         // Perform the delete action here
        //         Swal.fire(
        //             'Deleted!',
        //             'Your item has been deleted.',
        //             'success'
        //         );
        //     }
        // });
        setInfoMessage('');
        let url = `${endpoints['reports']}${id}`;

        try {
            let res = await authApi().delete(url);

            if (res.status === 204)
                setInfoMessage("Đã hủy bản báo thiếu");
        } catch (ex) {
            console.error(ex);
        }
    }

    useEffect(() => {
        loadFaculties();

    }, [reports]);


    return <>
        <div style={{ alignItems: "center", alignContent: "center", backgroundColor: "lightblue", borderRadius: 10, height: 60, marginLeft: 20, marginRight: 20, margin: 10 }}>
            <h1 className="text-center mt-3 mb-3">Danh sách báo thiếu</h1>
        </div>
        {infoMessage === "" ? <></> : <>
            <Alert variant="success">
                <div>
                    {infoMessage}
                </div>
            </Alert>
        </>}
        <Container>


            <Form onSubmit={findReportByFaculty} inline className="text-center d-flex justify-content-center" style={{ margin: 20 }}>
                <Row>
                    <Col xs="auto">
                        <Form.Select aria-label="Tìm theo khoa" value={facultyId} onChange={e => setFacultyId(e.target.value)}>
                            <option value="0">Tất cả các khoa</option>
                            {faculties == null ? <MySpinner /> : <>
                                {faculties.map(f => <option key={f.id} value={f.id}>
                                    {f.name}
                                </option>)}
                            </>}
                        </Form.Select>
                    </Col>
                    <Col xs="auto">
                        <Button type="submit">Tìm</Button>
                    </Col>
                </Row>
            </Form>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Mã phiếu</th>
                        <th>Tên sinh viên</th>
                        <th>Lớp</th>
                        <th>Khoa</th>
                        <th>Tên hoạt động</th>
                        <th>Minh chứng tham gia</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {loading === true ? <MySpinner /> : <>
                        {reports.map(d => <>
                            {d[0].status === "Pending" || d[0].status === "Confirmed"}
                            <tr key={d[0].id}>
                                <td>{d[0].id}</td>
                                <td>{d[1].name}</td>
                                <td>{d[1].classId.name}</td>
                                <td>{d[1].facultyId.name}</td>
                                <td>{d[2].title}</td>
                                <td className="text-center">
                                    <Image src={d[0].proof} width="100" />
                                </td>
                                <td className="text-center" >
                                    {d[0].status === "Pending" ? <>
                                        <Button onClick={e => confirmReport(e, d[0].id)} variant="success">Xác nhận</Button>
                                        <Button onClick={e => deleteReport(e, d[0].id)} variant="danger">Hủy</Button>

                                    </> : d[0].status === "Confirmed" ? <>
                                        <Button variant="success">Đã xác nhận</Button>
                                    </> : <>
                                        <Button variant="danger">Đã hủy</Button>
                                    </>}

                                </td>
                            </tr>
                        </>
                        )}
                    </>}

                </tbody>


            </Table>
        </Container>
    </>
}

export default MissingReportAssistant;