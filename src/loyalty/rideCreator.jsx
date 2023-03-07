import React, {useState} from 'react'
import { addRide } from '../api/apiRequests'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

function RideCreator(props) {
    const reloadRides = props.reload
    const axiosPrivate = useAxiosPrivate()
    const [message, setMessage] = useState('')

    const rideValidation = (rideInfo) => {
        const validation = true
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

        if (!dateRegex.test(rideInfo.date)) {
            alert('Please enter the date in the format yyyy-MM-dd.');
            return false;
          }
          
          if (!timeRegex.test(rideInfo.start) || !timeRegex.test(rideInfo.end)) {
            alert('Please enter the start and end times in the format HH:mm.');
            return false;
          }
          
          if (rideInfo.value <= 0) {
            alert('Please enter a ride value greater than zero.');
            return false;
          }
          
          if (rideInfo.value > 5) {
            alert('Warning: Ride value is larger than 5.');
          }
          
          return true;
        }

    async function handleAddRide(e) {
        e.preventDefault()
        const rideInfo = {
            date: document.querySelector('#newRideForm .rideDate').value,
            start: document.querySelector('#newRideForm .startTime').value,
            end: document.querySelector('#newRideForm .endTime').value,
            value: document.querySelector('#newRideForm .rideValue').value,
        }
        const validation = rideValidation(rideInfo)
        console.log(`Ride Info: Start Time is ${rideInfo.date}, ${rideInfo.value}, ${rideInfo.start} and End Time is ${rideInfo.end}`)
        if (validation) {
            const response = await addRide(rideInfo, axiosPrivate)
            reloadRides()
            setMessage('')
        } else {
            setMessage('Please fix the errors below before resubmitting')
        }
    }


    return (
        <div>
        <h3>Add a New Ride</h3>
                {message}
                <form onSubmit={handleAddRide} id='newRideForm'>
                    <label htmlFor='rideDate' name='rideDate'>Ride Date</label>
                    <input className='rideDate' type='date' required></input>
                    <label htmlFor='startTime'>Ride Window Start</label>
                    <input className='startTime' type='time' name='startTime'></input>
                    <label htmlFor='startTime'>Ride Window Start</label>
                    <input className='endTime' type='time' name='endTime'></input>
                    <label htmlFor='rideValue'>Discount Value</label>
                    <input className='rideValue' type='number' name='rideValue'></input>
                    <button type='submit'>Set Ride</button>
                </form>
            </div>
    )
}

export default RideCreator