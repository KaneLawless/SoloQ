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
            {location.pathname === '/' &&
                <Container>
                    <h3>Explore Communities</h3>
                    {communities.map((community) => {
                        return <Link key={`community_${community.id}`} to={`/communities/${community.id}`}>{community.name}</Link>
                    })}
                </Container>
            }

            {location.pathname.includes('posts') &&
                <Container>
                    <h3>Other Posts in {community.name}</h3>
                    {community.posts.map((post) => {
                        return (
                            <Card key={post.id}>
                                <Card.Img name={post.id} src={post.image} onClick={clickPost} />
                                <Link to={`/posts/${post.id}`}>{post.title} {timeAgo(post.created_at)} </Link>
                            </Card>
                        )
                    })}
                </Container>}
        </>
    )
}