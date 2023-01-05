import React, {useEffect, useState} from 'react';
import Ride from './ride'
import {addRide, getRidesThisMonth} from '../utils/apiRequests'
import {format, isLeapYear, getDay, isBefore, parseISO} from 'date-fns'
import './settings.css'
// import { dateQuickSort } from '../utils/helpers';

function Settings() {
    const [settingsMessage, setSettingsMessage] = useState([])
    const [ridesThisMonth, setRidesThisMonth] = useState([])

    useEffect(() => {
       loadRides()
    }, [])

    async function loadRides() {
        const rides = await getRidesThisMonth()
        const sortedRides = dateQuickSort(rides)
        setRidesThisMonth(sortedRides)
    }

    function dateQuickSort(rideArray) {
        if (rideArray.length <= 1) {
            return rideArray
        } else {
            const left = []
            const right = []
            const sortedDates = []
            const pivot = rideArray.pop()
            const arrayLength = rideArray.length;
            for (var i = 0; i < arrayLength; i++) {
                if (isBefore(new Date(rideArray[i].ride_date), new Date(pivot.ride_date))) {
                    left.push(rideArray[i])
                } else {
                    right.push(rideArray[i])
                }
            } return sortedDates.concat(dateQuickSort(left), pivot, dateQuickSort(right));
        }
    }

    async function handleAddRide() {
        const rideInfo = {
            date: format(new Date(document.getElementById('rideDate').value), 'yyyy-MM-dd'),
            start: document.getElementById('startTime').value,
            end: document.getElementById('endTime').value,
            value: document.getElementById('rideValue').value,
        }
        console.log(rideInfo.start)
        // console.log(rideInfo.date)
        // console.log(rideInfo)
        const response = await addRide(rideInfo)
        loadRides()
    }

    return (
        <div>
            <h2>Settings Area</h2>
            <div id='settingsMessage'>
                <p></p>
                <p></p>
            </div>
            <div id='newRide'>
                <input id='rideDate' type='date'></input>
                <label htmlFor='startTime'>Ride Window Start</label>
                <input id='startTime' type='time' name='startTime'></input>
                <label htmlFor='startTime'>Ride Window Start</label>
                <input id='endTime' type='time' name='endTIme'></input>
                <label htmlFor='rideValue'>Discount Value</label>
                <input id='rideValue' type='number' name='rideValue'></input>
                <button onClick={handleAddRide}>Set Ride</button>
            </div>
            
            <div>
                <h2>Rides Scheduled this Month</h2>
                    <div id='ridesThisMonth'>
                        {ridesThisMonth.map((ride) => {
                            return (
                                <Ride ride={ride} key={ride.ride_id}/>
                                // <div className='rides' id={ride.ride_id} key={ride.ride_id}>
                                //     <p>Ride: {format(new Date(ride.ride_date), 'EEEE MMM dd, yyyy')}</p>
                                //     <p>Ride Window: {ride.start_time}-{ride.end_time}</p>
                                //     <p>Loyalty Reward: {ride.ride_value}</p>
                                //     <button>Edit</button>
                                //     <button>Delete</button>
                                // </div>
                            )
                        }
                    )}
                    </div>
            </div>
    </div>
    )
}


export default Settings 