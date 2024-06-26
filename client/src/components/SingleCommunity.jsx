import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import { timeAgo } from "../../lib/common";
import SearchInput from "./SearchInput";
import LoadingSpinner from "./LoadingSpinner";

export default function SingleCommunity() {
    const params = useParams()
    const [communityData, setCommunityData] = useState()
    const [communities, setCommunities] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(`/api/communities/${params.communityId}/`)
                const commData = await axios.get('/api/communities/')
                setCommunityData(data)
                setCommunities(commData.data)
                console.log(data)
            } catch (error) {

            }
        }

        getData()
    }, [params])


    function clickedPost(e) {
        console.log(e.target.name)
        navigate(`/posts/${e.target.name}`)
    }

    return (
        <Container className='d-flex justify-content-center pb-5'>
            {communityData ?
                <Row>
                    <Col><LeftNav /></Col>
                    <Col className="col-6 scroll">
                        <h1 className="text-center">{communityData.name}</h1>
                        <SearchInput />
                        {communityData.posts.length > 0 ? 
                        communityData.posts.map((post) => {
                            return (
                                <Card key={post.id} className="mb-3 p-3">
                                    <div className="d-flex justify-content-between">
                                        <Card.Title>{post.owner.username}</Card.Title>
                                        <p> {timeAgo(post.created_at)}</p>
                                    </div>
                                    <Card.Img className='card-image' name={post.id} onClick={clickedPost} src={post.image} />
                                    <Link className='comm-card-title' to={`/posts/${post.id}`}>{post.title}</Link>
                                    <Card.Text>{post.text.split('.')[0]}{'...'}</Card.Text>
                                    <Card.Text>category: {post.categories.map((category) => { return category.name + ' ' })}</Card.Text>
                                </Card>
                            )
                        })
                        : <p style={{fontSize: '1.6rem', textAlign: 'center', marginTop:'4px'}}>No posts yet...</p>
                    }
                    </Col>
                    <Col><RightNav communities={communities} /></Col>
                </Row>
                : <LoadingSpinner />}
        </Container>
    )
}