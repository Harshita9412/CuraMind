import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,  // Backend URL from .env
    withCredentials: true  // Ensures cookies/sessions are handled correctly
});

// Example API Calls
export const fetchData = () => API.get('/data');   // Sample GET request
export const createData = (data) => API.post('/data', data);  // Sample POST request

export default API;
