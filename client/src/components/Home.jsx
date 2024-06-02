import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { timeAgo } from "../../lib/common";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {


    const [postData, setPostData] = useState()
    const navigate = useNavigate()


    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get('/api/posts')
                setPostData(data)
                console.log(data)
                lastUpdated(data[0])
            } catch (error) {
                console.log(error)
            }
        }

        getData()
    }, [])


    function lastUpdated(post) {
        const posted = new Date(post.created_at)
        return timeAgo(posted)
    }


    function clickedPost(e) {
        console.log(e)
        console.log(e.target.name)
        navigate(`/posts/${e.target.name}`)
    }

    return (
        <Container fluid>
            <Row>
                <Col className="text-center">
                    <div>Left Nav</div>
                </Col>
                <Col className='col-6 text-center'>
                    {postData &&
                        postData.map((post) => {
                            return (
                                <Card name={post.id} key={post.id} >
                                    <Card.Body name={post.id}>
                                        <Card.Title name={post.id}>{post.community.name} {lastUpdated(post)} {post.owner.username}</Card.Title>
                                        <Card.Img onClick={clickedPost} name={post.id} src={post.image}></Card.Img>
                                        <Link onClick={clickedPost} to={`/posts/${post.id}`}>
                                            {post.title}
                                        </Link>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </Col>
                <Col className="text-center">
                    <div>Right Nav</div>
                </Col>
            </Row>
        </Container>
    )
}