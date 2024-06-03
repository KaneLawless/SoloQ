import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getToken } from "../../lib/common"
import { Container, Form } from "react-bootstrap"
import SinglePost from "./SinglePost"

export default function EditPost() {

    const [postData, setPostData] = useState()

    const navigate = useNavigate()

    const params = useParams()

    const [formData, setFormData] = useState()

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(`/api/posts/${params.postId}`, { headers: { Authorization: `Bearer ${getToken()}` } })
                console.log(data)
                setPostData(data)
                setFormData({ title: data.title, text: data.text })
            } catch (error) {
                console.log(error)
            }
        }

        getData()
    }, [])

    function handleChange(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value })
        console.log(formData)
    }

    async function submitChanges() {
        try {
            const res = await axios.patch(`/api/posts/${params.postId}/`, formData, { headers: { Authorization: `Bearer ${getToken()}` } })
            console.log(res)
            navigate(`/posts/${params.postId}`)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container>
            {postData && <SinglePost
                editTitle={
                    <Form.Group className="mb-3" controlId='title' onChange={handleChange} value={formData.title}>
                        <Form.Control
                            autoFocus
                            onChange={handleChange}
                            value={formData.title}
                            required />
                    </Form.Group>
                }
                editText={
                    <Form.Group className="mb-3" controlId='text' onChange={handleChange} value={formData.text}>
                        <Form.Control
                            as='textarea'
                            onChange={handleChange}
                            value={formData.text}
                            required />
                    </Form.Group>
                }
                editing={true}
                submitChanges={submitChanges} />}
        </Container>
    )
}