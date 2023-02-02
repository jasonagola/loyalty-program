import React, {useState, useRef, useEffect, useContext} from 'react';
import AuthContext from './context/authProvider';
import axios from './context/authProvider';
import AuthService from './services/authService';
const LOGIN_URL = '/auth';

function Login() {
    const { setAuth } = useContext(AuthContext)

    const errRef = useRef()

    const usernameRef = useRef()
    const passwordRef = useRef()

    const [message, setMessage] = useState()
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        setMessage('')
    }, [])


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const repsonse = await axios.post(
                LOGIN_URL,
                JSON.stringify({usernameRef, passwordRef}),
                {
                    headers: { 'Content-Type': 'application.json'},
                    withCredentials
                });
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken;
            const roles = repsonse?.data?.roles;
            setAuth(username, password, roles, accessToken)
        } catch (error) {
            console.log(error)
            if (!err?.repsonse) {
                setMessage('No Server Response')
            } else if (err.response?.status === 400) {
                setMessage('Missing Username or Password');
            } else if (err.response?.status === 401) {
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
                <input type='text' id='username' name='username' ref={usernameRef} required={true}></input>
                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' name='password' ref={passwordRef} required={true}></input>
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