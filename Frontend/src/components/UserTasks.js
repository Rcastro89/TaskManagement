import React, { useContext, useState } from 'react';
import { UserTaskContext } from '../context/UserTaskContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Button, Box, MenuItem, TextField } from '@mui/material';
import { Add, Edit, Save, Close } from '@mui/icons-material';
import AssignTask from './CreateUserTask';

const UserTasks = () => {
    const { userTasks, loading, error, fetchTasks, updateUserTaskStatus } = useContext(UserTaskContext);
    const [open, setOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [newStatus, setNewStatus] = useState('');

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
                <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpen}>
                    Asignar Nueva Tarea
                </Button>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '50px' }}>ID</TableCell>
                            <TableCell style={{ width: '50px' }}>Usuario</TableCell>
                            <TableCell style={{ width: '50px' }}>Tarea</TableCell>
                            <TableCell style={{ width: '50px' }}>Estatus</TableCell>
                            <TableCell style={{ width: '50px' }}>Acciones</TableCell>
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
                                        <Button
                                            onClick={() => handleEdit(userTask)}
                                            color="secondary"
                                            startIcon={<Edit />}
                                        >
                                            Editar
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AssignTask open={open} onClose={handleClose} />
        </Box>
    );
};

export default UserTasks;
