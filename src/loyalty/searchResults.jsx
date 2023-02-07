import React, { useState, useEffect } from 'react'
import {format, isSunday} from 'date-fns'
import './searchResults.css'
import NewCustomer from './NewCustomer'
import CheckIn from './CheckIn'

function SearchResults(props) {
    const rideWindowState = props.rideWindowState
    const [searchResults, setSearchResults] = useState([])
    const [checkInStatus, setCheckStatus] = useState(false)
   
    
    useEffect(() => {
        setSearchResults(props.searchResults)
    },[props.searchResults])

    if (searchResults === undefined) {
        return (
            <div>
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
                            <CheckIn customerInfo={customerInfo}/>
                        </div>
                        {/* <button id='checkInButton' className='checkIn' value={result.id}>Check in!</button> */}
                    </div>
                    )
                }
            )}
            </div>
        )
    } 
}



export default SearchResults