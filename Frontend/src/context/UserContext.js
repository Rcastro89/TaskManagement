import { createContext, useState } from 'react';
import api from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/User');
            setUsers(response.data);
        } catch (err) {
            setError('Error al obtener los usuarios: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUpdateUser = async (updateUser) => {
        try {
            const response = await api.put(`/User/${updateUser.IdUser}`, updateUser);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador');
            } else {
                throw new Error('Error al asignar la tarea: ' + err.response.data);
            }
        }
    };

    const fetchDeleteUser = async (deleteUser) => {
        try {
            const response = await api.delete(`/User/${deleteUser.idUser}`);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador');
            } else {
                throw new Error('Error al asignar la tarea: ' + err.response.data);
            }
        }
    }


    return (
        <UserContext.Provider value={{ users, loading, error, fetchUsers, fetchUpdateUser, fetchDeleteUser }}>
            {children}
        </UserContext.Provider>
    );
};
