import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Replace this with your backend URL if different
});

export default api;
