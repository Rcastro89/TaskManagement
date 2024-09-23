import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Importa ThemeProvider y createTheme

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Users from './components/Users';
import Task from './components/Task';
import PrivateRoute from './components/PrivateRoute';
import UserTasks from './components/UserTasks';
import Home from './components/Home';
import AdminRoute from './services/AdminRoute'

import { UserTaskProvider } from './context/UserTaskContext';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { CreateUserTaskProvider } from './context/CreateUserTaskContext';
import { UserProvider } from './context/UserContext';
import { CreateUserProvider } from './context/CreateUserContext';
import { TaskProvider } from './context/TaskContext';
import { CreateTaskProvider } from './context/CreateTaskContext';

import './App.css';

const theme = createTheme(); // Crea un tema

const App = () => {
    return (
        <ThemeProvider theme={theme}> {/* Envuelve la app con ThemeProvider */}
            <AuthProvider>
                <UserTaskProvider>
                    <CreateUserTaskProvider>
                        <UserProvider>
                            <CreateUserProvider>
                                <TaskProvider>
                                    <CreateTaskProvider>
                                        <Router>
                                            <div className="app-container">
                                                <Header />
                                                <div className="content">
                                                    <Routes>
                                                        <Route path="/" element={<LoginOrRedirect />} />
                                                        <Route path="/Home" element={
                                                            <PrivateRoute>
                                                                <Home />
                                                            </PrivateRoute>
                                                        } />
                                                        <Route path="/UserTasks" element={
                                                            <PrivateRoute>
                                                                <UserTasks />
                                                            </PrivateRoute>
                                                        } />
                                                        <Route path="/Users" element={
                                                            <PrivateRoute>
                                                                <AdminRoute>
                                                                    <Users />
                                                                </AdminRoute>
                                                            </PrivateRoute>
                                                        } />
                                                        <Route path="/Task" element={
                                                            <PrivateRoute>
                                                                <AdminRoute>
                                                                    <Task />
                                                                </AdminRoute>
                                                            </PrivateRoute>
                                                        } />
                                                    </Routes>
                                                </div>
                                                <Footer />
                                            </div>
                                        </Router>
                                    </CreateTaskProvider>
                                </TaskProvider>
                            </CreateUserProvider>
                        </UserProvider>
                    </CreateUserTaskProvider>
                </UserTaskProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

const LoginOrRedirect = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            navigate('/UserTasks');
        }
    }, [navigate]);

    return <Login />;
};

export default App;
