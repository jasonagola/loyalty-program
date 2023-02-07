import React, {useState} from 'react'
import { createCustomer } from '../api/apiRequests'
import './newCustomer.css'

const customerNotFoundMessage = "Oh no! Looks like we don't have you in our system. Sign up below"

function NewCustomer() {
    const [message, setMessage] = useState(customerNotFoundMessage)

    const handleClick = async (e) => {
        e.preventDefault()
        const newCustomerInfo = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            phone_number: document.getElementById('phone_number').value,
            email: document.getElementById('email').value,
        }
        const response = await createCustomer(newCustomerInfo)
        console.log(response)
        const form = document.getElementById('newCustomerForm')
        form.reset()
        setMessage(`Hey, ${response.customer.givenName}! Thanks for signing up.  Use your phone number above to check in!`)
    }

    return (
        
        <div>
            <h3>{message}</h3>
            <form id='newCustomerForm'>
                <input id='first_name' placeholder='First Name'></input>
                <input id='last_name' placeholder='Last Name'></input>
                <input id='phone_number' placeholder='Phone Number'></input>
                <input id='email' placeholder='Email'></input>
                <button onClick={handleClick}>Join!</button>
            </form>
        </div>

    )
}

export default NewCustomer