import React, { useState, useEffect } from 'react'
import {format, isSunday} from 'date-fns'
import './searchResults.css'
import NewCustomer from './NewCustomer'
import CheckIn from './CheckIn'
import { customerVerification, checkInVerification } from '../utils/helpers'




function SearchResults(props) {
    const [searchResults, setSearchResults] = useState([])
    const [checkInStatus, setCheckStatus] = useState(false)
   
    
    useEffect(() => {
        setSearchResults(props.searchResults)
    },[props.searchResults])

    // useEffect(() => {
    //    updateButtonState()
    // }, [searchResults])

    // const updateButtonState = () => {
    //     const now = new Date() 
    //     const checkInButton = document.querySelector('#checkInButton')
    //     if (!checkInButton) {
    //         return
    //     }
    //     if (isSunday(now) && now.getHours()>= 10 && now.getHours()<11) {
    //         checkInButton.onclick = checkIn
    //         } else {
    //             checkInButton.onclick = function() {
    //             }
    //         }
    //     }

    // const checkIn = (e) => {

    //     customerVerification(result)
        
    // }

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
                {searchResults.map(async (result) => {
                    const customerInfo = result
                    return (
                    <div className='searchResult' key={result.id}>
                    <p>{result.givenName} {result.familyName}</p>
                    <CheckIn customerInfo={customerInfo} checkInStatus={checkInStatus}/>
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