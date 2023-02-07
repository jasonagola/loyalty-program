import React from 'react'
import { useNavigate } from 'react-router-dom'
import Login from './login';

function Home() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/login')
    }

    

    return (
        <div>
            <h1>Local Bike Shop</h1>
            <button onClick={handleClick}>Log In</button>
        </div>
    )
}

export default Home