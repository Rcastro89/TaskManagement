import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import UserTasks from './components/UserTasks';
import { UserTaskProvider } from './context/UserTaskContext';
import { AuthContext, AuthProvider } from './context/AuthContext'; // Importa AuthContext

import './App.css';

const App = () => {
    return (
        <AuthProvider>
            <UserTaskProvider>
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
                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </Router>
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
