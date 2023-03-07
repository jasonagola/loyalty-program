import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from '../hooks/useAuth'

function Logout() {
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()

    const { setAuth } = useAuth()

    const handleLogout = async () => {
        const options = {
            method: 'GET',
            url: '/logout'
        }
        const response = axiosPrivate.request(options)
        try {
            setAuth({})
            navigate('/login')
        } catch(error) {
            console.log(error)
        }

    }

    return (
        
            <button onClick={handleLogout}>Logout</button>
        
    )
}

export default Logout