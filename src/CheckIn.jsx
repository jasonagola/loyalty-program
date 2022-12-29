import React, {useEffect, useState} from 'react'
import { checkInVerification, customerVerification } from '../utils/helpers'
import {isSunday} from 'date-fns'

function CheckIn(props) {
    const [customerInfo, setCustomerInfo] = useState(props.customerInfo)
    const [checkInWindow, setCheckInWindow] = useState(false)
    const [checkedIn, setCheckedIn] = useState(false)
    const [buttonMessage, setButtonMessage] = useState('')

    // useEffect(()=> {
    //     console.log('Use Effect Running')
    // }, [])

    const verifyCheckIn = async (customerInfo) => {
        const checkInStatus = await checkInVerification(customerInfo)
        console.log(checkInStatus)
    }

    const verifyDay = () => {
        const now = new Date()
        if (isSunday(now) && now.getHours()>=10 && now.getHours()<11) {
            setCheckInWindow(true)
        } else {
            setCheckInWindow(false)
        }
        console.log('Day Verification Running')
    }

    // setInterval(verifyDay, 60000)

    const updateButtonState = () => {
        // const now = new Date()
        // const checkInButton = document.querySelector('#checkInButton')
        // const checkInStatus = checkInVerification(customerInfo) 
        if (!checkInButton) {
            return
        }
        if (checkInWindow) {
            checkInButton.onclick = checkIn
            } else {
                checkInButton.onclick = function() {
                }
            }
        }
    
        const printStatus = () => {
            console.log('Customer Info:'+ customerInfo.id)
            console.log('checkInWindow:' + checkInWindow)
            console.log('Checked In?:' + checkedIn)
        }

    const checkIn = async () => {
        await customerVerification(customerInfo)
        await recordCheckIn(customerInfo)
        // addVisit(customerinfo)
    }

    return (
        <div>
            <button id='checkInButton' onClick={printStatus}>{buttonMessage}</button>
            
        </div>
    )
}

export default CheckIn