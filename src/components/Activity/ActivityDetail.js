import { Alert, Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import APIs, { authApi, endpoints } from "../../configs/APIs";
import { useContext, useEffect, useState } from "react";
import MySpinner from "../Common/MySpinner";
import { MyUserContext } from "../../configs/Contexts";
import { isContentEditable } from "@testing-library/user-event/dist/utils";

const ActivityDetail = () => {
    let { activityId } = useParams();
    const [activity, setActivity] = useState([]);
    const [comments, setComments] = useState([]);
    const [loadingComment, setLoadingComment] = useState(false);
    const [disableComment, setDisableComment] = useState(false);
    const [commentReq, setCommentReq] = useState({
        "content": "",
        "activityId": activityId
    })
    const [content, setContent] = useState("");
    const [newCommentLoad, setNewCommentLoad] = useState(1);
    const user = useContext(MyUserContext);
    const [errMsg, setErrMsg] = useState("");
    const nav = useNavigate();

    let urlToRegistrationPage = `/activities/registration/`
    if (user !== null)
        urlToRegistrationPage = `${urlToRegistrationPage}?userId=${user.id}&activityId=${activityId}`;
    else 
        urlToRegistrationPage = "/login";

    const loadActivity = async () => {
        try {
            // let res = await authApi().get(endpoints['activity-detail'](activityId));

            let res = await APIs.get(endpoints['activity-detail'](activityId));

            setActivity(res.data);

        } catch (ex) {
            console.error(ex);
        }
    }

    const loadComments = async () => {
        try {
            setLoadingComment(true);
            let res = await APIs.get(endpoints['comments'](activityId));

            setComments(res.data);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoadingComment(false);
        }
    }

    // const convertTimestampToDatetime = (timestamp) => {
    //     const date = new Date(timestamp);
    //     return date.toLocaleDateString();
    // };

    const convertTimestampToDatetime = (timestamp) => {
        let datetime = new Date(timestamp);
        return `${datetime.getHours()}:${datetime.getMinutes()} - ${datetime.getDate()}/${datetime.getMonth()}/${datetime.getFullYear()}`;
    };

    const comment = async (e) => {
        e.preventDefault();
        setErrMsg("");
        if (user === null)
            setErrMsg('Hãy đăng nhập để có thể bình luận hoạt động này!')
        else {
            try {
                const payload = {
                    user: user,
                    content: content,
                    activityId: activityId
                };

                setDisableComment(true);
                let res = await authApi().post(endpoints['create-comment'], payload);
                // let res = await APIs.post(endpoints['create-comment'], {...user}, {
                //     "content": "...",
                //     "activityId": "..."
                // });
                setContent("");
                setNewCommentLoad(current => current + 1);


            } catch (ex) {
                console.error(ex);
            } finally {
                setDisableComment(false);

            }
        }


    }

    const uploadCsv = async (e) => {
        e.preventDefault();
        try {
            nav(`/assistant/upload-csv/${activityId}`);
        } catch (ex) {
            console.error(ex);
        }
    }


    useEffect(() => {
        loadActivity();
        loadComments();

    }, [activityId, newCommentLoad])

    return <>
        <div className="d-flex flex-row-reverse">
            {user === null ? <></> : <>
                {user.roleId.role !== "ROLE_SinhVien" ? <>
                    <Button className="mt-3" onClick={e => uploadCsv(e)}>Upload Csv</Button>
                </> : <></>}
            </>}
        </div>

        <Container className="d-flex flex-row" style={{ margin: 10, backgroundColor: "lightgray", borderRadius: 10, padding: 10 }}>


            <div style={{ flex: 5, padding: 10 }}>
                <Image src={activity.image} fluid thumbnail />

            </div>
            <div style={{ flex: 5 }}>
                <h1 style={{ borderBottomWidth: "3px", borderBottomColor: "black", borderBottomStyle: "solid", textAlign: "center" }}>{activity.title}</h1>
                <div className="text-left" style={{ borderBottomWidth: "2px", borderBottomColor: "black", borderBottomStyle: "double" }}>
                    {activity.description}
                </div>
                <div>
                    {loadingComment ? <MySpinner /> : <>
                        {comments.map(c => <div key={c.id} style={{ backgroundColor: "darkgray", borderRadius: 10, padding: 5, margin: 4 }}>
                            <div className="d-flex flex-row justify-content-between" style={{ fontWeight: "bold", borderBottomWidth: 2, borderBottomStyle: "solid" }}>
                                {c.studentId.name}
                                <div style={{ fontWeight: "lighter", fontSize: 14 }}>{convertTimestampToDatetime(c.createdDate)}</div>
                            </div>
                            <div>{c.content}</div>
                        </div>)}
                    </>}

                </div>
                <Button className="mt-1 mb-1" variant="outline-dark">Like</Button>
                <Link to={urlToRegistrationPage} className="btn btn-outline-dark" style={{ marginLeft: 10 }}>Đăng ký hoạt động</Link>
                <div>
                    <Form onSubmit={comment} style={{ flex: 1, flexDirection: "row" }}>
                        <Form.Group >

                            {disableComment === false && user !== null ? <>
                                <Form.Control onChange={e => setContent(e.target.value)} value={content} className="mb-1" as="textarea" type="text" placeholder="Hãy nhập bình luận..." />

                            </> : <>
                                <Form.Control disabled onChange={e => setContent(e.target.value)} value={content} className="mb-1" as="textarea" type="text" placeholder="Hãy nhập bình luận..." />

                            </>}

                        </Form.Group>
                        <Button type="submit">Comment</Button>
                    </Form>

                </div>
                {errMsg === "" ? <></> : <>
                    <Alert variant="danger">
                        <div>
                            {errMsg}
                        </div>
                    </Alert>
                </>}


            </div>


        </Container>

    </>
}

export default ActivityDetail;
