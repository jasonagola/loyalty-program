import axios from 'axios';

const devURL = 'http://localhost:8800'
const buildURL = 'https://jasonagola.dev'
const backendURL = devURL

export default axios.create({
    baseURL: 'http://localhost:8800'
});