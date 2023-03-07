import React from 'react'
import Loyalty from '../loyalty/Loyalty'
import Sidebar from './NavComponents/sidebar'
import './portal.css'

function Portal() {

    return (
        <div id="portal">
            <Loyalty/>
            <Sidebar/>
        </div>
    )
}

export default Portal