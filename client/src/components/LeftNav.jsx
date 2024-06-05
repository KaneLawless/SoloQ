import { Link, useLocation } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";
import { getToken, isLoggedIn } from '../../lib/common'
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function LeftNav({ posts, filteredPosts, setFilteredPosts }) {

    const location = useLocation()
    const [activeFilter, setActiveFilter] = useState()

    function filterPosts(e) {
        console.log("setting filter id: ", e.target.id)
        setActiveFilter(e.target.id)
        console.log(e.target.id == 'interested')

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

    function reset() {
        setActiveFilter()
        setFilteredPosts()
    }

    return (
        <>
            <Container className="d-flex flex-column scroll">
                {location.pathname.includes('create-post') || <Link to={'/create-post'}><Button className="mb-3 create-post-button">
                    {location.pathname.includes('communities') ? 'Post in this Community' : 'Post to a Community'}
                </Button></Link>}

                {location.pathname === '/' &&

                    <div>
                        {isLoggedIn() && <Card
                            className={activeFilter == 'interested' ? "mb-4 cat-nav-card interested-filter active" : "mb-4 cat-nav-card interested-filter"}
                            id='interested' onClick={filterPosts}>My Interested Posts</Card>}
                        <div>
                            <br />
                        </div>
                        <div className="mb-4 ">Categories</div>
                        {filteredPosts && <Card className="mb-4 cat-nav-card pointer remove-filters " onClick={reset}>Remove Filters</Card>}
                        <Card className="mb-3"><Button className={activeFilter == 1 ? "cat-nav-card filters active" : "cat-nav-card filters"} onClick={filterPosts} id='1'>Travel</Button></Card>
                        <Card className="mb-3"><Button className={activeFilter == 2 ? "cat-nav-card filters active" : "cat-nav-card filters"} onClick={filterPosts} id='2'>Gaming</Button></Card>
                        <Card className="mb-3"><Button className={activeFilter == 4 ? "cat-nav-card filters active" : "cat-nav-card filters"} onClick={filterPosts} id='4'>Hobbies</Button></Card>
                        <Card className="mb-3"><Button className={activeFilter == 3 ? "cat-nav-card filters active" : "cat-nav-card filters"} onClick={filterPosts} id='3'>Sports</Button></Card>
                        <Card className="mb-3"><Button className={activeFilter == 5 ? "cat-nav-card filters active" : "cat-nav-card filters"} onClick={filterPosts} id='5'>Online</Button></Card>
                    </div>
                }
            </Container>

        </>
    )
}
