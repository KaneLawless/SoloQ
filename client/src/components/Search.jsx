import axios from "axios"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ListGroup, Button, Row, Container, Col } from "react-bootstrap"

import { getToken } from "../../lib/common"
import LoadingSpinner from "./LoadingSpinner"
import LeftNav from "./LeftNav"
import RightNav from "./RightNav"


export default function Search() {



    const options = { headers: { Authorization: `Bearer ${getToken()}` } }

    const params = useParams()
    const navigate = useNavigate()

    const [searchData, setSearchData] = useState()
    const [error, setError] = useState()

    function handleClick(e) {

        navigate(`/communities/${e.target.id}`)
    }
    // Go back to previous page
    function goBack() {
        navigate(-1) || navigate('/')
    }

    // Query search data based on search terms
    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(`/api/communities/`)
                const filtered = data.filter((community) => community.name.toLowerCase().includes(params.query))
                setSearchData(filtered)
            } catch (error) {
                console.log(error)
                setError(error.message)
            }
        }

        getData()
    }, [params])

    return (

        <Container>
            <Row>
                <Col><LeftNav /></Col>
                <Col className="col-6">
                    {searchData ?
                        <p style={{ color: "black", textAlign: "center", marginTop: "30px" }}>
                            Showing results for "{params.query}" ({searchData.length})</p>
                        : error && <p className="text-danger">{error}</p>
                    }
                    <ListGroup className="search-list my-5">
                        <hr />
                        {searchData ? searchData.map(community => {
                            return <ListGroup.Item
                                key={community.id} style={{ cursor: "pointer" }}
                                id={community.id} onClick={handleClick}>{community.name}
                            </ListGroup.Item>
                        }) :
                            error ? <p className="error">{error}</p> : <LoadingSpinner />
                        }
                        <Button className="search-btn my-4" onClick={goBack}>Back</Button>

                    </ListGroup>
                </Col>
                <Col><RightNav /></Col>
            </Row>
        </Container>

    )
}