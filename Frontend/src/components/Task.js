import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { CreateTaskContext } from '../context/CreateTaskContext';
import { Autocomplete, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, CircularProgress, Box, Button } from '@mui/material';
import { Add, Save, Edit, Close, Delete } from '@mui/icons-material';
import CreateTask from './CreateTask';

const Tasks = () => {
    const { tasks, loading, error, fetchTasks, fetchUpdateTask, fetchDeleteTask } = useContext(TaskContext);
    const [open, setOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');

    

    const headerStyle = (width) => {
        return { fontWeight: 'bold', width: width }
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = async () => {
        setOpen(false);
        await fetchTasks();
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setNewTaskTitle(task.title);
        setNewTaskDescription(task.description);
    };

    const handleCancel = () => {
        setEditingTask(null);
        setNewTaskTitle("");
        setNewTaskDescription("");
    };

    const handleDelete = async (task) => {
        try {
            await fetchDeleteTask(task);
            await fetchTasks();
        }
        catch (err) {
            alert('Error eliminando la tarea: ' + err);
        }
    };

    const handleSave = async () => {
        if (editingTask) {
            const updateTask = {
                IdTask: editingTask.idTask,
                Title: newTaskTitle,
                Description: newTaskDescription
            }

            try {
                await fetchUpdateTask(updateTask);
            }
            catch (err) {
                alert('Error al actualizar la tarea: ' + err);
            }

            setEditingTask(null);
            fetchTasks();
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
                Tareas
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 2 }}>
                <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpen}>
                    Nueva tarea
                </Button>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'lightgrey' }}>
                            <TableCell style={headerStyle(20)}>ID</TableCell>
                            <TableCell style={headerStyle(150)}>Título</TableCell>
                            <TableCell style={headerStyle(150)}>Descripción</TableCell>
                            <TableCell style={headerStyle(150)}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.idTask}>
                                <TableCell>{task.idTask}</TableCell>
                                <TableCell>
                                    {editingTask?.idTask === task.idTask ? (
                                        <TextField
                                            value={newTaskTitle}
                                            onChange={(e) => setNewTaskTitle(e.target.value)}
                                            variant="outlined"
                                            size="small"
                                        >
                                        </TextField>
                                    ) : (
                                        task.title
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingTask?.idTask === task.idTask ? (
                                        <TextField
                                            value={newTaskDescription}
                                            onChange={(e) => setNewTaskDescription(e.target.value)}
                                            variant="outlined"
                                            size="small"
                                        >
                                        </TextField>
                                    ) : (
                                        task.description
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingTask?.idTask === task.idTask ? (
                                        <Box>
                                            <Button
                                                onClick={handleSave}
                                                color="primary"
                                                startIcon={<Save />}
                                            >
                                                Guardar
                                            </Button>
                                            <Button
                                                onClick={() => handleCancel()}
                                                color="secondary"
                                                startIcon={<Close />}
                                                sx={{ marginLeft: 1 }}
                                            >
                                                Cancelar
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Box>
                                            <Button
                                                onClick={() => handleEdit(task)}
                                                color="secondary"
                                                startIcon={<Edit />}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(task)}
                                                color="secondary"
                                                startIcon={<Delete />}
                                            >
                                                Eliminar
                                            </Button>
                                        </Box>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CreateTask open={open} onClose={handleClose} />
        </Box>
    );
};

export default Tasks;
