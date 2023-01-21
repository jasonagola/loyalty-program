import axios from 'axios'

const devUrl = 'http://localhost:8800'
const backendUrl = 'http://jasonagola.dev/backend'

const backend = devUrl

class AuthService { 
    login(username, password) {
        const options = {
            method: "POST",
            url: backend + '/users/login',
            params: {
                username: username,
                password: password
            }
        }
        const response = axios.request(options)
        try {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    register(username, password) {
        const response = axios.request
    }
}

    export default AuthService