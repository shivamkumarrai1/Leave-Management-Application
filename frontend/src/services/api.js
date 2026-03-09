import axios from 'axios';

const api = axios.create({
    // Direct path to your Render backend with the /api prefix
    baseURL: import.meta.env.VITE_API_URL || 'https://leave-management-application-j5oy.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Automatically attach JWT token to every request if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;