import React, {useState} from 'react'
import {format} from 'date-fns'
import { updateRide } from '../utils/apiRequests'


function Ride(props) {
    const ride = props.ride
    const reloadRides = props.reload
    const [edit, setEdit] = useState(false)

    const getRideInfo = () => {
        const rideInfo = {
            id: ride.ride_id,
            date: document.querySelector(`[id='${ride.ride_id}'] .rideDate`).value,
            start: document.querySelector(`[id='${ride.ride_id}'] .startTime`).value,
            end: document.querySelector(`[id='${ride.ride_id}'] .endTime`).value,
            value: document.querySelector(`[id='${ride.ride_id}'] .rideValue`).value,
        }
        return rideInfo
    }

    const handleSave = async () => {
        const rideInfo = getRideInfo()
        console.log(rideInfo)
        const response = await updateRide(rideInfo)
        reloadRides()
        setEdit(false)
    }

    const deleteRide = async () => {
        const rideInfo = getRideInfo()
        deleteRide(rideInfo.id)
    }

    return (
        <div className='rides' id={ride.ride_id}>
            {edit ? (
                <div className='rideEdit'>
                    <input className='rideDate' type='date' defaultValue={format(new Date(ride.ride_date), 'yyyy-MM-dd')}></input>
                    <label htmlFor='startTime'>Ride Window Start</label>
                    <input className='startTime' type='time' name='startTime' defaultValue={ride.start_time}></input>
                    <label htmlFor='startTime'>Ride Window Start</label>
                    <input className='endTime' type='time' name='endTIme' defaultValue={ride.end_time}></input>
                    <label htmlFor='rideValue'>Discount Value</label>
                    <input className='rideValue' type='number' name='rideValue' defaultValue={ride.ride_value}></input>
                    <button onClick={handleSave}>Save Changes</button>
            </div>

            ): (
                <div className='rideInfo'>
                <p>Ride: {format(new Date(ride.ride_date), 'EEEE MMM dd, yyyy')}</p>
                <p>Ride Window: {ride.start_time}-{ride.end_time}</p>
                <p>Loyalty Reward: {ride.ride_value}</p>
                <button onClick={() => setEdit(true)}>Edit</button>
                <button onClick={deleteRide}>Delete</button>
            </div>
            )}            
        </div>
    
       
    )    
}

export default Ride