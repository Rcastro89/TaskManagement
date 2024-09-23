import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

// Crear el contexto de autenticación
export const AuthContext = createContext();

/**
 * Proveedor del contexto de autenticación que gestiona el estado de inicio de sesión
 * y proporciona funciones para iniciar y cerrar sesión.
 *
 * @param {Object} props - Props del componente.
 * @param {ReactNode} props.children - Elementos hijos que utilizan este contexto.
 */
export const AuthProvider = ({ children }) => {
    // Estado para almacenar el token de autenticación
    const [token, setToken] = useState(null);
    // Estado para almacenar el nombre del usuario
    const [user, setUser] = useState(null);
    // Estado para manejar errores de autenticación
    const [error, setError] = useState(null);
    // Estado para almacenar el rol del usuario
    const [role, setRole] = useState(null);

    // Cargar el token y usuario del localStorage al iniciar el componente
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setUser(localStorage.getItem('user'));
            setRole(localStorage.getItem('role')); // Cargar el rol también
        }
    }, []);

    /**
     * Función para iniciar sesión.
     *
     * @param {string} userName - Nombre de usuario.
     * @param {string} password - Contraseña del usuario.
     */
    const login = async (userName, password) => {
        try {
            // Llamar a la API para autenticar al usuario
            const response = await api.post('/auth/login', { UserName: userName, Password: password });
            const responseToken = response.data.token;
            const responseRole = response.data.role;

            // Actualizar el estado y almacenar datos en localStorage
            setToken(responseToken);
            setUser(userName);
            setRole(responseRole);

            localStorage.setItem('token', responseToken);
            localStorage.setItem('user', userName);
            localStorage.setItem('role', responseRole);
        } catch (err) {
            // Manejo de errores durante el inicio de sesión
            if (err.response && err.response.status === 401) {
                setError(err.response.data.error); // Error de autenticación
            } else {
                setError('Error en el login'); // Error general
            }
        }
    };

    /**
     * Función para cerrar sesión.
     */
    const logout = () => {
        // Eliminar datos del localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');

        // Limpiar el estado de autenticación
        setToken(null);
        setUser(null);
        setRole(null);
    };

    // Proveer el contexto de autenticación a los componentes hijos
    return (
        <AuthContext.Provider value={{ login, token, user, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};
