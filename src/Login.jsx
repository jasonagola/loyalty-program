import React, {useState} from 'react';
import AuthService from './services/authService';

function Login() {
    const [user, setUser] = useState({
        username: '',
        password: '', 
        loading: false,
        message: ''
    })

    const handleChangeUsername = (e) => {
        setUser({...user, username: e.target.value})
    }

    const handleChangePassword = (e) => {
        setUser({...user, password: e.target.value})
    }

    const handleLogin = () => {
        e.preventDefault()
    }

    const handleButton = () => {
        AuthService.login
    }

    return (
        <div id='login'>
            <form onSubmit={handleLogin}> 
                <label htmlFor='username'>Username:</label>
                <input type='text' id='username' name='username' onChange={handleChangeUsername}></input>
                <label htmlFor='password'>Password:</label>
                <input type='text' id='password' name='password' onChange={handleChangePassword}></input>
            </form>

            <button onClick={handleButton}>Click Me Please!</button>
        </div>
    )
}

export default Login