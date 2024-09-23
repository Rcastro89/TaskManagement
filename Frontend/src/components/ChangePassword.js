import React, { useState, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField } from '@mui/material';
import { ChangePasswordContext } from '../context/ChangePasswordContext';

/**
 * Componente para cambiar la contraseña de un usuario.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.open - Indica si el diálogo está abierto.
 * @param {Function} props.onClose - Función para cerrar el diálogo.
 * @param {number} props.idUser - ID del usuario cuya contraseña se va a cambiar.
 */
const ChangePassword = ({ open, onClose, idUser }) => {
    // Contexto para manejar la lógica de cambio de contraseña
    const { fetchChangePassword } = useContext(ChangePasswordContext);

    // Estado para almacenar las contraseñas y mensajes de error
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * Maneja el envío del formulario para cambiar la contraseña.
     * 
     * @param {Event} e - Evento del formulario.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación para comprobar que las contraseñas coinciden
        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return;
        }

        try {
            // Objeto con la nueva contraseña y el ID del usuario
            const newPassword = {
                UserId: idUser,
                NewPassword: password,
            };

            // Llama a la función de cambio de contraseña
            await fetchChangePassword(newPassword);
            alert('Contraseña cambiada con éxito');
            onClose(); // Cierra el diálogo después de cambiar la contraseña
        } catch (err) {
            // Manejo de errores al cambiar la contraseña
            setErrorMessage('Error al cambiar la contraseña: ' + err.message);
        }
    };

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
                        style={{ marginBottom: '16px', marginTop: '10px' }} />
                    <TextField
                        required
                        label="Confirmar contraseña"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        variant="outlined"
                        fullWidth
                        style={{ marginBottom: '16px', marginTop: '10px' }} />
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

export default ChangePassword;
