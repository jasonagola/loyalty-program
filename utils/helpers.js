import { addCustomer, checkCustomerExists, returnCheckInStatus } from "./apiRequests";
import { isBefore } from "date-fns";

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
    return checkInExists

}

//     const i = 0
//     const j = 0
//     const sortedDates = []
//     while (i<left.length || j < right.length) {
//         if (i === left.length) {
//             sortedDates.push(right[j])
//         }
//     }
// }

