import { createContext, useState } from 'react';
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

    const fetchDeleteUserTask = async (deleteUserTask) => {
        try {
            const response = await api.delete(`/UserTask/${deleteUserTask.idUserTask}`);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador');
            } else {
                throw new Error('Error al asignar la tarea: ' + err.response.data);
            }
        }
    }


    return (
        <UserTaskContext.Provider value={{ userTasks, loading, error, fetchTasks, updateUserTaskStatus, fetchDeleteUserTask }}>
            {children}
        </UserTaskContext.Provider>
    );
};
