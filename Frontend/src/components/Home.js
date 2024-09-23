import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

// Estilos personalizados para el componente
const useStyles = makeStyles((theme) => ({
    card: {
        transition: '0.3s', // Efecto de transición suave
        '&:hover': {
            boxShadow: theme.shadows[6], // Sombra al pasar el mouse
        },
        borderRadius: '10px', // Bordes redondeados
        textAlign: 'center', // Alinear el texto al centro
        padding: '20px', // Espaciado interno
        backgroundColor: theme.palette.background.paper, // Color de fondo del tema
    },
    button: {
        marginTop: theme.spacing(2), // Margen superior
        textTransform: 'capitalize', // Capitalizar el texto del botón
    },
    title: {
        fontWeight: 'bold', // Negrita para el título
    },
}));

/**
 * Componente principal de la página de inicio de la aplicación.
 * Muestra tarjetas que enlazan a diferentes secciones según el rol del usuario.
 */
const Home = () => {
    const classes = useStyles(); // Aplicar estilos personalizados
    const role = localStorage.getItem('role'); // Obtener el rol del usuario desde el almacenamiento local

    return (
        <Grid container spacing={3} style={{ padding: '20px', justifyContent: 'center' }}>
            {/* Tarjeta para "Tareas de Usuarios" */}
            <Grid item xs={12} sm={4}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" className={classes.title}>
                            Tareas de Usuarios
                        </Typography>
                        <Button
                            component={Link}
                            to="/UserTasks" // Enlace a la página de tareas de usuarios
                            size="large"
                            color="primary"
                            variant="contained"
                            className={classes.button}
                        >
                            Ver Tareas
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

            {/* Sección visible solo para administradores */}
            {role === 'Administrador' && (
                <>
                    {/* Tarjeta para "Usuarios" */}
                    <Grid item xs={12} sm={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5" className={classes.title}>
                                    Usuarios
                                </Typography>
                                <Button
                                    component={Link}
                                    to="/Users" // Enlace a la página de gestión de usuarios
                                    size="large"
                                    color="primary"
                                    variant="contained"
                                    className={classes.button}
                                >
                                    Ver Usuarios
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Tarjeta para "Tareas" */}
                    <Grid item xs={12} sm={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5" className={classes.title}>
                                    Tareas
                                </Typography>
                                <Button
                                    component={Link}
                                    to="/Task" // Enlace a la página de gestión de tareas
                                    size="large"
                                    color="primary"
                                    variant="contained"
                                    className={classes.button}
                                >
                                    Ver Tareas
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default Home;
