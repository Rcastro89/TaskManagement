import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const user = localStorage.getItem('user');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Task Management
                </Typography>
                {user && (
                    <>
                        <Button component={Link} to="/UserTasks" color="inherit">
                            Tareas de Usuarios
                        </Button>
                        <Button component={Link} to="/Users" color="inherit">
                            Usuarios
                        </Button>
                        <Typography variant="body1" style={{ marginRight: '16px', marginLeft: '50px' }}>
                            {user}
                        </Typography>
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
