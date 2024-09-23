import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

/**
 * Componente de cabecera para la aplicaci�n de gesti�n de tareas.
 * 
 * Muestra el nombre de la aplicaci�n y botones de navegaci�n seg�n el rol del usuario.
 */
const Header = () => {
    const { logout } = useContext(AuthContext); // Obtener la funci�n de cierre de sesi�n del contexto de autenticaci�n
    const navigate = useNavigate(); // Hook para redireccionar
    const user = localStorage.getItem('user'); // Obtener el nombre del usuario desde el almacenamiento local
    const role = localStorage.getItem('role'); // Obtener el rol del usuario desde el almacenamiento local

    /**
     * Maneja el cierre de sesi�n del usuario.
     * Llama a la funci�n logout y redirige a la p�gina principal.
     */
    const handleLogout = () => {
        logout(); // Cerrar sesi�n
        navigate('/'); // Redirigir a la p�gina principal
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {/* T�tulo de la aplicaci�n, que act�a como un enlace a la p�gina de inicio */}
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
                        {/* Bot�n para cerrar sesi�n */}
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
