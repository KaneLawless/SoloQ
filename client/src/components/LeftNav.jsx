import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
export default function LeftNav() {
    return (
        <Container className="d-flex flex-column">
            <Button className="mb-3">Create a Community</Button>
            <Button className="mb-3">Create a Post</Button>
            <Link className="mb-3">Travel</Link>
            <Link className="mb-3">Gaming</Link>
            <Link className="mb-3">Hobbies</Link>
            <Link className="mb-3">Sports</Link>
            <Button className="mb-3">Add a new Category</Button>
        </Container>
    )
}
