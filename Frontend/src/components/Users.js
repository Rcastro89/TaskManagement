import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { CreateUserContext } from '../context/CreateUserContext';
import {
    Autocomplete,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
    CircularProgress,
    Box,
    Button
} from '@mui/material';
import { Add, Save, Edit, Close, Delete, VpnKey } from '@mui/icons-material';
import CreateUser from './CreateUser';
import ChangePassword from './ChangePassword';

const Users = () => {
    // Obtener datos y funciones del contexto
    const { users, loading, error, fetchUsers, fetchUpdateUser, fetchDeleteUser } = useContext(UserContext);
    const { roles, fetchRoles } = useContext(CreateUserContext);

    // Estados locales
    const [open, setOpen] = useState(false);
    const [openPass, setOpenPass] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [newRole, setNewRole] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [idUser, setIdUser] = useState('');

    // Estilo para los encabezados de la tabla
    const headerStyle = (width) => {
        return { fontWeight: 'bold', width: width };
    };

    // Función para abrir el modal de creación de usuario
    const handleOpen = () => {
        setOpen(true);
        fetchRoles(); // Cargar roles cuando se abre el modal
    };

    // Función para cerrar el modal de creación de usuario
    const handleClose = () => {
        setOpen(false);
        fetchUsers(); // Volver a cargar la lista de usuarios al cerrar
    };

    // Función para editar un usuario
    const handleEdit = (user) => {
        fetchRoles(); // Cargar roles antes de editar
        setEditingUser(user);
        setNewRole(newRole);
        setNewUserName(user.userName);
    };

    // Función para cancelar la edición
    const handleCancel = () => {
        setEditingUser(null);
        setNewRole("");
        setNewUserName("");
    };

    // Función para eliminar un usuario
    const handleDelete = async (user) => {
        try {
            await fetchDeleteUser(user);
            fetchUsers(); // Recargar usuarios después de la eliminación
        } catch (err) {
            alert(err); // Manejo de errores
        }
    };

    // Función para guardar los cambios del usuario editado
    const handleSave = async () => {
        if (editingUser) {
            const updateUser = {
                UserId: editingUser.idUser,
                UserName: newUserName,
                RoleId: parseInt(newRole, 10)
            };

            try {
                await fetchUpdateUser(updateUser);
            } catch (err) {
                alert(err); // Manejo de errores
            }

            setEditingUser(null);
            fetchUsers(); // Recargar usuarios después de guardar
        }
    };

    // Función para abrir el modal de cambio de contraseña
    const handleOpenPass = (idus) => {
        setIdUser(idus);
        setOpenPass(true);
    };

    // Función para cerrar el modal de cambio de contraseña
    const handleClosePass = () => {
        setOpenPass(false);
        setEditingUser(null);
        fetchUsers(); // Recargar usuarios al cerrar
    };

    // Cargar usuarios al montar el componente
    useEffect(() => {
        fetchUsers();
    }, []);

    // Manejo de estados de carga y error
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
                                        />
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
                                            <Button onClick={handleSave} color="primary" startIcon={<Save />}>
                                                Guardar
                                            </Button>
                                            <Button onClick={handleCancel} color="secondary" startIcon={<Close />} sx={{ marginLeft: 1 }}>
                                                Cancelar
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Box>
                                            <Button onClick={() => handleEdit(user)} color="secondary" startIcon={<Edit />}>
                                                Editar
                                            </Button>
                                            <Button onClick={() => handleDelete(user)} color="secondary" startIcon={<Delete />}>
                                                Eliminar
                                            </Button>
                                            <Button onClick={() => handleOpenPass(user.idUser)} color="secondary" startIcon={<VpnKey />}>
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
