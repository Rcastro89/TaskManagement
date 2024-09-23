import React, { createContext, useState, useEffect } from 'react';
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
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador');
            } else {
                throw new Error(err.response.data);
            }
        }
    };

    return (
        <CreateUserContext.Provider value={{ roles, fetchCreateUser, fetchRoles }}>
            {children}
        </CreateUserContext.Provider>
    );
};
