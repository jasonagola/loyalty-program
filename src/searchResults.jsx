import React, { useState, useEffect } from 'react'
import {format, isSunday} from 'date-fns'
import './searchResults.css'
import NewCustomer from './NewCustomer'




function SearchResults(props) {
    const [searchResults, setSearchResults] = useState([])
    const [checkInWindow, setCheckInWindow] = useState(false)

    const now = new Date();
   
    
    useEffect(() => {
        setSearchResults(props.searchResults)
    },[props.searchResults])

    useEffect(() => {
       updateButtonState()
    }, [searchResults])

    const updateButtonState = () => {
        const now = new Date() 
        const checkInButton = document.querySelector('#checkInButton')
        if (!checkInButton) {
            return
        }
        if (isSunday(now) && now.getHours()>= 10 && now.getHours()<11) {
            checkInButton.onclick = checkIn
            } else {
                console.log('Working?')
                checkInButton.onclick = function() {
                }
            }
        }

    const checkIn = (e) => {

        console.log(e.target.value)
    }
    // switch (searchResults) {
    //     case (undefined): 
            
    //     case ([]): 
    //         return
    // }

    if (searchResults === undefined) {
        return (
            <div>
                <p>Oh no! Looks like we have don't have you in our system!</p>
                <p>Create New Customer</p>
                <NewCustomer/>
            </div>
        )
    }
    if (searchResults !== []) {
        return (
            <div id='searchResults'>
                {searchResults.map((result) => {
                    return (
                    <div className='searchResult' key={result.id}>
                    <p>{result.givenName} {result.familyName}</p>
                    <button id='checkInButton' className='checkIn' value={result.id}>Check in!</button>
                    </div>
                    )
                }
            )}
            </div>
        )
    } 
}



export default SearchResults