import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

// Crear el contexto para la creación de tareas de usuario
export const CreateUserTaskContext = createContext();

/**
 * Proveedor del contexto para la creación de tareas de usuario.
 *
 * @param {Object} props - Props del componente.
 * @param {ReactNode} props.children - Elementos hijos que utilizan este contexto.
 */
export const CreateUserTaskProvider = ({ children }) => {
    // Estado para almacenar las tareas y usuarios
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    // Efecto para cargar tareas y usuarios al montar el componente
    useEffect(() => {
        const fetchTasksAndUsers = async () => {
            try {
                // Realizar llamadas a la API para obtener tareas y usuarios
                const tasksResponse = await api.get('/Task');
                const usersResponse = await api.get('/User');
                setTasks(tasksResponse.data); // Actualizar el estado con las tareas obtenidas
                setUsers(usersResponse.data); // Actualizar el estado con los usuarios obtenidos
            } catch (err) {
                setError('Error al cargar tareas o usuarios: ' + err.message); // Manejo de errores
            }
        };

        fetchTasksAndUsers(); // Llamar a la función para obtener tareas y usuarios
    }, []);

    /**
     * Función para crear una tarea de usuario.
     *
     * @param {Object} assignment - Objeto que representa la tarea de usuario a crear.
     * @returns {Promise<void>} - Promesa que se resuelve cuando la tarea ha sido creada.
     * @throws {Error} - Lanza un error si la solicitud falla.
     */
    const createUserTask = async (assignment) => {
        try {
            // Realizar la llamada a la API para crear una nueva tarea de usuario
            await api.post('/UserTask/create', assignment);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador');
            } else {
                throw new Error('Error al asignar la tarea: ' + err.response.data); // Manejo de errores
            }
        }
    };

    // Proveer el contexto para la creación de tareas de usuario a los componentes hijos
    return (
        <CreateUserTaskContext.Provider value={{ tasks, users, error, createUserTask }}>
            {children}
        </CreateUserTaskContext.Provider>
    );
};
