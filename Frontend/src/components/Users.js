import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { CreateUserContext } from '../context/CreateUserContext';
import { Autocomplete, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, CircularProgress, Box, Button } from '@mui/material';
import { Add, Save, Edit, Close, Delete, VpnKey } from '@mui/icons-material';
import CreateUser from './CreateUser';
import ChangePassword from './ChangePassword';

const Users = () => {
    const { users, loading, error, fetchUsers, fetchUpdateUser, fetchDeleteUser } = useContext(UserContext);
    const { roles, fetchRoles } = useContext(CreateUserContext);
    const [open, setOpen] = useState(false);
    const [openPass, setOpenPass] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [newRole, setNewRole] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [idUser, setIdUser] = useState('');

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

    const handleEdit = (user) => {
        fetchRoles();
        setEditingUser(user);
        setNewRole(newRole);
        setNewUserName(user.userName);
    };

    const handleCancel = () => {
        setEditingUser(null);
        setNewRole("");
        setNewUserName("");
    };

    const handleDelete = async (user) => {
        try {
            await fetchDeleteUser(user);
        }
        catch (err) {
            alert('Error eliminando al usuario: ' + err);
        }
    };

    const handleSave = async () => {
        if (editingUser) {
            const updateUser = {
                IdUser: editingUser.idUser,
                UserName: newUserName,
                IdRole: parseInt(newRole, 10)
            }

            try {
                await fetchUpdateUser(updateUser);
            }
            catch (err) {
                alert('Error al actualizar el usuario: ' + err);
            }

            setEditingUser(null);
            fetchUsers();
        }
    };

    const handleOpenPass = (idus) => {
        setIdUser(idus);

        setOpenPass(true);
    };

    const handleClosePass = () => {
        setOpenPass(false);
        setEditingUser(null);

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
                            <TableCell style={headerStyle(150)}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.idUser}>
                                <TableCell>{user.idUser}</TableCell>
                                <TableCell>
                                    {editingUser?.idUser === user.idUser ? (
                                        <TextField
                                            value={newUserName}
                                            onChange={(e) => setNewUserName(e.target.value)}
                                            variant="outlined"
                                            size="small"
                                        >
                                        </TextField>
                                    ) : (
                                        user.userName
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingUser?.idUser === user.idUser ? (
                                        <Autocomplete
                                            options={roles}
                                            getOptionLabel={(option) => option.roleName}
                                            onChange={(event, newValue) => {
                                                if (newValue) {
                                                    setNewRole(newValue.idRole);
                                                } else {
                                                    setNewRole('');
                                                }
                                            }}
                                            renderInput={(params) => <TextField {...params} label="Rol" variant="outlined" />}
                                            style={{ marginBottom: '16px' }}
                                            required
                                        />
                                    ) : (
                                            user.roleName
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingUser?.idUser === user.idUser ? (
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
                                                    onClick={() => handleEdit(user)}
                                                    color="secondary"
                                                    startIcon={<Edit />}
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    onClick={() => handleDelete(user)}
                                                    color="secondary"
                                                    startIcon={<Delete />}
                                                >
                                                    Eliminar
                                                </Button>
                                                <Button
                                                    onClick={() => handleOpenPass(user.idUser)}
                                                    color="secondary"
                                                    startIcon={<VpnKey />}
                                                >
                                                    Cambiar contraseña
                                                </Button>
                                            </Box>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CreateUser open={open} onClose={handleClose} />
            <ChangePassword open={openPass} onClose={handleClosePass} idUser={idUser} />
        </Box>
    );
};

export default Users;
