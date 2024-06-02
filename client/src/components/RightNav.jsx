import { Container } from "react-bootstrap"
import { useLocation, Link } from "react-router-dom"

export default function RightNav({ communities }) {

    const location = useLocation()

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
            
        </>
    )
}