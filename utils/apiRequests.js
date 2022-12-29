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