import axios from './axios'
import {format} from 'date-fns'
import { dateToDb } from '../../utils/helpers'
const deployed = 'https://bike.jasonagola.dev/backend'
const devUrl = 'http://localhost:8800'
const backendUrl = devUrl

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


/////
export async function addRide(rideInfo) {
    const options = {
        method: 'POST',
        url: backendUrl + '/loyalty/Ride',
        params: {
            rideInfo: rideInfo
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

export async function deleteRide(rideInfo) {
    const options = { 
        method: 'DELETE',
        url: backendUrl + '/db/rides/delete',
        params: {
            rideInfo: rideInfo
        }
    }
    const response  = await axios.request(options)
    try {
        console.log(response.data)
        return response.data
    } catch(error) {
        console.log(error)
    }
}


export async function getRidesThisMonth() {
    const options = {
        method:'GET',
        url: backendUrl + '/loyalty/listRides'
    }
    const response = await axios.request(options)
    try {
        return response.data
    } catch(error) {
        console.log(error)
    }
}


// export async function isThereARideToday() {
//     const options = {
//         method: 'GET',
//         url: backendUrl + '/db/rides/rideTodayExists'
//     }
//     const response = await axios.request(options)
//     try {
//         return response.data
//     } catch(error) {
//         console.log(error)
//     }
// }

export async function updateRide(rideInfo) {
    const options = {
        method: 'GET',
        url: backendUrl + '/db/rides/updateRide',
        params: {
            rideInfo: rideInfo
        }
    } 
    const response = axios.request(options)
    try {
        return response.data
    } catch(error) {
        console.log(error)
    }   
}

export async function getRideToday() {
    const options = {
        method: 'GET',
        url: backendUrl + '/loyalty/ride',
        params: {
            date: dateToDb(new Date())
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