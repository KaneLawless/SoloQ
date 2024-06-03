import { Link, NavLink, useNavigate } from 'react-router-dom'
import { isLoggedIn, removeToken, setToken } from '../../lib/common'
import SearchInput from './SearchInput'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';


export default function Navbar() {
    const navigate = useNavigate()

    const [toggleLogout, setToggleLogout] = useState()


    const [show, setShow] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false)
    const [userFound, setUserFound] = useState(false)

    
    

    const handleClose = () => {
        setShow(false);
        setUserFound(false)
        setIsSignUp(false)
    }
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
    })

    async function login() {
        try {
            const { data } = await axios.post('/api/auth/login/', { "email": formData.email, "password": formData.password })
            setToken(data.access)
            handleClose()
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }


    async function register() {
        console.log("Signing up")
        try {
            const res = await axios.post('/api/auth/register/', formData)
            console.log(res)
            setIsSignUp(false)
            login()
        } catch (error) {
            console.log(error)
        }
    }



    async function handleContinue() {
        if (userFound) {
            login()
        } else if (isSignUp) {
            register()
        } else {
            console.log('Searching for user')
            try {
                const { data } = await axios.post('/api/auth/finduser/', { 'email': formData.email })
                data.found === 'true' ? setUserFound(true) : setIsSignUp(true)
            } catch (error) {
                console.log(error)
            }
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }


    function handleLogout() {
        if (isLoggedIn()) {
            removeToken()
            setToggleLogout(true)
            navigate('/')
        } else {
            handleShow()
        }
    }

    
    useEffect(() => {

    }, [toggleLogout])

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-md header" style={{ background: '#E6E6E6' }}>
                    <div className="container ">
                        <div >
                            <Link className="navbar-brand" to={'/'}>
                                <img className="home-logo" src={'#'} alt="Home" />
                            </Link>
                        </div>
                        <div />
                        <SearchInput />
                        <div className='d-flex'>
                            <NavLink className="nav-item" to="/profile">Profile</NavLink>
                            <span type="button" className="nav-item" onClick={handleLogout}>{isLoggedIn() ? 'Logout' : 'Log In / Sign Up'}</span>
                        </div>
                        <div />
                    </div>
                </nav>
            </header>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login/Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="email" value={formData.email} onChange={handleChange}>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <>
                            {isSignUp &&

                                <Form.Group
                                    className="mb-3" controlId="username" value={formData.username} onChange={handleChange}>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        placeholder="username"
                                        autoFocus
                                    />
                                </Form.Group>
                            }
                            {(userFound || isSignUp) &&
                                <Form.Group
                                    className="mb-3" controlId="password" value={formData.password} onChange={handleChange}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="password"
                                        autoFocus={userFound ? true : false}
                                    />
                                </Form.Group>
                            }
                            {isSignUp && <Form.Group
                                className="mb-3" controlId="password_confirmation"
                                value={formData.password_confirmation} onChange={handleChange}>
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="confirm password"
                                />
                            </Form.Group>
                            }
                        </>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Back
                    </Button>
                    <Button variant="primary" onClick={handleContinue}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal></>
    )
}