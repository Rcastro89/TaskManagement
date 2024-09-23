import React, { useState, useContext, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField } from '@mui/material';
import { ChangePasswordContext } from '../context/ChangePasswordContext';

const ChangePassword = ({ open, onClose, idUser }) => {
    const { fetchChangePassword } = useContext(ChangePasswordContext);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            const newPassword = {
                UserId: idUser,
                NewPassword: password,
            };

            await fetchChangePassword(newPassword);
            alert('Contraseña cambiada con éxito');
            onClose();
        } catch (err) {
            setErrorMessage('Error al cambiar la contraseña: ' + err.message);
        }
    };

    useEffect(() => {
    }, []);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit} style={{ width: '500px' }}>
                <DialogTitle>Cambiar contraseña</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        label="Nueva contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '16px', marginTop: '10px' }} >
                    </TextField>
                    <TextField
                        required
                        label="Confirmar contraseña"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '16px', marginTop: '10px' }} >
                    </TextField>
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

export default ChangePassword;
