import React, { createContext, useState } from 'react';
import api from '../services/api';

// Crear el contexto para la creación de usuarios
export const CreateUserContext = createContext();

/**
 * Proveedor del contexto para la creación de nuevos usuarios.
 *
 * @param {Object} props - Props del componente.
 * @param {ReactNode} props.children - Elementos hijos que utilizan este contexto.
 */
export const CreateUserProvider = ({ children }) => {
    // Estado para almacenar los roles disponibles
    const [roles, setRoles] = useState([]);

    /**
     * Función para obtener los roles desde la API.
     *
     * @returns {Promise<void>} - Promesa que se resuelve cuando los roles han sido cargados.
     * @throws {Error} - Lanza un error si la solicitud falla.
     */
    const fetchRoles = async () => {
        try {
            // Realizar la llamada a la API para obtener los roles
            const rolesResponse = await api.get('/Role');
            setRoles(rolesResponse.data); // Actualizar el estado con los roles obtenidos
        } catch (err) {
            throw new Error('Error al obtener roles: ' + err.message); // Manejo de errores
        }
    };

    /**
     * Función para crear un nuevo usuario.
     *
     * @param {Object} newUser - Objeto que representa el nuevo usuario a crear.
     * @returns {Promise<void>} - Promesa que se resuelve cuando el usuario ha sido creado.
     * @throws {Error} - Lanza un error si la solicitud falla.
     */
    const fetchCreateUser = async (newUser) => {
        try {
            // Realizar la llamada a la API para crear un nuevo usuario
            await api.post('/User', newUser);
        } catch (err) {
            if (err.response) {
                // Manejo de errores basado en el código de estado de la respuesta
                if (err.response.status === 403) {
                    throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador');
                } else if (err.response.status === 400) {
                    throw new Error(err.response.data || 'Error al crear usuario: Datos inválidos');
                } else {
                    throw new Error(`Error inesperado: ${err.response.status} ${err.response.statusText}`);
                }
            } else {
                throw new Error('Error de conexión o del servidor'); // Error en la conexión
            }
        }
    };

    // Proveer el contexto para la creación de usuarios a los componentes hijos
    return (
        <CreateUserContext.Provider value={{ roles, fetchCreateUser, fetchRoles }}>
            {children}
        </CreateUserContext.Provider>
    );
};
