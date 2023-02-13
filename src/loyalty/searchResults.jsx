import React, { useState, useEffect } from 'react'
import {format, isSunday} from 'date-fns'
import './searchResults.css'
import NewCustomer from './NewCustomer'
import CheckIn from './CheckIn'

function SearchResults(props) {
    const rideWindowState = props.rideWindowState
    const [searchResults, setSearchResults] = useState([])
    const [checkInStatus, setCheckStatus] = useState(false)
    const rideInfo = props.rideInfo

    console.log(props.searchResults)
   
    
    useEffect(() => {
        setSearchResults(props.searchResults)
    },[props.searchResults])

    if (searchResults === undefined) {
        return (
            <div id='newCustomerContainer'>
                <p></p>
                <NewCustomer/>
            </div>
        )
    }
    if (searchResults !== []) {
        return (
            <div id='searchResults'>
                {searchResults.map((result) => {
                    const customerInfo = result
                    return (
                    <div className='searchResult' key={result.id}>
                        <p>{result.givenName} {result.familyName}</p>
                        <div className='checkIn'>
                            <CheckIn customerInfo={customerInfo} rideInfo={rideInfo}/>
                        </div>
                    </div>
                    )
                }
            )}
            </div>
        )
    } 
}



export default SearchResults