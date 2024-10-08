import React, { useState, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField } from '@mui/material';
import { CreateTaskContext } from '../context/CreateTaskContext';

/**
 * Componente para crear una nueva tarea.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.open - Indica si el diálogo está abierto.
 * @param {Function} props.onClose - Función para cerrar el diálogo.
 */
const CreateTask = ({ open, onClose }) => {
    // Contexto para manejar la lógica de creación de tareas
    const { fetchCreateTask } = useContext(CreateTaskContext);

    // Estado para almacenar el título, descripción y mensajes de error
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * Maneja el envío del formulario para crear una nueva tarea.
     * 
     * @param {Event} e - Evento del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Objeto que contiene los detalles de la nueva tarea
            const newTask = {
                Title: taskTitle,
                Description: taskDescription,
            };

            // Llama a la función para crear la tarea
            await fetchCreateTask(newTask);
            onClose(); // Cierra el diálogo después de crear la tarea
        } catch (err) {
            // Manejo de errores al crear la tarea
            setErrorMessage('Error al crear tarea: ' + err.message);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit} style={{ width: '500px' }}>
                <DialogTitle>Nueva Tarea</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        label="Título"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '16px', marginTop: '10px' }} />
                    <TextField
                        label="Descripción"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '16px' }} />
                    {/* Muestra el mensaje de error si existe */}
                    {errorMessage && <Typography color="error" style={{ margin: '6px' }}>{errorMessage}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">Cancelar</Button>
                    <Button type="submit" color="primary">Crear</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateTask;
