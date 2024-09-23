import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await api.get('/Task');
            setTasks(response.data);
        } catch (err) {
            setError('Error al obtener las tareas: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUpdateTask = async (updateTask) => {
        try {
            const response = await api.put(`/Task/${updateTask.IdTask}`, updateTask);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador');
            } else {
                throw new Error('Error al asignar la tarea: ' + err.response.data);
            }
        }
    };

    const fetchDeleteTask = async (deleteTask) => {
        try {
            const response = await api.delete(`/Task/${deleteTask.idTask}`);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador');
            } else {
                throw new Error('Error al eliminar la tarea: ' + err.response.data);
            }
        }
    }


    return (
        <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, fetchUpdateTask, fetchDeleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};
