import axios from 'axios'
const devBackend = 'http://localhost:4000'

export async function searchCustomerByPhone(searchTerm) {
    const options = {
        method: 'GET',
        url: devBackend + '/searchCustomer',
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
        url: devBackend + '/square/createCustomer',
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