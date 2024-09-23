import React, { useState, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField } from '@mui/material';
import { Autocomplete } from '@mui/lab';
import { CreateUserContext } from '../context/CreateUserContext';

const CreateUser = ({ open, onClose }) => {
    const { roles, fetchCreateUser } = useContext(CreateUserContext);
    const [userName, setUserName] = useState(null);
    const [passwordHash, setPasswordHash] = useState(null);
    const [confirmPasswordHash, setConfirmPasswordHash] = useState(null);
    const [idRole, setIdRole] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordHash !== confirmPasswordHash) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }
        try {
            const newUser = {
                UserName: userName,
                idRole: idRole?.idRole,
                PasswordHash: passwordHash,
            };
            await fetchCreateUser(newUser);
            onClose();
        } catch (err) {
            setErrorMessage('Error al crear usuario: ' + err.message);
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
                        style={{ marginBottom: '16px', marginTop: '10px' }} >
                    </TextField>
                    <TextField
                        required
                        label="Contraseña"
                        type="password"
                        value={passwordHash}
                        onChange={(e) => setPasswordHash(e.target.value)}
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '16px' }} >
                    </TextField>
                    <TextField
                        required
                        label="Confirme Contraseña"
                        type="password"
                        onChange={(e) => setConfirmPasswordHash(e.target.value)}
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '16px' }} >
                    </TextField>
                    <Autocomplete
                        options={roles}
                        getOptionLabel={(option) => option.roleName}
                        onChange={(event, newValue) => setIdRole(newValue)}
                        renderInput={(params) => <TextField {...params} label="Rol" variant="outlined" />}
                        style={{ marginBottom: '16px' }}
                        required
                    />
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
