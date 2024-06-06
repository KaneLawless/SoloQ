import axios from "axios"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ListGroup, Row, Container, Col} from "react-bootstrap"

import LoadingSpinner from "./LoadingSpinner"
import LeftNav from "./LeftNav"
import RightNav from "./RightNav"
import CreateCommunity from "./CreateCommunity"


export default function Search() {

    const handleShow = () => setShow(true);
    const [show, setShow] = useState()
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
                let filtered;
                if (params.query == ' ') {
                    filtered = data
                } else {
                    filtered = data.filter((community) => community.name.toLowerCase().includes(params.query))
                }
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
                                key={community.id} className="search-list-item"
                                id={community.id} onClick={handleClick}>{community.name}
                            </ListGroup.Item>
                        }) :
                            error ? <p className="error">{error}</p> : <LoadingSpinner />
                        }
                        <button className="comment-button my-4" onClick={goBack}>Back</button>
                        <p>Can't find the Community for you? <span className=' make-one' onClick={handleShow}>Make one</span></p>
                    </ListGroup>
                </Col>
                <Col><RightNav /></Col>
                <CreateCommunity show={show} setShow={setShow} />
            </Row>

        </Container>

    )
}