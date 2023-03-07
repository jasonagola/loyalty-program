import React, {useState} from 'react'
import Logout from '../../authentication/logout'
import {Link} from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import "./sidebar.css"

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const auth = useAuth()
    
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div id="sidebar">
            <button className='sidebarToggle' onClick={toggleSidebar}> 
                {isCollapsed ? "☰": "X"} 
            </button>

            <div className={`sidebar ${isCollapsed ? "collapsed": ""}`}>
                
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                {auth.auth.username ? <p>Welcome, {auth.auth.username}!</p> : 
                    <div>
                        
                    </div>
                }
                <div className='sidebarLinks'>
                    <Link className='sidebarLink' to='/loyalty'>Loyalty</Link>
                    <Link className='sidebarLink' to='/pedalpusher'>Pedal Pusher</Link>
                    <Link className='sidebarLink' to='/invoices'>Invoices</Link>
                    
                    {auth.auth.username ? <Logout/> : ''}
                </div>
            </div>
        </div>
    )
}

export default Sidebar