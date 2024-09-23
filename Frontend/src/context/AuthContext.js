import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

// Crear el contexto de autenticaci�n
export const AuthContext = createContext();

/**
 * Proveedor del contexto de autenticaci�n que gestiona el estado de inicio de sesi�n
 * y proporciona funciones para iniciar y cerrar sesi�n.
 *
 * @param {Object} props - Props del componente.
 * @param {ReactNode} props.children - Elementos hijos que utilizan este contexto.
 */
export const AuthProvider = ({ children }) => {
    // Estado para almacenar el token de autenticaci�n
    const [token, setToken] = useState(null);
    // Estado para almacenar el nombre del usuario
    const [user, setUser] = useState(null);
    // Estado para manejar errores de autenticaci�n
    const [error, setError] = useState(null);
    // Estado para almacenar el rol del usuario
    const [role, setRole] = useState(null);

    // Cargar el token y usuario del localStorage al iniciar el componente
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setUser(localStorage.getItem('user'));
            setRole(localStorage.getItem('role')); // Cargar el rol tambi�n
        }
    }, []);

    /**
     * Funci�n para iniciar sesi�n.
     *
     * @param {string} userName - Nombre de usuario.
     * @param {string} password - Contrase�a del usuario.
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
            // Manejo de errores durante el inicio de sesi�n
            if (err.response && err.response.status === 401) {
                setError(err.response.data.error); // Error de autenticaci�n
            } else {
                setError('Error en el login'); // Error general
            }
        }
    };

    /**
     * Funci�n para cerrar sesi�n.
     */
    const logout = () => {
        // Eliminar datos del localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');

        // Limpiar el estado de autenticaci�n
        setToken(null);
        setUser(null);
        setRole(null);
    };

    // Proveer el contexto de autenticaci�n a los componentes hijos
    return (
        <AuthContext.Provider value={{ login, token, user, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};
