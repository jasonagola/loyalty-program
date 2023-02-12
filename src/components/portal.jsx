import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loyalty from '../loyalty/Loyalty'
import SearchResults from '../loyalty/searchResults'

function Portal() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('settings')
    }  

    // const linkstyle = {
    //     border-radius: 8px;
    //     border: 1px solid transparent;
    //     padding: 0.6em 1.2em;
    //     font-size: 1em;
    //     font-weight: 500;
    //     font-family: inherit;
    //     background-color: #1a1a1a;
    //     cursor: pointer;
    //     transition: border-color 0.25s;
    // }

    return (
        <div>
            <h1>Welcome to the Local Bike Shop Service Portal</h1>
            <Loyalty/>
            <SearchResults/>
            {/* <Link to='settings'style={}>Ride Settings</Link> */}
            <button onClick={handleClick}>Ride Settings</button>
        </div>
    )
}

export default Portal