import { createContext, useState } from 'react';
import api from '../services/api';

// Crear el contexto para gestionar usuarios
export const UserContext = createContext();

/**
 * Proveedor del contexto de usuarios.
 *
 * @param {Object} props - Props del componente.
 * @param {ReactNode} props.children - Elementos hijos que utilizan este contexto.
 */
export const UserProvider = ({ children }) => {
    // Estado para almacenar los usuarios, el estado de carga y los errores
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Función para obtener los usuarios desde la API.
     * Actualiza el estado con la lista de usuarios.
     * Maneja los errores y el estado de carga.
     */
    const fetchUsers = async () => {
        try {
            setLoading(true); // Indicar que se está cargando
            const response = await api.get('/User'); // Llamada a la API para obtener usuarios
            setUsers(response.data); // Actualizar el estado con los datos obtenidos
        } catch (err) {
            setError('Error al obtener los usuarios: ' + err.message); // Manejo de errores
        } finally {
            setLoading(false); // Finalizar el estado de carga
        }
    };

    /**
     * Función para actualizar un usuario.
     *
     * @param {Object} updateUser - Objeto que contiene los datos del usuario a actualizar.
     * @throws {Error} - Lanza un error si la solicitud falla.
     */
    const fetchUpdateUser = async (updateUser) => {
        try {
            const response = await api.put(`/User/${updateUser.UserId}`, updateUser); // Llamada a la API para actualizar el usuario
        } catch (err) {
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador'); // Manejo de permisos
            } else {
                throw new Error('Error al actualizar usuario: ' + err.response.data); // Manejo de errores
            }
        }
    };

    /**
     * Función para eliminar un usuario.
     *
     * @param {Object} deleteUser - Objeto que contiene el usuario a eliminar.
     * @throws {Error} - Lanza un error si la solicitud falla.
     */
    const fetchDeleteUser = async (deleteUser) => {
        try {
            const response = await api.delete(`/User/${deleteUser.idUser}`); // Llamada a la API para eliminar el usuario
        } catch (err) {
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador'); // Manejo de permisos
            } else {
                throw new Error('Error al eliminar usuario: ' + err.response.data); // Manejo de errores
            }
        }
    };

    // Proveer el contexto de usuarios a los componentes hijos
    return (
        <UserContext.Provider value={{ users, loading, error, fetchUsers, fetchUpdateUser, fetchDeleteUser }}>
            {children}
        </UserContext.Provider>
    );
};
