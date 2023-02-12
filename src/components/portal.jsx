import React from 'react'
import { Link } from 'react-router-dom'
import Loyalty from '../loyalty/Loyalty'
import SearchResults from '../loyalty/searchResults'

function Portal() {

    return (
        <div>
            <h1>Welcome to the Local Bike Shop Service Portal</h1>
            <Loyalty/>
            <SearchResults/>
            <Link to='settings'><button>Ride Settings</button></Link>
        </div>
    )
}

export default Portal