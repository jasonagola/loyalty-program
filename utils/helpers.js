import { addCustomer, checkCustomerExists, getRideToday, returnCheckInStatus } from "../src/api/apiRequests";
import { format, isBefore } from "date-fns";

export async function customerVerification(customerInfo, axios) {
    const response = await checkCustomerExists(customerInfo.id, axios)
    const customerExists = Object.values(response[0])[0]
    console.log(customerExists)

    if (!customerExists) {
        console.log('Customer Not Found. Adding Now.')
        const response = await addCustomer(customerInfo)
    } else {
        console.log('Customer Already in Database')
    }
}

export async function checkInVerification(customerInfo, rideId, axios) {
    const response = await returnCheckInStatus(customerInfo, rideId, axios)
    const checkInExists = Object.values(response[0])[0]
    return checkInExists
}

export async function rideTodayVerification(axios) {
    const rideWindow = false
    let rideInfo = {}
    const response = await getRideToday(axios)
    if (response.length == 0) {
        return {rideWindow:false}
    } else {
        let rideInfo = response[0]
        const start = timeToSeconds(rideInfo.start_time)
        // console.log(`Start Time: ${start}`)
        const end = timeToSeconds(rideInfo.end_time)
        // console.log(`End Time: ${end}`)
        const now = timeToSeconds(format(new Date(), 'HH:mm:ss'))
        // console.log(`Current Time ${now}`)
        if(now > start && now < end) {
            console.log('In the time window')
            return {rideInfo, rideWindow: true}
        } else {
            console.log('Not in time window')
            return {rideInfo: 'No Ride', rideWindow: false}
            
        }

    }
    

  
    //     return {rideInfo, rideStatus}
    // }
    // return {rideInfo, rideStatus}
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

export function dateToDb(date) {
    return format(new Date(date), 'yyyy-MM-dd')
}

export function timeToSeconds(timeString) {
    const [hours, minutes, seconds] = timeString.split(':')
    const timeInSeconds = ((3600*hours) + (60*minutes) + seconds)
    return timeInSeconds
}
