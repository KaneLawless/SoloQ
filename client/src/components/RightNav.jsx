import { Card, Container } from "react-bootstrap"
import { useLocation, Link, useNavigate } from "react-router-dom"
import { timeAgo } from "../../lib/common"
import { useState } from "react"

export default function RightNav({ community, communities }) {

    const location = useLocation()
    const navigate = useNavigate()
    const [update, setUpdate] = useState()


    function clickPost(e) {
        setUpdate(e.target.name)
        navigate(`/posts/${e.target.name}`)
    }

    return (
        <>
            {location.pathname.includes('posts') ||
                <Container className="scroll">
                    <h3>Explore Communities</h3>
                    {communities && communities.map((community) => {
                        return (
                            <Card key={community.id} className='comm-cards-nav'>
                                <Link className='comm-link' key={`community_${community.id}`} to={`/communities/${community.id}`}>{community.name}</Link>
                            </Card>
                        )
                    })}
                </Container>
            }


            {location.pathname.includes('posts') &&
                <Container className="scroll">
                    <h3>Other Posts in <span className='pointer other-posts' onClick={() => navigate(`/communities/${community.id}`)}>{community.name}</span></h3>
                    {community.posts.map((post) => {
                        return (
                            <Card key={post.id} className="mb-2">
                                <Card.Img name={post.id} src={post.image} onClick={clickPost} className='card-image' />
                                <Link className='other-posts-link' to={`/posts/${post.id}`}>{post.title} <br /> <small>{timeAgo(post.created_at)}</small> </Link>
                            </Card>
                        )
                    })}
                </Container>}
        </>
    )
}