import React, {useEffect, useState, useCallback} from 'react'
import { checkInVerification, customerVerification } from '../../utils/helpers'
import {format, isSunday, set} from 'date-fns'
import './CheckIn.css'
import { getRideToday, recordCheckIn } from '../api/apiRequests'
import useAxiosPrivate from '../hooks/useAxiosPrivate'


function CheckIn(props) {
    const [customerInfo, setCustomerInfo] = useState(props.customerInfo)
    const [checkInWindow, setCheckInWindow] = useState(false)
    const [checkedIn, setCheckedIn] = useState(false)
    const [handleClick, setHandleClick] = useState()
    const [buttonMessage, setButtonMessage] = useState('')

    const axiosPrivate = useAxiosPrivate()

    const rideInfo = props.rideInfo
    
    useEffect(()=> {
        verifyCheckIn()
    }, [customerInfo])

    useEffect(() => {
        verifyDay()
    }, [checkedIn])

    useEffect(() => {
        updateButtonState()
    }, [checkInWindow, checkedIn, buttonMessage])

   async function verifyDay() {
       ////New Ride Date Data from db.  Push upstream with props to prevent unnecessary db checkin. 
       // Can still allow for search and new customer entry

        const now = new Date()
        const ride = await getRideToday(axiosPrivate)
        console.log(ride)
        if (isSunday(now) && now.getHours()>=10 && now.getHours()<11) {
            setCheckInWindow(true)
        } else {
            setCheckInWindow(false)
        }
        updateButtonState()
        console.log('Day Verification Running')
    }

    async function verifyCheckIn() {
        const checkInStatus = await checkInVerification(customerInfo, rideInfo.ride_id, axiosPrivate)
        setCheckedIn((checkInStatus) ? true: false)
        updateButtonState()
    }

    async function checkIn() {
        await customerVerification(customerInfo, axiosPrivate)
        await recordCheckIn(customerInfo, rideInfo, axiosPrivate)
        await verifyCheckIn(customerInfo, axiosPrivate)
        updateButtonState()
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
            setButtonMessage('Check In!')
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