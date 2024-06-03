import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from 'axios'
import { Card, Col, Container, Row } from "react-bootstrap";
import { getToken, timeAgo, isLoggedIn } from "../../lib/common";

import { jwtDecode } from "jwt-decode";

import InterestFilled from '../../assets/star-filled.svg'
import InterestHollow from '../../assets/star-hollow.svg'
import Edit from '../../assets/edit.svg'
import Comment from '../../assets/comment.svg'
import LeftNav from "./LeftNav";

function handleChange(e) {
    console.log(e.target.id, e.target.value)
    let value;
    e.target.id === 'categories' ? value = [e.target.value] : value = e.target.value
    setFormData({ ...formData, [e.target.id]: value })
    console.log(formData)
}

export default function SinglePost({ editTitle, editText, editing, submitChanges }) {

    const [postData, setPostData] = useState()
    const [interested, setInterested] = useState()
    const [commentInput, setCommentInput] = useState()
    const params = useParams()

    async function getData() {
        try {
            const { data } = await axios.get(`/api/posts/${params.postId}`)
            setPostData(data)
            console.log(data)

            if (isLoggedIn()) {
                const token = jwtDecode(getToken())
                console.log(token)
                data.interests.includes(token.user_id) ? setInterested(true) : setInterested(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        getData()

    }, [])

    async function handleInterestClick() {
        try {
            await axios.patch(`/api/posts/${params.postId}/interest/`, '',
                { headers: { Authorization: `Bearer ${getToken()}` } })
            setInterested(!interested)
        } catch (error) {
            console.log(error)
        }
    }


    function handleChange(e) {
        setCommentInput(e.target.value)
    }


    async function handleSubmit(e) {
        if (editing) {
            submitChanges()
        } else {
            try {
                const res = await axios.post('/api/comments/', { text: commentInput, post: params.postId },
                    { headers: { Authorization: `Bearer ${getToken()}` } }
                )
                console.log(res)
                setCommentInput('')
                getData()

            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <Container>
            <Row>
                <Col><LeftNav /></Col>
                {postData &&
                    <Col className="col-6">
                        <Card>
                            <Card.Body>
                                <Card.Header className="d-flex justify-content-between">
                                    <Card.Text>{postData.owner.username} {timeAgo(postData.created_at)} {postData.community.name}</Card.Text>
                                    <Link to={`/edit-post/${params.postId}`}><img src={Edit} style={{ width: '4%' }} /></Link>
                                </Card.Header>
                                <Card.Title>{editTitle || postData.title}</Card.Title>
                                <Card.Img src={postData.image} alt='post image'></Card.Img>
                                {editText || <Card.Text>{postData.text}</Card.Text>}
                                <div className="d-flex flex-row justify-content-around">
                                    <div onClick={handleInterestClick}>
                                        {isLoggedIn() && <img src={interested ? InterestFilled : InterestHollow} style={{ width: '7%' }} alt='show interest' />}
                                    </div>
                                    <img src={Comment} alt='comments' style={{ width: '5%' }} /> {postData.comments.length}

                                </div>
                            </Card.Body>
                        </Card>
                        <div>
                            {isLoggedIn() ?
                                <div className="mb-3">
                                    {editing || <textarea value={commentInput} onChange={handleChange} className="form-control mb-3" id="comment-input" rows="3" placeholder="Add a comment.."></textarea>}
                                    <div className="d-flex flex-row justify-content-end">
                                        <button onClick={handleSubmit}>{editing ? 'Save Post' : 'Post Comment'}</button>
                                    </div>
                                </div>
                                : 'Log in to post a comment'}
                            {postData.comments.map((comment) => {
                                return (
                                    <Card className="mb-2" key={`comment_${comment.id}`}>
                                        <Card.Title>{comment.owner.username} <small>{timeAgo(comment.created_at)}</small></Card.Title>
                                        <Card.Body>
                                            {comment.text}
                                        </Card.Body>
                                    </Card>
                                )
                            })
                            }

                        </div>
                    </Col>
                }
                <Col></Col>
            </Row>
        </Container>
    )
}