import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/login')
    }

    return (
        <div>
            <h1>Local Bike Shop</h1>
            <p>To access customer loyalty screen please sign in</p>
            <button onClick={handleClick}>Log In</button>
        </div>
    )
}

export default Home