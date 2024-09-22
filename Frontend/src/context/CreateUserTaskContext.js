import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const CreateUserTaskContext = createContext();

export const CreateUserTaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTasksAndUsers = async () => {
            try {
                const tasksResponse = await api.get('/Task');
                const usersResponse = await api.get('/User');
                setTasks(tasksResponse.data);
                setUsers(usersResponse.data);
            } catch (err) {
                setError('Error al cargar tareas o usuarios: ' + err.message);
            }
        };

        fetchTasksAndUsers();
    }, []);

    const createUserTask = async (assignment) => {
        try {
            await api.post('/UserTask/create', assignment);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador');
            } else {
                throw new Error('Error al asignar la tarea: ' + err.response.data);
            }
        }
    };

    return (
        <CreateUserTaskContext.Provider value={{ tasks, users, error, createUserTask }}>
            {children}
        </CreateUserTaskContext.Provider>
    );
};
