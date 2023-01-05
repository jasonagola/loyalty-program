import React, {useEffect, useState, useCallback} from 'react'
import { checkInVerification, customerVerification } from '../utils/helpers'
import {format, isSunday, set} from 'date-fns'
import './CheckIn.css'
import { isThereARideToday, recordCheckIn } from '../utils/apiRequests'


/////Probably just need to rewrite logic to create a message decider and a click decider
////The Problem being that I can't select the particular button id to change the onClick functionality
function CheckIn(props) {
    const [customerInfo, setCustomerInfo] = useState(props.customerInfo)
    const [checkInWindow, setCheckInWindow] = useState(false)
    const [checkedIn, setCheckedIn] = useState(false)
    const [handleClick, setHandleClick] = useState()
    const [buttonMessage, setButtonMessage] = useState('')

    useEffect(()=> {
        verifyCheckIn(customerInfo)
    }, [customerInfo])

    useEffect(() => {
        verifyDay()
    }, [checkedIn, customerInfo])

    useEffect(() => {
        updateButtonState()
    }, [checkInWindow, checkedIn, buttonMessage])

   async function verifyDay() {
       ////New Ride Date Data from db.  Push upstream with props to prevent unnecessary db checkin. 
       // Can still allow for search and new customer entry

        const now = new Date()
        const ride = await isThereARideToday()
        console.log(ride)
        if (isSunday(now) && now.getHours()>=10 && now.getHours()<11) {
            setCheckInWindow(true)
        } else {
            setCheckInWindow(false)
        }
        updateButtonState()
        console.log('Day Verification Running')
    }

    async function verifyCheckIn(customerInfo) {
        const checkInStatus = await checkInVerification(customerInfo)
        setCheckedIn((checkInStatus) ? true: false)
        updateButtonState()
        console.log('Changed Checked In Status')
    }

    async function checkIn() {
        await customerVerification(customerInfo)
        await recordCheckIn(customerInfo)
        await verifyCheckIn(customerInfo)
        updateButtonState()
        console.log('Did the message change?')
    }

    const updateButtonState = () => {
        // const now = new Date()
        const buttonId = `${customerInfo.id}button`
        // const checkInButton = document.querySelector(`#${buttonId}`)
        const checkInButton = document.getElementById(buttonId)
        if (!checkInButton) {
            return
        } else if (checkInWindow && !checkedIn) {
            // checkInButton.onclick = () => checkIn
            setButtonMessage('Check In!')
            return
        // } else if (checkInWindow && checkedIn) {
        //     setButtonMessage('Already Checked In!')
        //     return
        } else if (checkedIn) {
            setButtonMessage('Thanks for Checking In!')
            checkInButton.onclick = null
            return
        } else if (!checkedIn) {
            checkInButton.onclick = checkIn
            setButtonMessage('Check In (Test)!')
            return
        } else if (!checkInWindow) {
            setButtonMessage('Come Back on Sunday')
        } 
    }
    
        const printStatus = () => {
            console.log('Customer Info:'+ customerInfo.id + 'and Name' + customerInfo.givenName)
            console.log('checkInWindow:' + checkInWindow)
            console.log('Checked In?:' + checkedIn)
            console.log(buttonMessage)
        }

    return (
        <div>
            <button id={customerInfo.id + 'button'} onClick={handleClick}>{buttonMessage}</button> 
            {/* <button onClick={printStatus}>Print Status</button> */}
        </div>
    )
}

export default CheckIn