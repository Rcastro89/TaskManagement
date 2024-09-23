import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Users from './components/Users';
import Task from './components/Task';
import PrivateRoute from './components/PrivateRoute';
import UserTasks from './components/UserTasks';

import { UserTaskProvider } from './context/UserTaskContext';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { CreateUserTaskProvider } from './context/CreateUserTaskContext';
import { UserProvider } from './context/UserContext';
import { CreateUserProvider } from './context/CreateUserContext';
import { TaskProvider } from './context/TaskContext';
import { CreateTaskProvider } from './context/CreateTaskContext';





import './App.css';

const App = () => {
    return (
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
                                                    <Route path="/" element={<LoginOrRedirect />} /> {/* Nuevo componente */}
                                                    <Route path="/UserTasks" element={
                                                        <PrivateRoute>
                                                            <UserTasks />
                                                        </PrivateRoute>
                                                    } />
                                                    <Route path="/Users" element={
                                                        <PrivateRoute>
                                                            <Users />
                                                        </PrivateRoute>
                                                    } />
                                                    <Route path="/Task" element={
                                                        <PrivateRoute>
                                                            <Task />
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
