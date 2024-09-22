import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const UserTaskContext = createContext();

export const UserTaskProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [userTasks, setUserTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {

        if (!token) return;
        try {
            setLoading(true);
            //const token = localStorage.getItem('token');           
            const response = await api.get('/UserTask', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserTasks(response.data);
        } catch (err) {
            setError('Error al obtener las tareas de usuarios: ' + err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [token]);

    return (
        <UserTaskContext.Provider value={{ userTasks, loading, error }}>
            {children}
        </UserTaskContext.Provider>
    );
};
