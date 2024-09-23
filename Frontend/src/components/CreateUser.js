import React, { useState, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField } from '@mui/material';
import { Autocomplete } from '@mui/lab';
import { CreateUserContext } from '../context/CreateUserContext';

/**
 * Componente para crear un nuevo usuario.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.open - Indica si el diálogo está abierto.
 * @param {Function} props.onClose - Función para cerrar el diálogo.
 */
const CreateUser = ({ open, onClose }) => {
    // Contexto para obtener los roles y la función de creación de usuario
    const { roles, fetchCreateUser } = useContext(CreateUserContext);

    // Estado para almacenar el nombre de usuario, contraseñas y rol
    const [userName, setUserName] = useState('');
    const [passwordHash, setPasswordHash] = useState('');
    const [confirmPasswordHash, setConfirmPasswordHash] = useState('');
    const [idRole, setIdRole] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * Maneja el envío del formulario para crear un nuevo usuario.
     * 
     * @param {Event} e - Evento del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica que las contraseñas coincidan
        if (passwordHash !== confirmPasswordHash) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            // Objeto que contiene los detalles del nuevo usuario
            const newUser = {
                UserName: userName,
                RoleId: idRole?.idRole, // Se obtiene el ID del rol seleccionado
                PasswordHash: passwordHash,
            };
            // Llama a la función para crear el usuario
            await fetchCreateUser(newUser);
            onClose(); // Cierra el diálogo después de crear el usuario
        } catch (err) {
            // Manejo de errores al crear el usuario
            setErrorMessage(err.message);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit} style={{ width: '500px' }}>
                <DialogTitle>Nuevo usuario</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        label="Nombre de usuario"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '16px', marginTop: '10px' }} />
                    <TextField
                        required
                        label="Contraseña"
                        type="password"
                        value={passwordHash}
                        onChange={(e) => setPasswordHash(e.target.value)}
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '16px' }} />
                    <TextField
                        required
                        label="Confirme Contraseña"
                        type="password"
                        value={confirmPasswordHash}
                        onChange={(e) => setConfirmPasswordHash(e.target.value)}
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '16px' }} />
                    <Autocomplete
                        options={roles}
                        getOptionLabel={(option) => option.roleName} // Muestra el nombre del rol
                        onChange={(event, newValue) => setIdRole(newValue)} // Establece el rol seleccionado
                        renderInput={(params) => <TextField {...params} label="Rol" variant="outlined" />}
                        style={{ marginBottom: '16px' }}
                        required
                    />
                    {/* Muestra el mensaje de error si existe */}
                    {errorMessage && <Typography color="error" style={{ margin: '6px' }}>{errorMessage}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">Cancelar</Button>
                    <Button type="submit" color="primary">Crear</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default CreateUser;
