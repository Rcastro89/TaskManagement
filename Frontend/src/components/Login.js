import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';

/**
 * Componente de inicio de sesión para la aplicación.
 * Permite a los usuarios ingresar su nombre de usuario y contraseña.
 */
const Login = () => {
    const { login, error } = useContext(AuthContext); // Obtener la función de inicio de sesión y el mensaje de error del contexto
    const [userName, setUserName] = useState(''); // Estado para el nombre de usuario
    const [password, setPassword] = useState(''); // Estado para la contraseña
    const navigate = useNavigate(); // Hook para la navegación
    const [loading, setLoading] = useState(false); // Estado para controlar la carga

    /**
     * Maneja la sumisión del formulario de inicio de sesión.
     * Intenta iniciar sesión con el nombre de usuario y contraseña proporcionados.
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        setLoading(true); // Activar el estado de carga
        try {
            await login(userName, password); // Llamar a la función de inicio de sesión
            navigate('/Home'); // Redirigir a la página de inicio después de un inicio de sesión exitoso
        } finally {
            setLoading(false); // Desactivar el estado de carga
        }
    };

    return (
        <Box
            display="flex" // Estilo para un diseño flexible
            flexDirection="column" // Organizar los elementos en una columna
            alignItems="center" // Centrar los elementos en el eje horizontal
            justifyContent="center" // Centrar los elementos en el eje vertical
            height="50vh" // Altura de la caja al 50% de la altura de la ventana
            sx={{ backgroundColor: '#f5f5f5', padding: 2 }} // Estilos personalizados
        >
            <Typography variant="h4" gutterBottom>
                Iniciar Sesión
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '300px' }}> {/* Formulario con ancho fijo */}
                <TextField
                    label="Usuario" // Etiqueta del campo
                    value={userName} // Valor del campo
                    onChange={(e) => setUserName(e.target.value)} // Manejar cambios en el campo
                    required // Campo obligatorio
                    fullWidth // Ancho completo
                    margin="normal" // Margen normal
                />
                <TextField
                    label="Contraseña" // Etiqueta del campo
                    type="password" // Tipo de entrada de contraseña
                    value={password} // Valor del campo
                    onChange={(e) => setPassword(e.target.value)} // Manejar cambios en el campo
                    required // Campo obligatorio
                    fullWidth // Ancho completo
                    margin="normal" // Margen normal
                />
                {error && ( // Mostrar mensaje de error si existe
                    <Typography color="error" variant="body2" style={{ marginTop: 16 }}>
                        {error}
                    </Typography>
                )}
                <Button
                    type="submit" // Tipo de botón de envío
                    variant="contained" // Botón con fondo
                    color="primary" // Color del botón
                    fullWidth // Ancho completo
                    disabled={loading} // Deshabilitar botón si está en carga
                    sx={{ marginTop: 2 }} // Margen superior
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'} {/* Mostrar cargador si está en carga */}
                </Button>
            </form>
        </Box>
    );
};

export default Login;
