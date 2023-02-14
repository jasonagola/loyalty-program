import React, {useState} from 'react'

function Register() {
    const [message, setMessage] = useState('')

    const verifyPassword = () => {
        const password = document.getElementById('registerPassword')
        const passwordMatch = document.getElementById('registerPasswordMatch')
        if (password === passwordMatch) {
            return true
        } else {
            return false
        }
    }

    return(
        <div>
            <h2>Register New User</h2>
            <div>
                {message}
            </div>
            <form>
                <input value='username' placeholder='Username'></input>
                <input value='password' id='registerPassword' placeholder='Password'></input>
                <input value='passwordMatch' placeholder='Verify Password'></input>
                <p>User Role Selection</p>
                <input type='radio' id='Admin' name='Admin' value='2001'></input>
                <input type='radio' id='Employee' name='Employee' value='3001'></input>
                <input type='radio' id='User' name='User' value='4001'></input>
                <input type='radio' id='Public' name='Public' value='5001'></input>
                
                
            </form>
        </div>
    )
}

export default Register