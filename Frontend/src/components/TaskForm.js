import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const TaskForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title && status) {
            onSubmit({ title, status });
            setTitle('');
            setStatus('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
            <TextField
                label="Título"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField
                label="Estado"
                variant="outlined"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Agregar Tarea
            </Button>
        </form>
    );
};

export default TaskForm;
