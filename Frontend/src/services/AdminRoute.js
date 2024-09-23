import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const AdminRoute = ({ children }) => {
    const role = localStorage.getItem('role');
    var { token } = useContext(AuthContext);

    if (!token)
        token = localStorage.getItem('token');

    if (token && role === 'Administrador')
        return children

    else if (token)
        return <Navigate to="/Home" />

    return <Navigate to="/" />;

};

export default AdminRoute;
