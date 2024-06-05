import axios from "axios"
import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import LoadingSpinner from "./LoadingSpinner"
import Resizer from 'react-image-file-resizer'

export default function ImgUpload({ formData, setFormData, sendPost }) {

    const [error, setError] = useState('')

    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET
    const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL

    const [uploading, setUploading] = useState(false)

    async function handleUpload(e) {


        try {
            setUploading(true)
            //const resizedFile = await resizeFile(e.target.files[0])
            const form = new FormData()
            //console.log(resizedFile)
            console.log(e.target.files[0])
            form.append('file', e.target.files[0])
            //form.append('file', resizedFile)
            form.append('upload_preset', uploadPreset)
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
            {uploading ? <LoadingSpinner /> : <button className='comment-button' onClick={sendPost}>Create Post</button>}
        </>
    )
}