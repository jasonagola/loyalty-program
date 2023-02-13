import {format} from 'date-fns'
import { dateToDb } from '../../utils/helpers'
const deployed = 'https://bike.jasonagola.dev/backend'
const devUrl = 'http://localhost:8800'
const backendUrl = devUrl

export async function searchCustomerByPhone(searchTerm, axios) {
    const options = {
        method: 'GET',
        url: '/square/searchCustomer',
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

export async function createCustomer(newCustomerInfo, axios) {
    const {first_name, last_name, phone_number, email} = newCustomerInfo
    const options = {
        method: 'PUT',
        url: '/square/createCustomer',
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

export async function checkCustomerExists(customer_id, axios) {
    const options = {
        method: 'GET',
        url: '/loyalty/customer',
        params: {
            customer_id: customer_id
        },
    }
    const response = await axios.request(options);
    try {
        return response.data
    } catch(error) {
        console.log(error)
    }
}

export async function addCustomer(customerInfo, axios) {
    console.log('Hitting API request function for custsomer add')
    const {id, givenName, familyName, phoneNumber, emailAddress} = customerInfo
    const options = {
        method: 'PUT',
        url: '/loyalty/customer',
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

export async function returnCheckInStatus(customerInfo, rideId, axios) {
    const options = {
        method: 'GET',
        url: '/loyalty/checkInStatus',
        params: {
            customer_id: customerInfo.id,
            ride_id: rideId
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

export async function recordCheckIn(customerInfo, rideInfo, axios) {
    const customer_id = customerInfo.id
    const options = {
        method: 'PUT',
        url: '/loyalty/checkIn',
        params: {
            customer_id: customerInfo.id,
            rideInfo: rideInfo,
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
export async function addRide(rideInfo, axios) {
    const options = {
        method: 'POST',
        url: '/loyalty/ride',
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

export async function deleteRide(rideId, axios) {
    const options = { 
        method: 'DELETE',
        url: '/loyalty/ride',
        params: {
            rideId: rideId
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


export async function getRidesThisMonth(axios) {
    const options = {
        method:'GET',
        url: '/loyalty/listRides'
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

export async function updateRide(rideInfo, axios) {
    const options = {
        method: 'PUT',
        url: '/loyalty/ride',
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

export async function getRideToday(axios) {
    const options = {
        method: 'GET',
        url: '/loyalty/ride',
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