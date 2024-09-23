import React, { createContext } from 'react';
import api from '../services/api';

export const ChangePasswordContext = createContext();

export const ChangePasswordProvider = ({ children }) => {
    const fetchChangePassword = async (newPassword) => {
        try {
            await api.put('/User/UpdatePassword', newPassword);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador');
            } else {
                throw new Error(err.response.data);
            }
        }
    };

    return (
        <ChangePasswordContext.Provider value={{ fetchChangePassword }}>
            {children}
        </ChangePasswordContext.Provider>
    );
};
