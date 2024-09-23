import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, CircularProgress, Box, Button } from '@mui/material';
import { Add, Save, Edit, Close, Delete } from '@mui/icons-material';
import CreateTask from './CreateTask';

/**
 * Componente que muestra una lista de tareas y permite realizar operaciones
 * como agregar, editar y eliminar tareas.
 */
const Tasks = () => {
    const { tasks, loading, error, fetchTasks, fetchUpdateTask, fetchDeleteTask } = useContext(TaskContext); // Obtener tareas y funciones del contexto
    const [open, setOpen] = useState(false); // Estado para controlar el diálogo de creación de tarea
    const [editingTask, setEditingTask] = useState(null); // Estado para la tarea que se está editando
    const [newTaskTitle, setNewTaskTitle] = useState(''); // Estado para el nuevo título de la tarea
    const [newTaskDescription, setNewTaskDescription] = useState(''); // Estado para la nueva descripción de la tarea

    // Función para definir el estilo del encabezado de la tabla
    const headerStyle = (width) => {
        return { fontWeight: 'bold', width: width };
    };

    // Abre el diálogo para crear una nueva tarea
    const handleOpen = () => {
        setOpen(true);
    };

    // Cierra el diálogo y actualiza la lista de tareas
    const handleClose = async () => {
        setOpen(false);
        await fetchTasks();
    };

    // Configura el estado para editar una tarea
    const handleEdit = (task) => {
        setEditingTask(task);
        setNewTaskTitle(task.title);
        setNewTaskDescription(task.description);
    };

    // Cancela la edición de la tarea
    const handleCancel = () => {
        setEditingTask(null);
        setNewTaskTitle("");
        setNewTaskDescription("");
    };

    // Elimina una tarea
    const handleDelete = async (task) => {
        try {
            await fetchDeleteTask(task);
            await fetchTasks();
        } catch (err) {
            alert('Error eliminando la tarea: ' + err);
        }
    };

    // Guarda los cambios en la tarea editada
    const handleSave = async () => {
        if (editingTask) {
            const updateTask = {
                IdTask: editingTask.idTask,
                Title: newTaskTitle,
                Description: newTaskDescription
            };

            try {
                await fetchUpdateTask(updateTask);
            } catch (err) {
                alert('Error al actualizar la tarea: ' + err);
            }

            setEditingTask(null);
            fetchTasks();
        }
    };

    // Efecto para cargar las tareas al montar el componente
    useEffect(() => {
        fetchTasks();
    }, []);

    // Muestra un indicador de carga si las tareas se están cargando
    if (loading) {
        return <CircularProgress />;
    }

    // Muestra un mensaje de error si ocurre
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
                                        />
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
                                        />
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
            <CreateTask open={open} onClose={handleClose} /> {/* Componente para crear una nueva tarea */}
        </Box>
    );
};

export default Tasks;
