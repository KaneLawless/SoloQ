import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import { Card, Col, Container, Row, Alert } from "react-bootstrap";
import { getToken, timeAgo, isLoggedIn } from "../../lib/common";

import { jwtDecode } from "jwt-decode";

import InterestFilled from '../../assets/star-filled.svg'
import InterestHollow from '../../assets/star-hollow.svg'
import Edit from '../../assets/edit.svg'
import Delete from '../../assets/delete.svg'
import Comment from '../../assets/comment.svg'
import LeftNav from "./LeftNav";

export default function SinglePost({ editTitle, editText, editing, submitChanges }) {

    const [postData, setPostData] = useState()
    const [interested, setInterested] = useState()
    const [commentInput, setCommentInput] = useState()
    const [userId, setUserId] = useState()
    const params = useParams()
    const navigate = useNavigate()

    async function getData() {
        try {
            const { data } = await axios.get(`/api/posts/${params.postId}`)
            setPostData(data)
            console.log(data)

            if (isLoggedIn()) {
                const token = jwtDecode(getToken())
                setUserId(token.user_id)
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

    async function DeletePost() {
        const token = jwtDecode(getToken())
        if (token.user_id !== postData.owner.id) return
        try {
            await axios.delete(`/api/posts/${params.postId}`, { headers: { Authorization: `Bearer ${getToken()}` } })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    function clickEdit() {
        !editing ? navigate(`/edit-post/${params.postId}`) : DeletePost()


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
                                    <Card.Text className="flex=grow-1">{postData.owner.username} {timeAgo(postData.created_at)} {postData.community.name}</Card.Text>
                                    {userId === postData.owner.id && <img src={editing ? Delete : Edit} style={{ width: '4%' }} onClick={clickEdit} />}
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