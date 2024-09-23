import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        transition: '0.3s',
        '&:hover': {
            boxShadow: theme.shadows[6],
        },
        borderRadius: '10px',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        marginTop: theme.spacing(2),
        textTransform: 'capitalize',
    },
    title: {
        fontWeight: 'bold',
    },
}));

const Home = () => {
    const classes = useStyles();
    const role = localStorage.getItem('role');

    return (
        <Grid container spacing={3} style={{ padding: '20px', justifyContent: 'center' }}>
            <Grid item xs={12} sm={4}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" className={classes.title}>
                            Tareas de Usuarios
                        </Typography>
                        <Button
                            component={Link}
                            to="/UserTasks"
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

            {role === 'Administrador' && (
                <>
                    <Grid item xs={12} sm={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5" className={classes.title}>
                                    Usuarios
                                </Typography>
                                <Button
                                    component={Link}
                                    to="/Users"
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
                    <Grid item xs={12} sm={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5" className={classes.title}>
                                    Tareas
                                </Typography>
                                <Button
                                    component={Link}
                                    to="/Task"
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
