import React from 'react'

function RideCreator() {

    async function handleAddRide() {
        const rideInfo = {
            date: document.querySelector('#newRideForm .rideDate').value,
            start: document.querySelector('#newRideForm .startTime').value,
            end: document.querySelector('#newRideForm .endTime').value,
            value: document.querySelector('#newRideForm .rideValue').value,
        }
        const response = await addRide(rideInfo)
        loadRides()
    }

    return (
        <div>
        <h3>Add a New Ride</h3>
                <div id='newRideForm'>
                    <label htmlFor='rideDate' name='rideDate'>Ride Date</label>
                    <input className='rideDate' type='date' required></input>
                    <label htmlFor='startTime'>Ride Window Start</label>
                    <input className='startTime' type='time' name='startTime'></input>
                    <label htmlFor='startTime'>Ride Window Start</label>
                    <input className='endTime' type='time' name='endTime'></input>
                    <label htmlFor='rideValue'>Discount Value</label>
                    <input className='rideValue' type='number' name='rideValue'></input>
                    <button onClick={handleAddRide}>Set Ride</button>
                </div>
            </div>
    )
}

export default RideCreator