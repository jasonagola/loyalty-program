import React, {useState, useRef, useEffect, useContext} from 'react';
import AuthContext from './context/authProvider';
import axios from './api/axios'
import AuthService from './services/authService';
const LOGIN_URL = '/auth';
const devURL = 'http://localhost:8800'
const buildURL = 'https://jasonagola.dev'
const backendURL = devURL

function Login() {
    const { setAuth } = useContext(AuthContext)

    const errRef = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // const usernameRef = useRef()
    // const passwordRef = useRef()

    const [message, setMessage] = useState()
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        setMessage('')
    }, [])


    const handleLogin = async (e) => {
        e.preventDefault();
        // const options = {
        //     method: 'POST',
        //     url: backendURL + LOGIN_URL,
        //     data: {
        //         username, password
        //     },
        //     // headers: 
        //     //     {"Content-Type": "application.json"},
        //     //     withCredentials: true
        // }
        // const response = await axios.request(options)
        try {
            const repsonse = await axios.post(
                LOGIN_URL,
                JSON.stringify({username, password}),
                {
                    headers: { 'Content-Type': 'application.json'},
                    withCredentials: true
                });
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken;
            const roles = repsonse?.data?.roles;
            setAuth(username, password, roles, accessToken)
        } catch (error) {
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

    const handleButton = () => {
        AuthService.login
    }

    return (
        <>
        {success ? (
            <div>
                <h1>Log In Successful!</h1>
            </div>
        ) : (
        <div id='login'>
            <form onSubmit={handleLogin}> 
                <label htmlFor='username'>Username:</label>
                <input type='text' id='username' name='username' value={username} autoComplete="off" onChange={(e) => setUsername(e.target.value)} required={true}></input>
                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' name='password' value={password} autoComplete="off" onChange={(e) => setPassword(e.target.value)}  required={true}></input>
                <p ref={errRef} className={message ? "errmsg":"offscreen"}>{message}</p>
                <button>Log In</button>
            </form>

            <button onClick={handleButton}>Click Me Please!</button>
        </div>
    )}
    </> 
    )
}

export default Login