import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const UserTaskContext = createContext();

export const UserTaskProvider = ({ children }) => {
    const [userTasks, setUserTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            //const token = localStorage.getItem('token');           
            const response = await api.get('/UserTask');
            setUserTasks(response.data);
        } catch (err) {
            setError('Error al obtener las tareas de usuarios: ' + err);
        } finally {
            setLoading(false);
        }
    };

    const updateUserTaskStatus = async (updateTask) => {
        try {
            const response = await api.post('/UserTask/updateStatus', updateTask);
        } catch (err) {
            throw new Error('Error al editar la tarea del usuario: ' + err.response.data);
        }
    };


    return (
        <UserTaskContext.Provider value={{ userTasks, loading, error, fetchTasks, updateUserTaskStatus }}>
            {children}
        </UserTaskContext.Provider>
    );
};
