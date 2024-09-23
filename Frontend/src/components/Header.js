import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

/**
 * Componente de cabecera para la aplicación de gestión de tareas.
 * 
 * Muestra el nombre de la aplicación y botones de navegación según el rol del usuario.
 */
const Header = () => {
    const { logout } = useContext(AuthContext); // Obtener la función de cierre de sesión del contexto de autenticación
    const navigate = useNavigate(); // Hook para redireccionar
    const user = localStorage.getItem('user'); // Obtener el nombre del usuario desde el almacenamiento local
    const role = localStorage.getItem('role'); // Obtener el rol del usuario desde el almacenamiento local

    /**
     * Maneja el cierre de sesión del usuario.
     * Llama a la función logout y redirige a la página principal.
     */
    const handleLogout = () => {
        logout(); // Cerrar sesión
        navigate('/'); // Redirigir a la página principal
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Título de la aplicación, que actúa como un enlace a la página de inicio */}
                <Typography variant="h6" component={Link} to="/Home" color="white" sx={{ flexGrow: 1 }}>
                    Task Management
                </Typography>
                {user && ( // Mostrar opciones solo si hay un usuario autenticado
                    <>
                        {/* Enlace a las tareas de los usuarios */}
                        <Button component={Link} to="/UserTasks" color="inherit">
                            Tareas de Usuarios
                        </Button>
                        {role === 'Administrador' && ( // Mostrar opciones adicionales solo si el rol es 'Administrador'
                            <>
                                <Button component={Link} to="/Users" color="inherit">
                                    Usuarios
                                </Button>
                                <Button component={Link} to="/Task" color="inherit">
                                    Tareas
                                </Button>
                            </>
                        )}
                        {/* Nombre del usuario */}
                        <Typography variant="body1" style={{ marginRight: '16px', marginLeft: '50px' }}>
                            {user}
                        </Typography>
                        {/* Botón para cerrar sesión */}
                        <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
                            Salir
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
