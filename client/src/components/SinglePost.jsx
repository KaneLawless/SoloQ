import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { Card, Col, Container, Row } from "react-bootstrap";
import { getToken, timeAgo, isLoggedIn } from "../../lib/common";

import { jwtDecode } from "jwt-decode";

import InterestFilled from '../../assets/star-filled.svg'
import InterestHollow from '../../assets/star-hollow.svg'
import Comment from '../../assets/comment.svg'



export default function SinglePost() {

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
        try {
            const res = await axios.post('/api/comments/', { text: commentInput, post: params.postId },
                { headers: { Authorization: `Bearer ${getToken()}` } }
            )
            console.log(res)
            getData()

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Container>
            <Row>
                <Col></Col>
                {postData &&
                    <Col className="col-6">
                        <Card>
                            <Card.Body>
                                <Card.Text>{postData.owner.username} {timeAgo(postData.created_at)} {postData.community.name}</Card.Text>
                                <Card.Title>{postData.title}</Card.Title>
                                <Card.Img src={postData.image} alt='post image'></Card.Img>
                                <Card.Text>{postData.text}</Card.Text>
                                <div className="d-flex flex-row justify-content-around">
                                    <div onClick={handleInterestClick}>
                                        {isLoggedIn() && <img src={interested ? InterestFilled : InterestHollow} style={{ width: '7%' }} alt='show interest' />}
                                    </div>
                                    <img src={Comment} alt='comments' style={{ width: '5%' }} /> {postData.comments.length}

                                </div>
                            </Card.Body>
                        </Card>
                        <div>
                            <div className="mb-3">
                                <label htmlFor="comment-input" className="form-label"></label>
                                <textarea value={commentInput} onChange={handleChange} className="form-control mb-3" id="comment-input" rows="3" placeholder="Add a comment.."></textarea>
                                <div className="d-flex flex-row justify-content-end">
                                    <button onClick={handleSubmit}>Post Comment</button>
                                </div>
                            </div>
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