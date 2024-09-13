import { useContext, useState } from "react";
import { Button, Col, Container, Form, Image, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MyDispatchContext, MyUserContext } from "../../configs/Contexts";

const Header = () => {
    const [kw, setkw] = useState("");
    const nav = useNavigate();
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);


    let url = "/activities/create/"
    if (user !== null)
        url = `/activities/create/${user.id}`;

    const submit = (event) => {
        event.preventDefault();
        nav(`/?kw=${kw}`);
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary bg-info">
            <Container>
                <Navbar.Brand href="#home">DisciplineScoreManagement</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Trang chủ</Link>

                        {user === null ? <>
                            <Link to="/login" className="nav-link text-dark">Đăng Nhập</Link>
                            <Link to="/register" className="nav-link text-info">Đăng Ký</Link>
                        </> : <>
                            <NavDropdown title="Hoạt động" id="basic-nav-dropdown">
                                {user.roleId.role !== "ROLE_SinhVien" ? <>
                                    <Link to={url} className="nav-link">Tạo Hoạt Động</Link>

                                    <Link to="/activities/joined" className="nav-link">Xem Hoạt Động Đã Tham Gia</Link>
                                </> : <Link to="/activities/joined" className="nav-link">Xem Hoạt Động Đã Tham Gia</Link>
                                }

                                {/* <Link to="/missingreport" className="nav-link">Báo thiếu</Link> */}

                            </NavDropdown>
                            <NavDropdown title="Điểm rèn luyện" id="basic-nav-dropdown">
                                <Link to="/criterions" className="nav-link">Xem Điều</Link>
                                <Link to="/scores/" className="nav-link">Xem Điểm Cá Nhân</Link>

                            </NavDropdown>

                            {user.role == 2 || user.role == 3}
                            <NavDropdown title="Trợ lý" id="basic-nav-dropdown">
                                <Link to="/assistant/missingreport" className="nav-link">Xem báo thiếu</Link>
                                <Link to="/assistant/stats/class" className="nav-link">Thống kê theo lớp</Link>
                            </NavDropdown>

                            
                            <Link to="/" className="nav-link text-info">
                                <Image src={user.avatar} width="40" rounded /> {user.username}
                            </Link>
                            <Link onClick={() => dispatch({
                                "type": "logout"
                            })} className="nav-link text-info">Đăng Xuất</Link>
                        </>}




                    </Nav>
                </Navbar.Collapse>
                <Form inline onSubmit={submit}>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                                value={kw}
                                onChange={e => setkw(e.target.value)}
                                type="text"
                                placeholder="Tìm tên hoạt động..."
                                className=" mr-sm-2"
                            />
                        </Col>
                        <Col xs="auto">
                            <Button type="submit">Tìm</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Navbar>
    );
}

export default Header;