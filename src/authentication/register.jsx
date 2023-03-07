import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { registerNewUser } from '../api/apiRequests'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

function Register() {
    const axiosPrivate = useAxiosPrivate()

    const [message, setMessage] = useState('')
    const [match, setMatch] = useState()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('')
    const [role, setRole] = useState('')
    const [responseData, setResponseData] = useState()
    
    useEffect(() => {
        verifyPassword()
    }, [passwordMatch, password])

    const verifyPassword = () => {
        if (password === passwordMatch) {
            setMessage('')
            setMatch(true)
        } else {
            setMatch(false)
            setMessage('Passwords Do Not Match')
        }
    }

    const validate = (username, password) => {
        let validationCheck = true
    
        const usernameRegex = /^[a-zA-Z0-9]{8,30}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/;
        
        if (!usernameRegex.test(username)) {
            validationCheck = false
            setMessage("Username does not meet requirements");
        }

        ///add username duplication verification form database
        
        if (!passwordRegex.test(password)) {
            validationCheck = false
            setMessage("Password does not meet requirements");
        }

        if (!role) {
            validationCheck = false
            setMessage("Role is required.");
        }
        
        if (!match) {
            validationCheck = false
            setMessage("Passwords do not match!")
        }
        
        return validationCheck;
      }
      
   

    const getUserInfo = () => {
        const newUser = {
            username: username,
            password: password,
            roles: role
        }
        return newUser
    }

    const handleCreateUser = async (e) => {
        e.preventDefault()
        const newUser = getUserInfo()
        const result = validate(username, password, role)
        if (result === true) {
            const response = await registerNewUser(newUser, axiosPrivate)
            setMessage(response.statusText)
        } else {
            console.log('Validation Returned a Fail')
        }
    }

    
    if (responseData?.status === 201) { 
        return (
            <div>
                {responseData?.statusText}
                <button onClick={() => setResponseData({})}>Create Another User</button>
                <Link to='/portal'><button>Back To Ride Portal</button></Link>
            </div>
        )
    } else {
        return (
            <div id='registerContainer'>
                <h2>Register New User</h2>
                <p>Usernames: Must be between 8-30 characters and must only be regular letters or numbers</p>
                <p>Passwords: Must be between 8-30 characters and include letters, at least one number, at least one special character</p>
                <div>
                    {message}
                </div>
                <form onSubmit={handleCreateUser}>
                    <input name='username' autoComplete='off' id='registerUsername' placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
                    <input type='password' name='password' autoComplete='off' id='registerPassword' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
                    <input type='password' name='passwordMatch' autoComplete='off' placeholder='Verify Password' onChange={(e) => setPasswordMatch(e.target.value)}></input>
                    <h4>User Role Selection</h4>
                    <div id='userRoleSelection'>
                        <input 
                            type='radio' 
                            name='userRole' 
                            checked={role === '2001'}
                            onChange={(e) => setRole(e.target.value)}
                            value='2001'>
                        </input>
                        <label htmlFor='Admin'>Admin</label>

                        <input 
                            type='radio'
                            name='userRole'
                            checked={role === '3001'}
                            onChange={(e) => setRole(e.target.value)}
                            value='3001'>
                        </input>
                        <label htmlFor='Admin'>Employee</label>

                        <input
                            type='radio'
                            name='userRole'
                            checked={role === '4001'}
                            onChange={(e) => setRole(e.target.value)}
                            value='4001'>
                        </input>
                        <label htmlFor='Admin'>User</label>

                        <input
                            type='radio'
                            name='userRole'
                            checked={role === '5001'}
                            onChange={(e) => setRole(e.target.value)}
                            value='5001'>
                        </input>
                        <label htmlFor='Admin'>Public</label>
                    </div>
                    
                    <button type='submit'>Create User</button>
                </form>
                <br/>
                <br/>
                <br/>
                <br/>
                <Link to='/portal'><button>Back To Ride Portal</button></Link>
            </div>

        )
    }
}

export default Register