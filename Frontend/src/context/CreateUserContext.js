import React, { createContext, useState } from 'react';
import api from '../services/api';

export const CreateUserContext = createContext();

export const CreateUserProvider = ({ children }) => {
    const [roles, setRoles] = useState([]);

    const fetchRoles = async () => {
        try {
            const rolesResponse = await api.get('/Role');
            setRoles(rolesResponse.data);
        } catch (err) {
            throw new Error('Error al roles: ' + err.message);
        }
    };

    const fetchCreateUser = async (newUser) => {
        try {
            await api.post('/User', newUser);
        } catch (err) {
            if (err.response) {
                if (err.response.status === 403) {
                    throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador');
                } else if (err.response.status === 400) {
                    throw new Error(err.response.data || 'Error al crear usuario: Datos inválidos');
                } else {
                    throw new Error(`Error inesperado: ${err.response.status} ${err.response.statusText}`);
                }
            } else {
                throw new Error('Error de conexión o del servidor');
            }
        }
    };

    return (
        <CreateUserContext.Provider value={{ roles, fetchCreateUser, fetchRoles }}>
            {children}
        </CreateUserContext.Provider>
    );
};
