import React, {useState} from 'react'
import { createCustomer } from '../utils/apiRequests'

function NewCustomer() {
    const [submit, setSubmit] = useState('')

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
    }

    return (
        <div>
            <form>
                <input id='first_name' placeholder='First Name'></input>
                <input id='last_name' placeholder='Last Name'></input>
                <input id='phone_number' placeholder='Phone Number'></input>
                <input id='email' placeholder='Email'></input>
                <button onClick={handleClick}></button>
            </form>
        </div>

    )
}

export default NewCustomer