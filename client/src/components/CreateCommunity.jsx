import { useEffect, useState } from "react";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import { getToken } from "../../lib/common";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
export default function CreateCommunity({ show, setShow }) {


    function handleClose() {
        setError('')
        setShow(false)
    }
    const [error, setError] = useState()
    const navigate = useNavigate()
    const [commName, setCommName] = useState()

    function makeCommunity() {
        setShow(true)
        sendCreate()
    }

    function handleChange(e) {
        setCommName(e.target.value)
    }

    async function sendCreate() {
        try {
            const { data } = await axios.post('/api/communities/', { name: commName }, { headers: { Authorization: `Bearer ${getToken()}` } })
            handleClose()
            navigate(`/communities/${data.id}`)

        } catch (error) {
            setError(error)
            console.log(error)
        }
    }




    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Community</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <InputGroup >
                        <Form.Control placeholder="Create a community" id="search" value={commName} onChange={handleChange} />
                        <Button variant="outline" className="search-btn" onClick={makeCommunity}>Create</Button>

                    </InputGroup>
                </Form>
                <p className="px-2 text-danger">{error ?
                    error.response.data.name ? error.response.data.name : 'Please log in to create a community.' : ''


                }</p>
            </Modal.Body>
        </Modal>
    )
}