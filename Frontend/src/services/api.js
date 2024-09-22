import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5184/api', // URL base de tu API
});

// Agregar el token en cada solicitud
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
