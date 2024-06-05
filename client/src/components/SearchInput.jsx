import { Form, InputGroup, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SearchImg from '../../assets/search.svg'


export default function SearchInput() {

    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    // Keep search input value in state
    function handleChange(e) {
        setSearch(e.target.value)


    }

    function handleSearch(e) {
        e.preventDefault()
        setSearch('')
        navigate(`/search/${search}`)
    }

    return (
        <>
            <Form onSubmit={handleSearch} className='search-input'>
                <InputGroup >
                    <Form.Control placeholder="Search for a Community.." id="search" value={search} onChange={handleChange} />
                    <Button variant="outline" className="search-btn" onClick={handleSearch}>
                        <img src={SearchImg} style={{width:'45%'}}/>
                    </Button>

                </InputGroup>

            </Form>
        </>
    )
}