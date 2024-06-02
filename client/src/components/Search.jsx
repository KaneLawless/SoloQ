import axios from "axios"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ListGroup, Button } from "react-bootstrap"

import { getToken } from "../../lib/common"
import LoadingSpinner from "../subcomponents/LoadingSpinner"


export default function Search() {

    const options = { headers: { 'authorization': getToken() } }

    const params = useParams()
    const navigate = useNavigate()

    const [searchData, setSearchData] = useState()
    const [error, setError] = useState()

    function handleClick(e) {
        navigate(`/profile/${e.target.id}`)
    }
    // Go back to previous page
    function goBack() {
        navigate(-1) || navigate('/')
    }

    // Query search data based on search terms
    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(`/api/communities/${params.username}`, options)
                console.log(params.username)
                setSearchData(data)
            } catch (error) {
                console.log(error)
                setError(error.message)
            }
        }

        getData()
    }, [params])

    return (
        <>
            <div >
                {searchData ?
                    <p style={{ color: "black", textAlign: "center", marginTop: "30px" }}>
                        Showing results for "{params.username}" ({searchData.length})</p>
                    : error && <p className="text-danger">{error}</p>
                }
                {/*List results*/}
                <ListGroup className="search-list my-5">
                    <hr />
                    {searchData ? searchData.map(user => {
                        return <ListGroup.Item
                            key={user._id} style={{ cursor: "pointer" }}
                            id={user._id} onClick={handleClick}>{user.username}
                        </ListGroup.Item>
                    }) :
                        error ? <p className="error">{error}</p> : <LoadingSpinner />
                    }
                    <Button className="search-btn my-4" onClick={goBack}>Back</Button>

                </ListGroup>
            </div>
        </>
    )
}