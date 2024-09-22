import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import '../styles/loginStyle.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);
        try {
            await login(userName, password);
            navigate('/prueba');
        } catch (error) {
            console.log(error);

            setErrorMessage(error.response ? error.response.data : 'Error al iniciar sesión');
            console.error('Error al iniciar sesión:', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs" className="loginFmr">
            <Typography variant="h5">Iniciar Sesión</Typography>
            <form onSubmit={handleSubmit} >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Nombre de Usuario"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}>
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </Button>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            </form>
        </Container>
    );
};

export default Login;
