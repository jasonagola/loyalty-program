import { addCustomer, checkCustomerExists, returnCheckInStatus } from "./apiRequests";

export async function customerVerification(customerInfo) {
    const response = await checkCustomerExists(customerInfo.id)
    const customerExists = Object.values(response[0])[0]
    console.log(customerExists)

    if (!customerExists) {
        console.log('Customer Not Found. Adding Now.')
        const response = await addCustomer(customerInfo)
    } else {
        console.log('Customer Already in Database')
    }
}

export async function checkInVerification(customerInfo) {
    const response = await returnCheckInStatus(customerInfo)
    const checkInExists = Object.values(response[0])[0]
    console.log(checkInExists)

}