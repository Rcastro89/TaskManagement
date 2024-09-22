import React, { useState, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField, MenuItem } from '@mui/material';
import { Autocomplete } from '@mui/lab';
import { CreateUserTaskContext } from '../context/CreateUserTaskContext';

const AssignTask = ({ open, onClose }) => {
    const { tasks, users, createUserTask, error } = useContext(CreateUserTaskContext);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [status, setStatus] = useState('Pendiente');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const assignment = {
                IdUser: selectedUser?.idUser,
                IdTask: selectedTask?.idTask,
                Status: status,
            };
            await createUserTask(assignment);
            onClose();
        } catch (err) {
            setErrorMessage('Error al asignar la tarea: ' + err.message);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Asignar Nueva Tarea</DialogTitle>
            <DialogContent>
                {error && <Typography color="error">{error}</Typography>}
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                <Autocomplete
                    options={tasks}
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newValue) => setSelectedTask(newValue)}
                    renderInput={(params) => <TextField {...params} label="Tarea" variant="outlined" />}
                    style={{ marginBottom: '16px' }}
                />
                <Autocomplete
                    options={users}
                    getOptionLabel={(option) => option.userName}
                    onChange={(event, newValue) => setSelectedUser(newValue)}
                    renderInput={(params) => <TextField {...params} label="Usuario" variant="outlined" />}
                    style={{ marginBottom: '16px' }}
                />
                <TextField
                    select
                    label="Estatus"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
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

export default AssignTask;
