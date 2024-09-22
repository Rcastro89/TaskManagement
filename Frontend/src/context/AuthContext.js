import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    // Cargar el token y usuario del localStorage al iniciar
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setUser(localStorage.getItem('user'));
        }
    }, []);

    // Función para iniciar sesión
    const login = async (userName, password) => {
        try {
            const response = await api.post('/auth/login', { UserName: userName, Password: password });
            const responseToken = response.data.token;

            setToken(responseToken);
            setUser(userName);

            // Guardar el token en localStorage
            localStorage.setItem('token', responseToken);
            localStorage.setItem('user', userName);
        } catch (err) {
            setError('Error:', err);
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    

    return (
        <AuthContext.Provider value={{ login, token, user, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};
