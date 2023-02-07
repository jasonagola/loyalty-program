import React, {useState, useRef, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import {Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios'
const LOGIN_URL = '/auth';


function Login() {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const usernameRef = useRef()
    // const passwordRef = useRef()

    const [message, setMessage] = useState()

    useEffect(() => {
        setMessage('')
    }, [])


    const handleLogin = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            url: LOGIN_URL,
            data: { username, password },
            headers: 
                {'Content-Type': 'application/json'},
                withCredentials: true
            }
        const response = await axios.request(options)
        try {
            
            // console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({username, password, roles, accessToken})
            setUsername('')
            setPassword('')
            navigate('/portal', {replace: true});
        } catch (error) {
            console.log('I think there was an error')
            console.log(error)
            if (!error?.response) {
                setMessage('No Server Response')
            } else if (error.response?.status === 400) {
                setMessage('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setMessage('Username or Password Does Not Match');
            } else {
                setMessage('Login Failed')
            }
            
            }
        }

    // const handleButton = () => {
    //     AuthService.login
    // }

    return (
        <div id='login'>
            <h2>Local Bike Shop NFK</h2>
            <p>You are logging into our service portal.  You can find our customer website here: <a>Local Bike Shop NFK</a></p>
            <p></p>
            <p>{message}</p>
            <form onSubmit={handleLogin}> 
                <label htmlFor='username'>Username:</label>
                <input type='text' id='username' name='username' value={username} autoComplete="off" onChange={(e) => setUsername(e.target.value)} required={true}></input>
                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' name='password' value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)}  required={true}></input>
                <p className={message ? "errmsg":"offscreen"}>{message}</p>
                <button>Log In</button>
            </form>

            {/* <button onClick={handleButton}>Click Me Please!</button> */}
        </div>
    )
}

export default Login