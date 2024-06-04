import { Link, useLocation } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";
import { getToken, isLoggedIn } from '../../lib/common'
import { jwtDecode } from "jwt-decode";


export default function LeftNav({ posts, filteredPosts, setFilteredPosts }) {

    const location = useLocation()

    function filterPosts(e) {
        let filtered = []
        if (e.target.id === 'interested') {
            const id = getUserId()
            filtered = posts.filter((post) => post.interests.includes(id))
        } else {
            filtered = posts.filter((post) =>
                post.categories[0].id == e.target.id ||
                post.categories[1]?.id == e.target.id ||
                post.categories[2]?.id == e.target.id ||
                post.categories[3]?.id == e.target.id ||
                post.categories[4]?.id == e.target.id
            )
        }
        setFilteredPosts(filtered)

    }

    function getUserId() {
        const token = jwtDecode(getToken())
        return token.user_id
    }


    return (
        <>
            <Container className="d-flex flex-column">
                <Link to={'/create-post'}><Button className="mb-3 create-post-button">
                    {location.pathname === '/' ? 'Post to a Community' : 'Post in this Community'}
                    </Button></Link>

                {location.pathname === '/' &&

                    <div>
                        {isLoggedIn() && <Card className="mb-4 cat-nav-card pointer" id='interested' onClick={filterPosts}>My Interested Posts</Card>}
                        <Card className="mb-4 cat-nav-card">Categories</Card>
                        {filteredPosts && <Card className="mb-4 cat-nav-card pointer" onClick={() => setFilteredPosts()}>Remove Filters</Card>}
                        <Card className="mb-4"><Link className="cat-nav-card" onClick={filterPosts} id='1'>Travel</Link></Card>
                        <Card className="mb-4"><Link className="cat-nav-card" onClick={filterPosts} id='2'>Gaming</Link></Card>
                        <Card className="mb-4"><Link className="cat-nav-card" onClick={filterPosts} id='4'>Hobbies</Link></Card>
                        <Card className="mb-4"><Link className="cat-nav-card" onClick={filterPosts} id='3'>Sports</Link></Card>
                        <Card className="mb-4"><Link className="cat-nav-card" onClick={filterPosts} id='5'>Online</Link></Card>
                    </div>
                }
            </Container>

        </>
    )
}
