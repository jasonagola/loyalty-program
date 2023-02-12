import React from 'react'
import { addRide } from '../api/apiRequests'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

function RideCreator(props) {
    const reloadRides = props.reload
    const axiosPrivate = useAxiosPrivate()

    async function handleAddRide(e) {
        e.preventDefault()
        const rideInfo = {
            date: document.querySelector('#newRideForm .rideDate').value,
            start: document.querySelector('#newRideForm .startTime').value,
            end: document.querySelector('#newRideForm .endTime').value,
            value: document.querySelector('#newRideForm .rideValue').value,
        }
        const response = await addRide(rideInfo, axiosPrivate)
        reloadRides()
    }

    return (
        <div>
        <h3>Add a New Ride</h3>
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