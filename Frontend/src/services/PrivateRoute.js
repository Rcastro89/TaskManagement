import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    var { token } = useContext(AuthContext);
    if (!token)
        token = localStorage.getItem('token');

    return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
