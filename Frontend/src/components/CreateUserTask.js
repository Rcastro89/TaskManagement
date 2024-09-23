import React, { useState, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField, MenuItem } from '@mui/material';
import { Autocomplete } from '@mui/lab';
import { CreateUserTaskContext } from '../context/CreateUserTaskContext';

/**
 * Componente para asignar una nueva tarea a un usuario.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.open - Indica si el diálogo está abierto.
 * @param {Function} props.onClose - Función para cerrar el diálogo.
 */
const CreateUserTask = ({ open, onClose }) => {
    // Contexto para obtener las tareas, usuarios, función de creación y error
    const { tasks, users, createUserTask, error } = useContext(CreateUserTaskContext);

    // Estado para almacenar la tarea seleccionada, usuario, estatus y mensaje de error
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [status, setStatus] = useState('Pendiente'); // Estatus inicial
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * Maneja el envío del formulario para asignar la tarea al usuario seleccionado.
     * 
     * @param {Event} e - Evento del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Objeto que contiene los detalles de la asignación
            const assignment = {
                UserId: selectedUser?.idUser, // ID del usuario seleccionado
                TaskId: selectedTask?.idTask,   // ID de la tarea seleccionada
                Status: status,                  // Estatus de la tarea
            };
            await createUserTask(assignment); // Llama a la función para crear la asignación
            onClose(); // Cierra el diálogo después de asignar la tarea
        } catch (err) {
            // Manejo de errores al asignar la tarea
            setErrorMessage('Error al asignar la tarea: ' + err.message);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Asignar Nueva Tarea</DialogTitle>
            <DialogContent>
                {/* Muestra mensajes de error si existen */}
                {error && <Typography color="error">{error}</Typography>}
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}

                {/* Componente Autocomplete para seleccionar la tarea */}
                <Autocomplete
                    options={tasks}
                    getOptionLabel={(option) => option.title} // Muestra el título de la tarea
                    onChange={(event, newValue) => setSelectedTask(newValue)} // Establece la tarea seleccionada
                    renderInput={(params) => <TextField {...params} label="Tarea" variant="outlined" />}
                    style={{ marginBottom: '16px', marginTop: '20px' }}
                />

                {/* Componente Autocomplete para seleccionar el usuario */}
                <Autocomplete
                    options={users}
                    getOptionLabel={(option) => option.userName} // Muestra el nombre de usuario
                    onChange={(event, newValue) => setSelectedUser(newValue)} // Establece el usuario seleccionado
                    renderInput={(params) => <TextField {...params} label="Usuario" variant="outlined" />}
                    style={{ marginBottom: '16px' }}
                />

                {/* Componente para seleccionar el estatus de la tarea */}
                <TextField
                    select
                    label="Estatus"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)} // Actualiza el estatus seleccionado
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: '16px' }}
                >
                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                    <MenuItem value="En Proceso">En Proceso</MenuItem>
                    <MenuItem value="Completada">Completada</MenuItem>
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancelar</Button>
                <Button onClick={handleSubmit} color="primary">Asignar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateUserTask;
