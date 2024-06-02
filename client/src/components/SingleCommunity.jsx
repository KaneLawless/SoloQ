import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import { timeAgo } from "../../lib/common";

export default function SingleCommunity() {
    const params = useParams()
    const [communityData, setCommunityData] = useState()

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(`/api/communities/${params.communityId}/`)
                setCommunityData(data)
                console.log(data)
            } catch (error) {

            }
        }

        getData()
    }, [])

    return (
        <Container>
            {communityData &&
                <Row>
                    <Col><LeftNav /></Col>
                    <Col className="col-6">
                        <h1 className="text-center">{communityData.name}</h1>
                        {communityData.posts.map((post) => {
                            return (
                                <Card key={post.id} className="mb-3">
                                    <Card.Title>{post.owner.username} {timeAgo(post.created_at)}</Card.Title>
                                    <Card.Img src={post.image} />
                                    <Card.Text>{post.text}</Card.Text>
                                    <Card.Text>{post.categories.map((category) => { return category.name + ' ' })}</Card.Text>
                                </Card>
                            )
                        })}
                    </Col>
                    <Col><RightNav /></Col>
                </Row>
            }
        </Container>
    )
}