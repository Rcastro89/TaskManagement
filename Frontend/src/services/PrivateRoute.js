import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Componente que protege rutas privadas
const PrivateRoute = ({ children }) => {
    // Obtener el token de autenticación del contexto
    var { token } = useContext(AuthContext);

    // Si no hay token en el contexto, intentar obtenerlo del localStorage
    if (!token)
        token = localStorage.getItem('token');

    // Si hay un token, renderizar los hijos; de lo contrario, redirigir a la página de inicio
    return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
