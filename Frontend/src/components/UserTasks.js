import React, { useContext } from 'react';
import { UserTaskContext } from '../context/UserTaskContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Button, Box } from '@mui/material';
import { Add } from '@mui/icons-material';

const UserTasks = () => {
    const { userTasks, loading, error } = useContext(UserTaskContext);

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
                <Button variant="contained" color="primary" startIcon={<Add />} >
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
        </Box>
    );

};

export default UserTasks;
