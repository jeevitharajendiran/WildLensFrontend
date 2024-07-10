import axios from 'axios';
import history from './history';

const axiosInstance = axios.create({
    baseURL: "https://wildlenstours-8au5.onrender.com/api", // Replace with your API base URL
    timeout: 1000,
});

axiosInstance.interceptors.request.use(
    config => {

        const token = localStorage.getItem('authToken');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem( 'authToken' );
            history.push("/auth");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
