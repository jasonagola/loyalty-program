import axios from 'axios'; 

const devURL = 'http://localhost:8800'
const buildURL = 'https://jasonagola.dev'
const backendURL = devURL



// export default axios.create({
//     baseURL: backendURL
// });

// export default axios.create({
//     baseURL: backendURL,
//     headers: {
        
//         'Content-Type': 'application/json'
//         },
//         withCredentials: true
//     }
// );
const axiosPrivate = axios.create({
    baseURL: backendURL,
    headers: 
       
        {'Content-Type': 'application/json'},
        withCredentials: true
    }
);

axios.interceptors.request.use(
    config => {
        if (!config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
            console.log('Auth Headers newly set')
        }
        return config;
    }, (error) => Promise.reject(error)
);


axios.interceptors.response.use(
    response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );


export default axiosPrivate