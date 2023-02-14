import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { searchCustomerByPhone } from '../api/apiRequests';
import SearchResults from './searchResults'
import './loyalty.css'
import { rideTodayVerification } from '../../utils/helpers';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Loyalty() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [rideWindowState, setRideWindowState] = useState(false)
    const [rideInfo, setRideInfo] = useState([])

    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        setRideState()
    },[])

    async function setRideState() {
        const {rideInfo, rideWindow} = await rideTodayVerification(axiosPrivate)
        console.log(rideInfo, rideWindow)
        setRideInfo(rideInfo)
        setRideWindowState(rideWindow)
    }

    const handleChange = async (e) => {
        // setSearchTerm(e.target.value)
        if (e.target.value.length<4 && rideWindowState) {
            setSearchResults([])
        }
        if (e.target.value.length>= 4 && rideWindowState) {
            const response = await searchCustomerByPhone(e.target.value, axiosPrivate)
            console.log(`Response: `)
            console.log(response)
            setSearchResults(response)
        }
    }

    const handleClearSearch = () => {
        const searchBar = document.getElementById('searchBar')
        searchBar.value = ''
        setSearchTerm('')
        setSearchResults([])
    }

    return (
        <div id='loyalty'>
            <div class='pageHeader'>
                <h1>Casual Ride Loyalty Program</h1>
            </div>
            
            <div className='pageContent'>
                {rideWindowState ? (
                    <div className='checkInContainer'>
                    <h2>Check In Here!</h2>
                    <input id='searchBar' onChange={handleChange} autoComplete="off" placeholder='Search by Phone Number'></input>
                    <button onClick={handleClearSearch}>Clear Search</button>
                    {/* <button id='searchCustomerButton' onClick={handleClick}>Search!</button> */}
                    <SearchResults rideWindowState={rideWindowState} searchResults={searchResults} rideInfo={rideInfo}/>
                    </div>
                ): (
                    <div className='checkInContainer'>
                        <h3>No ride today, come back on ride day to login!</h3>
                    </div>
                )}

                <div id='howItWorks'>
                    <h2>How does it work?</h2>
                    <p>Every ride at Local Bike Shop NFK is assigned a discount percentage.  When you check in, you accrue value towards a discount coupon at the end of the month! Save up for something special or just make the most out of riding your bike!</p>
                </div>
            </div>

            <div id='loyaltyButtons'>
                <Link to='settings'><button>Ride Settings</button></Link>
                {/* <Link to='admin'><button>Admin Settings</button></Link> */}
            </div>
        </div>
    )
}


export default Loyalty