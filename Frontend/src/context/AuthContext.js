import { createContext, useState } from 'react';
import api from '../services/api'; // Asegúrate de que la ruta sea correcta

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = async (userName, password) => {
        const response = await api.post('/auth/login', { UserName: userName, Password: password });
        const { token } = response.data;
        setToken(token);
        localStorage.setItem('token', token);
        setUser({ userName });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ login, token, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
