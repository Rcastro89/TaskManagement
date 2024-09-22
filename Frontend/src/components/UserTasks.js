import React, { useContext } from 'react';
import { UserTaskContext } from '../context/UserTaskContext'; // Asegúrate de que la ruta sea correcta
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress } from '@mui/material';

const UserTasks = () => {
    const { userTasks, loading, error } = useContext(UserTaskContext);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>idUserTask</TableCell>
                        <TableCell>UserName</TableCell>
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
    );
};

export default UserTasks;
