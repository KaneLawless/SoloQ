import { Container, Col, Row } from "react-bootstrap";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import PostForm from "./PostForm";
import { useEffect, useState } from "react";
import axios from "axios";

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
        <Container>
            <Row>
                <Col><LeftNav /></Col>
                <Col className="col-6"><PostForm communities={communityData} categories={categoryData}/></Col>
                <Col><RightNav /></Col>
            </Row>
        </Container>
    )
}