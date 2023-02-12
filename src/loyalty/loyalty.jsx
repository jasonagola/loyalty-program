import React, {useEffect, useState} from 'react';
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

    return (
        <div>
            <h4>Every Sunday earn 5% towards a monthly coupon just by riding your bike!</h4>
            
            {rideWindowState ? (
                <div>
                <p>Check in below!</p>
                <input id='searchBar' onChange={handleChange} placeholder='Search by Phone Number'></input>
                {/* <button id='searchCustomerButton' onClick={handleClick}>Search!</button> */}
                <SearchResults rideWindowState={rideWindowState} searchResults={searchResults}/>
                </div>
            ): (
                <div>
                    <p>No ride today, come back on ride day to login!</p>
                </div>
            )}
        </div>
    )
}


export default Loyalty