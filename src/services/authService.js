import axios from 'axios'

const devUrl = 'http://localhost:8800'
backendUrl = 'http://jasonagola.dev/backend'

const backend = devUrl

class AuthService { 
    login(username, password) {
        return axios.post(backend+"/login", {
            username, 
            password
        }).then((response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data
        }))
    }
}