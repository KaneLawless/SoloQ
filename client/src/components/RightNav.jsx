import { Card, Container } from "react-bootstrap"
import { useLocation, Link, useNavigate, useParams } from "react-router-dom"
import { timeAgo } from "../../lib/common"
import { useEffect, useState } from "react"

export default function RightNav({ community, communities }) {

    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    const [update, setUpdate] = useState()

    function clickPost(e) {
        setUpdate(e.target.name)
        navigate(`/posts/${e.target.name}`)
    }

    return (
        <>
            {(location.pathname === '/' || location.pathname.includes('communities')) &&
                <Container className="scroll">
                    <h3>Explore Communities</h3>
                    {communities.map((community) => {
                        return (
                            <Card key={community.id} className='comm-cards-nav'>
                                <Link className='comm-link' key={`community_${community.id}`} to={`/communities/${community.id}`}>{community.name}</Link>
                            </Card>
                        )
                    })}
                </Container>
            }


            {location.pathname.includes('posts') &&
                <Container>
                    <h3>Other Posts in <span className='pointer text-info' onClick={() => navigate(`/communities/${community.id}`)}>{community.name}</span></h3>
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