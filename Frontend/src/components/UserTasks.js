import React, { useContext, useState } from 'react';
import { UserTaskContext } from '../context/UserTaskContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Button, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import AssignTask from './CreateUserTask';

const UserTasks = () => {
    const { userTasks, loading, error, fetchTasks } = useContext(UserTaskContext);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        fetchTasks(); 
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
                            <TableCell>ID</TableCell>
                            <TableCell>Usuario</TableCell>
                            <TableCell>Tarea</TableCell>
                            <TableCell>Estatus</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userTasks.map((userTask) => (
                            <TableRow key={userTask.idUserTask}>
                                <TableCell>{userTask.idUserTask}</TableCell>
                                <TableCell>{userTask.userName}</TableCell>
                                <TableCell>{userTask.title}</TableCell>
                                <TableCell>{userTask.status}</TableCell>
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
