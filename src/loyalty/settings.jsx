import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import Ride from './ride'
import RideCreator from './rideCreator'
import {addRide, getRidesThisMonth} from '../api/apiRequests'
import {format, isLeapYear, getDay, isBefore, parseISO} from 'date-fns'
import './settings.css'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

function Settings() {
    const [settingsMessage, setSettingsMessage] = useState([])
    const [ridesThisMonth, setRidesThisMonth] = useState([])

    const axios = useAxiosPrivate()

    useEffect(() => {
       loadRides()
    }, [])

    async function loadRides() {
        const rides = await getRidesThisMonth(axios)
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

    

    return (
        <div>
            <h1>Ride Loyalty Settings</h1>
            <div id='returnToCheckIn'>
                <Link to='/portal'><button>Back to Check In</button></Link>
            </div>
            
            <div id='settingsMessage'>
                <p></p>
                <p></p>
            </div>

            <div id='newRide'>
                <RideCreator reload={loadRides}/>
            </div>
            
            <div>
                <h2>Rides Scheduled this Month</h2>
                <p>Please pay attention to existing rides. Existing Rides may be edited with apporpriate permission</p>
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