import React, { useState, useContext, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField, MenuItem } from '@mui/material';
import { Autocomplete } from '@mui/lab';
import { CreateTaskContext } from '../context/CreateTaskContext';

const CreateTask = ({ open, onClose }) => {
    const { fetchCreateTask } = useContext(CreateTaskContext);
    const [taskTitle, setTaskTitle] = useState(null);
    const [taskDescription, setTaskDescription] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const newTask = {
                Title: taskTitle,
                Description: taskDescription,
            };
            await fetchCreateTask(newTask);
            onClose();
        } catch (err) {
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
                        style={{ marginBottom: '16px', marginTop: '10px' }} >
                    </TextField>
                    <TextField
                        label="Descripción"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '16px' }} >
                    </TextField>
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
