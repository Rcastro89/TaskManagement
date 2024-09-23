import { createContext, useState } from 'react';
import api from '../services/api';

// Crear el contexto para gestionar tareas
export const TaskContext = createContext();

/**
 * Proveedor del contexto de tareas.
 *
 * @param {Object} props - Props del componente.
 * @param {ReactNode} props.children - Elementos hijos que utilizan este contexto.
 */
export const TaskProvider = ({ children }) => {
    // Estado para almacenar las tareas, el estado de carga y los errores
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Función para obtener las tareas desde la API.
     * Actualiza el estado con la lista de tareas.
     * Maneja los errores y el estado de carga.
     */
    const fetchTasks = async () => {
        try {
            setLoading(true); // Indicar que se está cargando
            const response = await api.get('/Task'); // Llamada a la API para obtener tareas
            setTasks(response.data); // Actualizar el estado con los datos obtenidos
        } catch (err) {
            setError('Error al obtener las tareas: ' + err.message); // Manejo de errores
        } finally {
            setLoading(false); // Finalizar el estado de carga
        }
    };

    /**
     * Función para actualizar una tarea.
     *
     * @param {Object} updateTask - Objeto que contiene los datos de la tarea a actualizar.
     * @throws {Error} - Lanza un error si la solicitud falla.
     */
    const fetchUpdateTask = async (updateTask) => {
        try {
            const response = await api.put(`/Task/${updateTask.IdTask}`, updateTask); // Llamada a la API para actualizar la tarea
        } catch (err) {
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador'); // Manejo de permisos
            } else {
                throw new Error('Error al asignar la tarea: ' + err.response.data); // Manejo de errores
            }
        }
    };

    /**
     * Función para eliminar una tarea.
     *
     * @param {Object} deleteTask - Objeto que contiene la tarea a eliminar.
     * @throws {Error} - Lanza un error si la solicitud falla.
     */
    const fetchDeleteTask = async (deleteTask) => {
        try {
            const response = await api.delete(`/Task/${deleteTask.idTask}`); // Llamada a la API para eliminar la tarea
        } catch (err) {
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador'); // Manejo de permisos
            } else {
                throw new Error('Error al eliminar la tarea: ' + err.response.data); // Manejo de errores
            }
        }
    };

    // Proveer el contexto de tareas a los componentes hijos
    return (
        <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, fetchUpdateTask, fetchDeleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};
