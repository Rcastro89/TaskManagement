import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { CreateUserContext } from '../context/CreateUserContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import CreateUser from './CreateUser';

const Users = () => {
    const { users, loading, error, fetchUsers } = useContext(UserContext);
    const { fetchRoles } = useContext(CreateUserContext);
    const [open, setOpen] = useState(false);
    const headerStyle = (width) => {
        return { fontWeight: 'bold', width: width }
    };

    const handleOpen = () => {
        setOpen(true);
        fetchRoles();
    };
    const handleClose = () => {
        setOpen(false);
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
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
                Usuarios
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 2 }}>
                <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleOpen}>
                    Nuevo usuario
                </Button>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'lightgrey' }}>
                            <TableCell style={headerStyle(20)}>ID</TableCell>
                            <TableCell style={headerStyle(150)}>Usuario</TableCell>
                            <TableCell style={headerStyle(150)}>Rol</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.idUser}>
                                <TableCell>{user.idUser}</TableCell>
                                <TableCell>{user.userName}</TableCell>
                                <TableCell>{user.roleName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CreateUser open={open} onClose={handleClose} />
        </Box>
    );
};

export default Users;
