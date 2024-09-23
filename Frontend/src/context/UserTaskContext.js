import { createContext, useState } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

// Crear el contexto para gestionar las tareas de los usuarios
export const UserTaskContext = createContext();

/**
 * Proveedor del contexto de tareas de usuario.
 *
 * @param {Object} props - Props del componente.
 * @param {ReactNode} props.children - Elementos hijos que utilizan este contexto.
 */
export const UserTaskProvider = ({ children }) => {
    // Estado para almacenar las tareas de los usuarios, el estado de carga y los errores
    const [userTasks, setUserTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Función para obtener las tareas de los usuarios desde la API.
     * Actualiza el estado con la lista de tareas.
     * Maneja los errores y el estado de carga.
     */
    const fetchTasks = async () => {
        try {
            setLoading(true); // Indicar que se está cargando
            const response = await api.get('/UserTask'); // Llamada a la API para obtener las tareas de los usuarios
            setUserTasks(response.data); // Actualizar el estado con los datos obtenidos
        } catch (err) {
            setError('Error al obtener las tareas de usuarios: ' + err); // Manejo de errores
        } finally {
            setLoading(false); // Finalizar el estado de carga
        }
    };

    /**
     * Función para actualizar el estado de una tarea de usuario.
     *
     * @param {Object} updateTask - Objeto que contiene los datos de la tarea a actualizar.
     * @throws {Error} - Lanza un error si la solicitud falla.
     */
    const updateUserTaskStatus = async (updateTask) => {
        try {
            const response = await api.post('/UserTask/updateStatus', updateTask); // Llamada a la API para actualizar el estado de la tarea
        } catch (err) {
            throw new Error('Error al editar la tarea del usuario: ' + err.response.data); // Manejo de errores
        }
    };

    /**
     * Función para eliminar una tarea de usuario.
     *
     * @param {Object} deleteUserTask - Objeto que contiene la tarea a eliminar.
     * @throws {Error} - Lanza un error si la solicitud falla.
     */
    const fetchDeleteUserTask = async (deleteUserTask) => {
        try {
            const response = await api.delete(`/UserTask/${deleteUserTask.idUserTask}`); // Llamada a la API para eliminar la tarea
        } catch (err) {
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador'); // Manejo de permisos
            } else {
                throw new Error('Error al asignar la tarea: ' + err.response.data); // Manejo de errores
            }
        }
    };

    // Proveer el contexto de tareas de usuario a los componentes hijos
    return (
        <UserTaskContext.Provider value={{ userTasks, loading, error, fetchTasks, updateUserTaskStatus, fetchDeleteUserTask }}>
            {children}
        </UserTaskContext.Provider>
    );
};
