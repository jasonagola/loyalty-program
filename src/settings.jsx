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
            date: document.querySelector('#newRide .rideDate').value,
            start: document.querySelector('#newRide .startTime').value,
            end: document.querySelector('#newRide .endTime').value,
            value: document.querySelector('#newRide .rideValue').value,
        }
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
                <h3>Add a New Ride</h3>
                <p>Please pay attention to existing rides. Existing Rides may be edited with apporpriate permission</p>
                <input className='rideDate' type='date' required></input>
                <label htmlFor='startTime'>Ride Window Start</label>
                <input className='startTime' type='time' name='startTime'></input>
                <label htmlFor='startTime'>Ride Window Start</label>
                <input className='endTime' type='time' name='endTIme'></input>
                <label htmlFor='rideValue'>Discount Value</label>
                <input className='rideValue' type='number' name='rideValue'></input>
                <button onClick={handleAddRide}>Set Ride</button>
            </div>
            
            <div>
                <h2>Rides Scheduled this Month</h2>
                    <div id='ridesThisMonth'>
                        {ridesThisMonth.map((ride) => {
                            return (
                                <Ride ride={ride} reload={loadRides} key={ride.ride_id}/>
                            )
                        }
                    )}
                    </div>
            </div>
    </div>
    )
}


export default Settings 