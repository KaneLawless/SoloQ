import { Container, Col, Row } from "react-bootstrap";
import RightNav from "./RightNav";
import PostForm from "./PostForm";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

export default function CreatePost() {

    const [communityData, setCommunityData] = useState()
    const [categoryData, setCategoryData] = useState()

    useEffect(() => {
        async function getData() {
            try {
                const commRes = await axios.get('/api/communities/')
                const catRes = await axios.get('/api/categories/')

                setCommunityData(commRes.data)
                setCategoryData(catRes.data)
                console.log(commRes.data)
                console.log(catRes.data)
            } catch (error) {
                console.log(error)
            }
        }

        getData()
    }, [])


    return (
        <Container className="create-post-container">
            {(communityData && categoryData) ?
             <Row>
                <Col></Col>
                <Col className="col-7 mt-4">
                    <h3 className="mb-3">Make a Post</h3>
                    <PostForm communities={communityData} categories={categoryData} /></Col>
                <Col></Col>

                <Col className="col-3">{communityData && <RightNav communities={communityData} />}</Col>
            </Row>
            : <LoadingSpinner />}
        </Container>
    )
}