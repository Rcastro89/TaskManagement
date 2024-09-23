import axios from 'axios';

// Crear una instancia de axios para facilitar las solicitudes a la API
const api = axios.create({
    baseURL: 'http://localhost:5184/api', // URL base de tu API
});

// Interceptor para agregar el token en cada solicitud
api.interceptors.request.use((config) => {
    // Obtener el token de autenticaci�n del localStorage
    const token = localStorage.getItem("token");
    // Si hay un token, agregarlo en el encabezado de autorizaci�n
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // Retornar la configuraci�n de la solicitud
    return config;
});

export default api;
