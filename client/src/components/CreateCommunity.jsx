import { useState } from "react";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import { getToken } from "../../lib/common";
import { useNavigate } from "react-router-dom";
export default function CreateCommunity({ show, setShow }) {


    const handleClose = () => setShow(false)

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
            </Modal.Body>
        </Modal>
    )
}