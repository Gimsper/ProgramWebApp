import axios from 'axios';

const API_URL = 'https://programwebapi.onrender.com';

export const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});