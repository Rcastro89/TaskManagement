import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const CreateTaskContext = createContext();

export const CreateTaskProvider = ({ children }) => {
    const fetchCreateTask = async (newTask) => {
        try {
            await api.post('/Task', newTask);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador');
            } else {
                throw new Error(err.response.data);
            }
        }
    };

    return (
        <CreateTaskContext.Provider value={{ fetchCreateTask }}>
            {children}
        </CreateTaskContext.Provider>
    );
};
