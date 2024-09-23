import React, { createContext } from 'react';
import api from '../services/api';

// Crear el contexto para la creación de tareas
export const CreateTaskContext = createContext();

/**
 * Proveedor del contexto para crear nuevas tareas.
 *
 * @param {Object} props - Props del componente.
 * @param {ReactNode} props.children - Elementos hijos que utilizan este contexto.
 */
export const CreateTaskProvider = ({ children }) => {
    /**
     * Función para crear una nueva tarea.
     *
     * @param {Object} newTask - Objeto que representa la nueva tarea a crear.
     * @returns {Promise<void>} - Promesa que se resuelve cuando la tarea ha sido creada.
     * @throws {Error} - Lanza un error si la solicitud falla.
     */
    const fetchCreateTask = async (newTask) => {
        try {
            // Realizar la llamada a la API para crear una nueva tarea
            await api.post('/Task', newTask);
        } catch (err) {
            // Manejo de errores basado en el código de estado de la respuesta
            if (err.response && err.response.status === 403) {
                throw new Error('No tiene permisos suficientes para realizar esta acción, comuníquese con su administrador');
            } else {
                throw new Error(err.response.data); // Lanza error con mensaje de la respuesta
            }
        }
    };

    // Proveer el contexto para la creación de tareas a los componentes hijos
    return (
        <CreateTaskContext.Provider value={{ fetchCreateTask }}>
            {children}
        </CreateTaskContext.Provider>
    );
};
