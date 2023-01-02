import React, {useState} from 'react';
import { searchCustomerByPhone } from '../utils/apiRequests';
import SearchResults from './searchResults'
import './searchCustomers.css'

function SearchCustomer() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleChange = async (e) => {
        // setSearchTerm(e.target.value)
        if (e.target.value.length<4) {
            setSearchResults([])
        }
        if (e.target.value.length>= 4) {
            const response = await searchCustomerByPhone(e.target.value)
            setSearchResults(response)
        }
    }

    // const handleClick = async () => {
    //     const response = await searchCustomerByPhone(searchTerm)
    //     console.log(response)
    //     setSearchResults(response)
    // }

    return (
        <div>
            <h4>Every Sunday earn 5% towards a monthly coupon just by riding your bike!</h4>
            <p>Check in below!</p>
            <input id='searchBar' onChange={handleChange} placeholder='Search by Phone Number'></input>
            {/* <button id='searchCustomerButton' onClick={handleClick}>Search!</button> */}
            <SearchResults searchResults={searchResults}/>
        </div>
    )
}


export default SearchCustomer