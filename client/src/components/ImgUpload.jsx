import axios from "axios"
import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import LoadingSpinner from "./LoadingSpinner"


export default function ImgUpload({ formData, setFormData, sendPost }) {

    const [error, setError] = useState('')

    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET
    const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL

    const [uploading, setUploading] = useState(false)

    async function handleUpload(e) {
        const form = new FormData()
        form.append('file', e.target.files[0])
        form.append('upload_preset', uploadPreset)
        try {
            setUploading(true)
            const { data } = await axios.post(uploadUrl, form)
            console.log(data.secure_url)
            setUploading(false)
            setFormData({ ...formData, image: data.secure_url })
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }
    return (
        <>

            <Form.Group controlId="image" className="mb-3">
                <Form.Label>Select an Image</Form.Label>
                <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleUpload}
                    required
                />
            </Form.Group>
            {uploading ? <LoadingSpinner /> : <Button onClick={sendPost}>Create Post</Button>}
        </>
    )
}