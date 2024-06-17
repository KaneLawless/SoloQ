import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import RightNav from "./RightNav";
import SearchInput from "./SearchInput";
import LoadingSpinner from "./LoadingSpinner";


export default function SinglePost({ editTitle, editText, editing, submitChanges }) {

    const [postData, setPostData] = useState()
    const [communityData, setCommunityData] = useState()
    const [interested, setInterested] = useState()
    const [commentInput, setCommentInput] = useState()
    const [userId, setUserId] = useState()
    const params = useParams()
    const navigate = useNavigate()

    async function getData() {
        try {
            const { data } = await axios.get(`/api/posts/${params.postId}/`)
            const commData = await axios.get(`/api/communities/${data.community.id}/`)
            setPostData(data)
            setCommunityData(commData.data)
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

    }, [params])

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
            setShowAlert(false)
            handleSuccess()

            setTimeout(() => {
                setShowSuccess(false)
                navigate('/')
            }
                , 1000)
        } catch (error) {
            console.log(error)
        }
    }

    function clickEdit() {
        !editing ? navigate(`/edit-post/${params.postId}`) : handleShow()
    }


    const [showAlert, setShowAlert] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const handleSuccess = () => setShowSuccess(true)
    const handleShow = () => setShowAlert(true)


    return (
        <Container className='py-5 d-flex justify-content-center'>
            {postData ?
                <Row>
                    <Col><LeftNav /></Col>

                    <Col className="col-6 scroll">
                        <SearchInput />
                        <Alert variant="danger" onClose={() => setShowAlert(false)} show={showAlert} dismissible>
                            <Alert.Heading>Delete Post. Are you sure?</Alert.Heading>
                            <button className="comment-button" onClick={DeletePost}>Yes</button>

                        </Alert>
                        <Alert variant="success" onClose={() => setShowSuccess(false)} show={showSuccess} dismissible>
                            <Alert.Heading>Successfully deleted</Alert.Heading>
                        </Alert>
                        <Card>
                            <Card.Body>
                                <Card.Header className="d-flex justify-content-between align-items-center p-0">
                                    <Card.Text onClick={() => navigate(`/communities/${postData.community.id}`)} className="mb-0 pointer">{postData.community.name}</Card.Text>
                                    {userId === postData.owner.id ? <img src={editing ? Delete : Edit} className='edit-button' onClick={clickEdit} />
                                        : <p className="mb-1">{postData.owner.username}   {timeAgo(postData.created_at)}</p>}
                                </Card.Header>
                                <Card.Title className='my-3'>{editTitle || postData.title}</Card.Title>
                                {postData.image && <Card.Img src={postData.image} alt='post image' className="mb-2"></Card.Img>}
                                {editText || <Card.Text>{postData.text}</Card.Text>}
                                <div className="d-flex flex-row justify-content-around">
                                    <div    >
                                        {isLoggedIn() && <img onClick={handleInterestClick} src={interested ? InterestFilled : InterestHollow} className='interest-button' alt='show interest' />}
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <img src={Comment} alt='comments' className='comment-image' /> &nbsp; {postData.comments.length}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <div className="mt-2">

                            {postData.comments.map((comment) => {
                                return (
                                    <Card className="mb-2" key={`comment_${comment.id}`}>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <small className="px-3 pt-1 fw-bold">{comment.owner.username} </small>
                                            <small className="px-2">{timeAgo(comment.created_at)}</small>
                                        </div>
                                        <Card.Body>
                                            {comment.text}
                                        </Card.Body>
                                    </Card>
                                )
                            })
                            }

                        </div>
                        {isLoggedIn() ?
                            <div className="mb-3">
                                {editing || <textarea value={commentInput} onChange={handleChange} className="form-control mb-3" id="comment-input" rows="3" placeholder="Add a comment.."></textarea>}
                                <div className="d-flex flex-row justify-content-end">
                                    <button className='comment-button' onClick={handleSubmit}>{editing ? 'Save Post' : 'Post Comment'}</button>
                                </div>
                            </div>
                            : <p className="mb-4 px-2">Log in to post a comment</p>}
                    </Col>

                    <Col>{communityData && <RightNav community={communityData} />}</Col>
                </Row>
                : <LoadingSpinner />}
        </Container>
    )
}