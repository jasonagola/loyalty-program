import axios from 'axios';

const devURL = 'http://localhost:8800'
const buildURL = 'https://jasonagola.dev'
const backendURL = devURL

// export default axios.create({
//     baseURL: backendURL
// });

export default axios.create({
    baseURL: backendURL,
    headers: {
        
        'Content-Type': 'application/json'
        },
        withCredentials: true
    }
);