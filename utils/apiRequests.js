import axios from 'axios'
import {format} from 'date-fns'
const backendUrl = 'http://193.46.198.149/backend'

export async function searchCustomerByPhone(searchTerm) {
    const options = {
        method: 'GET',
        url: backendUrl + '/square/searchCustomer',
        params: {
            searchTerm: searchTerm 
        }
    }
    const response = await axios.request(options)
    try {
        return response.data.customers
    } catch(error) {
        console.log(error)
    }
}

export async function createCustomer(newCustomerInfo) {
    const {first_name, last_name, phone_number, email} = newCustomerInfo
    const options = {
        method: 'PUT',
        url: backendUrl + '/square/createCustomer',
        params: {
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            email: email
        }
    }
    const response = await axios.request(options)
    try {
        console.log(response)
        return response.data
    } catch(error) {
        console.log(error)
    }
    
}

////////////////////Database
//////////Customer

export async function checkCustomerExists(customer_id) {
    const options = {
        method: 'GET',
        url: backendUrl + '/db/customer/customerExists',
        params: {
            customer_id: customer_id
        },
    }
    const response = await axios(options);
    try {
        return response.data
    } catch(error) {
        console.log(error)
    }
}

export async function addCustomer(customerInfo) {
    console.log('Hitting API request function for custsomer add')
    const {id, givenName, familyName, phoneNumber, emailAddress} = customerInfo
    const options = {
        method: 'PUT',
        url: backendUrl + '/db/customer/add',
        params: {
            customer_id: id,
            first_name: givenName,
            last_name: familyName, 
            phone_number: phoneNumber,
            email: emailAddress
        }
    }
    const response = await axios.request(options)
    try {
        console.log(response.data)
        return response.data
    } catch(error) {
        console.log(error)
    }
}

export async function returnCheckInStatus(customerInfo) {
    const options = {
        method: 'GET',
        url: backendUrl + '/db/loyalty/checkInStatus',
        params: {
            customer_id: customerInfo.id,
        }
    }
    const response = await axios.request(options)
    try {
        console.log(response.data)
        return response.data
    } catch(error) {
        console.log(error)
    }
}

export async function recordCheckIn(customerInfo) {
    const customer_id = customerInfo.id
    const options = {
        method: 'PUT',
        url: backendUrl + '/db/loyalty/checkIn',
        params: {
            customer_id: customer_id,
            checkInDate: format(new Date(), 'yyyy-MM-dd')
        }
    }
    const response = await axios.request(options)
    try {
        console.log(response.data)
        return response.data
    } catch(error) {
        console.log(error)
    }
}



