import { useEffect, useState } from "react";
import APIs, { authApi, endpoints } from "../../configs/APIs";
import { Button, Card, Col, Row } from "react-bootstrap";
import MySpinner from "../Common/MySpinner";
import { Link, useSearchParams } from "react-router-dom";


const Home = () => {
    const [activities, setActivites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [q, ] = useSearchParams();
    const [page, setPage] = useState(1);


    const loadActivities = async () => {
        setLoading(true);
        try {
            let url = `${endpoints['activities']}?page=${page}`;
            let kw = q.get('kw');
            if (kw)
                url = `${url}&kw=${kw}`
            
            console.info(url);
            let res = await authApi().get(url);
            
            if (page === 1)
                setActivites(res.data);
            else if (page > 1)
                setActivites(current => {
                    return [...current, ...res.data]
                });
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false)
        }
    }

    const loadMore = () => {
        if (!loading)
            setPage(page + 1);
    }

    useEffect(() => {
        loadActivities();
    }, [q, page])


    return (
        <>
            {loading && <MySpinner />}
            <div style={{alignItems: "center", alignContent: "center", backgroundColor: "lightblue", borderRadius: 10, height: 50, marginLeft: 20, marginRight: 20 ,margin: 10}}>
                <h1 className="text-center mt-3 mb-3">Bảng tin</h1>
            </div>
            
            <Row md={3} xs={12}>
                {activities.map(a => {
                    let url = `/activities/${a.id}`;

                    return <Col key={a.id} md={3} xs={12}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={a.image} />
                        <Card.Body>
                            <Card.Title>{a.title}</Card.Title>
                            <Card.Text>
                                {a.description}
                            </Card.Text>
                            <Link to={url} className="btn btn-primary">Chi tiết hoạt động</Link>
                        </Card.Body>
                    </Card>
                </Col>
                })}
            </Row>
            {loading && page > 1 && <MySpinner />}
            <div className="text-center mt-3 mb-3">
                <Button variant="success" onClick={loadMore}>Thêm hoạt động...</Button>
            </div>
        </>
    );
}

export default Home;

// homeHeader: {
//     alignItems: 'center',
//     backgroundColor: 'lightblue',
//     borderWidth: 2,
//     borderRadius: 5,
//     borderColor: "black",

// }