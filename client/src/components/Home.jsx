import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { timeAgo } from "../../lib/common";
import { useNavigate, Link } from "react-router-dom";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";


export default function Home() {


    const [postData, setPostData] = useState()
    const [communityData, setCommunitydata] = useState()

    const navigate = useNavigate()


    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get('/api/posts')
                setPostData(data)
                console.log(data)

                const res = await axios.get('/api/communities/')
                setCommunitydata(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        getData()
    }, [])


    function clickedPost(e) {
        console.log(e)
        console.log(e.target.name)
        navigate(`/posts/${e.target.name}`)
    }

    return (
        <Container >
            {postData && communityData &&
                <Row>
                    <Col className="text-center">
                        <LeftNav />
                    </Col>
                    <Col className='col-6 text-center' >

                        {postData.map((post) => {
                            return (
                                <Card key={post.id} className='mb-3' >
                                    <Card.Body>
                                        <div className='d-flex justify-content-between'>
                                            <Card.Text onClick={() => navigate(`/communities/${post.community.id}`)} className='pointer' >{post.community.name}</Card.Text>
                                            <Card.Text >{post.owner.username} {timeAgo(post.created_at)} </Card.Text>
                                        </div>
                                        <Card.Title className="d-flex"><Link className='home-card-title' to={`/posts/${post.id}`}>
                                            {post.title}
                                        </Link></Card.Title>
                                        <Card.Img onClick={clickedPost} name={post.id} src={post.image} className="card-image"></Card.Img>

                                    </Card.Body>
                                </Card>
                            )
                        })
                        }
                    </Col>
                    <Col className="text-center">
                        <RightNav communities={communityData} />
                    </Col>
                </Row>
            }
        </Container>
    )
}