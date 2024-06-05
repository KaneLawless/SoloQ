import { useState } from "react";
import { Form } from "react-bootstrap";
import ImgUpload from "./ImgUpload";
import axios from "axios";
import { getToken } from "../../lib/common";
import { useNavigate } from "react-router-dom";


export default function PostForm({ communities, categories }) {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        text: '',
        image: '',
        community: undefined,
        categories: [],
    })

    function handleChange(e) {
        console.log(e.target.id, e.target.value)
        let value;
        e.target.id === 'categories' ? value = [e.target.value] : value = e.target.value
        setFormData({ ...formData, [e.target.id]: value })
        console.log(formData)
    }

    async function sendPost(e) {
        e.preventDefault()
        console.log(formData)
        try {
            const { data } = await axios.post('/api/posts/', formData, { headers: { Authorization: `Bearer ${getToken()}` } })
            console.log(data)
            navigate(`/posts/${data.id}`)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Form >
            <Form.Group className="mb-3" controlId='title' value={formData.title} onChange={handleChange} >
                <Form.Control
                    placeholder='Post title'
                    autoFocus
                    required />
            </Form.Group>
            <Form.Group className="mb-3" controlId='text' value={formData.text} onChange={handleChange}>
                <Form.Control
                    as='textarea'
                    placeholder='Description..'
                    rows={8}
                    required />
            </Form.Group>

            <Form.Group className="mb-3" controlId='community' value={formData.community} onChange={handleChange}>
                <Form.Select>
                    <option >Select a community..</option>
                    {communities && communities.map((community) => {
                        return (
                            <option key={community.id} value={community.id}>{community.name}</option>
                        )
                    })}
                </Form.Select>

            </Form.Group>
            <Form.Group className='mb-3' controlId="categories" value={formData.categories} onChange={handleChange}>
                <Form.Select>
                    <option>Add a category..</option>
                    {categories && categories.map((category) => {
                        return (
                            <option key={category.id} value={[category.id]}>{category.name}</option>
                        )
                    })}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId='image' value={formData.image} onChange={handleChange}>
                <ImgUpload formData={formData} sendPost={sendPost} setFormData={setFormData} />
            </Form.Group>

        </Form>
    )
}