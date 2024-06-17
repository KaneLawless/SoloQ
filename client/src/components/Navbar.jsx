import { Link, useNavigate } from 'react-router-dom'
import { getUsername, isLoggedIn, removeToken, removeUsername, setToken, storeUsername } from '../../lib/common'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Form, Modal } from 'react-bootstrap';
import Logo from '../../assets/logo-4.png'

export default function Navbar() {
    const navigate = useNavigate()

    const [toggleLogout, setToggleLogout] = useState()

    const [error, setError] = useState()

    const [show, setShow] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false)
    const [userFound, setUserFound] = useState(false)

    const handleClose = () => {
        setShow(false);
        setUserFound(false)
        setIsSignUp(false)
        setError()
    }


    function returnError() {
        if (error.response.status === 401) {
            return error.response.data.detail
        } else if (error.response.status === 400) {
            if (error.response.data.username) {
                return error.response.data.username[0]
            } else if (error.response.data.password_confirmation) {
                return 'Please enter password confirmation'
            } else if (error.response.data.email) {
                return error.response.data.email
            } else if (error.response.data.non_field_errors) {
                return error.response.data.non_field_errors
            } else if (error.response.data.password) {
                return 'Please enter a password'
            }
        }
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
            setError('')
            handleClose()
            navigate('/')

        } catch (error) {
            console.log(error)
            setError(error)
        }
    }


    async function register() {
        console.log("Signing up")
        try {
            const res = await axios.post('/api/auth/register/', formData)
            console.log(res)
            storeUsername(formData.username)
            setIsSignUp(false)
            login()
        } catch (error) {
            console.log(error)
            setError(error)
        }
    }



    async function handleContinue(e) {
        if (!userFound && !isSignUp) {
            console.log("submitting form")
            e.preventDefault()
        }

        if (userFound) {
            login()
        } else if (isSignUp) {
            register()
        } else {
            console.log('Searching for user')
            try {

                const { data } = await axios.post('/api/auth/finduser/', { 'email': formData.email })
                console.log(data)
                data.found === 'true' ? setUserFound(true) : setIsSignUp(true)
                storeUsername(data.username)
            } catch (error) {
                console.log(error)
                setError(error)
            }
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }


    function handleLogout() {
        if (isLoggedIn()) {
            removeToken()
            removeUsername()
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
            <header className='mb-3'>
                <nav className="navbar navbar-expand-md nav-color">
                    <div className="container">
                        <div>
                            <Link to={'/'}>
                                <img style={{ width: '25%' }} src={Logo} alt="Home" />
                            </Link>
                        </div>
                        <div className='d-flex mx-5'>
                            <span>{isLoggedIn() && getUsername()}</span> &nbsp;&nbsp;&nbsp;
                            <span type="button" className='logout-button' onClick={handleLogout}>{isLoggedIn() ? 'Logout' : 'Log In / Sign Up'}</span>
                        </div>
                    </div>
                </nav>
            </header>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{isSignUp ? 'Register' : userFound ? `Welcome back, ${getUsername()}!` : 'Login/Register'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleContinue}>
                        <p className='text-danger'>{error ? returnError() : ''}</p>

                        <Form.Group className="mb-3" controlId="email" value={formData.email} onChange={handleChange}>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>

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
                        {isSignUp &&

                            <Form.Group
                                className="mb-3" controlId="password_confirmation"
                                value={formData.password_confirmation} onChange={handleChange}>
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="confirm password"
                                />
                            </Form.Group>



                        }

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className='comment-button' onClick={handleContinue}>
                        Continue
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}