import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Componente que gestiona las rutas para usuarios con rol de administrador
const AdminRoute = ({ children }) => {
    // Obtener el rol del usuario desde el localStorage
    const role = localStorage.getItem('role');
    // Obtener el token de autenticación del contexto de autenticación
    var { token } = useContext(AuthContext);

    // Si no hay token en el contexto, intentar obtenerlo del localStorage
    if (!token)
        token = localStorage.getItem('token');

    // Verificar si el usuario tiene un token y es un administrador
    if (token && role === 'Administrador')
        return children; // Renderizar los hijos (componentes) si el usuario es administrador

    // Si hay un token pero el rol no es administrador, redirigir a la página de inicio
    else if (token)
        return <Navigate to="/Home" />;

    // Si no hay token, redirigir a la página de inicio de sesión
    return <Navigate to="/" />;
};

export default AdminRoute;
