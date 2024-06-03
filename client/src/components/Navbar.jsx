import { Link, NavLink, useNavigate } from 'react-router-dom'
import { isLoggedIn, removeToken } from '../../lib/common'
import SearchInput from './SearchInput'
import { useEffect, useState } from 'react'

export default function Navbar() {
    const navigate = useNavigate()


    function handleLogout() {
        if (isLoggedIn()) {
            removeToken()
            setToggleLogout(true)
            navigate('/')
        } else {
            navigate('/auth')
        }
    }

    return (
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
    )
}