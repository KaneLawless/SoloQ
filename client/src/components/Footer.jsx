import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Footer() {

    return (
        <footer className='footer'>
            <Container>
                <Row className='footer-row'>

                    <Col className='footer-col'>
                        <Link target='_blank' to='https://github.com/KaneLawless' className='footer-link '>
                            <FontAwesomeIcon icon={faGithub} /> Kane Lawless
                        </Link>
                    </Col>

                </Row>
            </Container>
        </footer>
    )
}
