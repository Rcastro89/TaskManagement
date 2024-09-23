import React, { createContext } from 'react';
import api from '../services/api';

// Crear el contexto para el cambio de contraseña
export const ChangePasswordContext = createContext();

/**
 * Proveedor del contexto para cambiar la contraseña del usuario.
 *
 * @param {Object} props - Props del componente.
 * @param {ReactNode} props.children - Elementos hijos que utilizan este contexto.
 */
export const ChangePasswordProvider = ({ children }) => {
    /**
     * Función para cambiar la contraseña del usuario.
     *
     * @param {string} newPassword - Nueva contraseña que se desea establecer.
     * @returns {Promise<void>} - Promesa que se resuelve cuando la contraseña ha sido cambiada.
     * @throws {Error} - Lanza un error si la solicitud falla.
     */
    const fetchChangePassword = async (newPassword) => {
        try {
            // Realizar la llamada a la API para actualizar la contraseña
            await api.put('/User/UpdatePassword', newPassword);
        } catch (err) {
            // Manejo de errores basado en el código de estado de la respuesta
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador');
            } else {
                throw new Error(err.response.data); // Lanza error con mensaje de la respuesta
            }
        }
    };

    // Proveer el contexto para el cambio de contraseña a los componentes hijos
    return (
        <ChangePasswordContext.Provider value={{ fetchChangePassword }}>
            {children}
        </ChangePasswordContext.Provider>
    );
};
