import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const Api = () => {
    let storage = localStorage.getItem('userData')
    storage = JSON.parse(storage)
    axiosInstance.interceptors.response.use(response => response, error => {
        if (error.response.status === 401) {
            localStorage.clear();
            window.location.href = `/login`;
            return
        }
        return error.response;
    })
    if (storage && storage.token) {
        axiosInstance.defaults.headers.common['authorization'] = storage.token
        return axiosInstance
    } else {
        axiosInstance.defaults.headers.common['Authorization'] = ''
        return axiosInstance
    }
}

export default Api