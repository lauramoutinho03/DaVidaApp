import axios from 'axios';

// URL base da API REST do OutSystems
const API_BASE_URL = 'https://personal-o5s345pu.outsystemscloud.com/DaVida/rest/'; 


const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
