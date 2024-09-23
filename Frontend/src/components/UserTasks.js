import React, { useContext, useState, useEffect } from 'react';
import { UserTaskContext } from '../context/UserTaskContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Button, Box, MenuItem, TextField, Tooltip } from '@mui/material';
import { Add, Edit, Save, Close, Delete } from '@mui/icons-material';
import CreateUserTask from './CreateUserTask';

const UserTasks = () => {
    const { userTasks, loading, error, fetchTasks, updateUserTaskStatus, fetchDeleteUserTask } = useContext(UserTaskContext);
    const [open, setOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const role = localStorage.getItem('role');

    const headerStyle = (width) => {
        return { fontWeight: 'bold', width: width }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        fetchTasks();
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setNewStatus(task.status);
    };

    const handleSave = async () => {
        if (editingTask) {
            const updateTask = {
                IdUserTask: editingTask.idUserTask,
                Status: newStatus
            }

            try {
                await updateUserTaskStatus(updateTask);
            }
            catch (err) {
                alert('Error al actualizar el estatus: ' + err);
            }

            setEditingTask(null); 
            fetchTasks(); 
        }
    };

    const handleCancel = () => {
        setEditingTask(null); 
        setNewStatus("");
    };

    const handleDelete = async (user) => {
        try {
            await fetchDeleteUserTask(user);
            fetchTasks();
        }
        catch (err) {
            alert('Error eliminando la tarea del usuario: ' + err);
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
                Tareas Asignadas
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 2 }}>
                <Tooltip title={role === 'Administrador' || role === 'Supervisor' ? '' : 'Sin permisos suficientes'}>
                    <span>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={handleOpen}
                            disabled={!(role === 'Administrador' || role === 'Supervisor')}
                        >
                            Asignar Nueva Tarea
                        </Button>
                    </span>
                </Tooltip>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'lightgrey' }}>
                            <TableCell style={headerStyle(20)}>ID</TableCell>
                            <TableCell style={headerStyle(150)}>Usuario</TableCell>
                            <TableCell style={headerStyle(150)}>Tarea</TableCell>
                            <TableCell style={headerStyle(150)}>Estatus</TableCell>
                            <TableCell style={headerStyle(150)}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userTasks.map((userTask) => (
                            <TableRow key={userTask.idUserTask}>
                                <TableCell>{userTask.idUserTask}</TableCell>
                                <TableCell>{userTask.userName}</TableCell>
                                <TableCell>{userTask.title}</TableCell>
                                <TableCell>
                                    {editingTask?.idUserTask === userTask.idUserTask ? (
                                        <TextField
                                            select
                                            value={newStatus}
                                            onChange={(e) => setNewStatus(e.target.value)}
                                            variant="outlined"
                                            size="small"
                                        >
                                            <MenuItem value="Pendiente">Pendiente</MenuItem>
                                            <MenuItem value="En Proceso">En Proceso</MenuItem>
                                            <MenuItem value="Completada">Completada</MenuItem>
                                        </TextField>
                                    ) : (
                                        userTask.status
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingTask?.idUserTask === userTask.idUserTask ? (
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
                                                sx={{ marginLeft: 1 }} // Espacio entre botones
                                            >
                                                Cancelar
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Box>
                                            <Button
                                                onClick={() => handleEdit(userTask)}
                                                color="secondary"
                                                startIcon={<Edit />}
                                            >
                                                Editar
                                            </Button>
                                                <Tooltip title={role === 'Administrador' || role === 'Supervisor' ? '' : 'Sin permisos suficientes'}>
                                                <span>
                                                    <Button
                                                        onClick={() => handleDelete(userTask)}
                                                        color="secondary"
                                                        startIcon={<Delete />}
                                                        disabled={!(role === 'Administrador' || role === 'Supervisor')}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </span>
                                            </Tooltip>
                                        </Box>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CreateUserTask open={open} onClose={handleClose} />
        </Box>
    );
};

export default UserTasks;
