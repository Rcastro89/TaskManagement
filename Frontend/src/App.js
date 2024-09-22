import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import UserTasks from './components/UserTasks';
import { UserTaskProvider } from './context/UserTaskContext';
import { AuthProvider } from './context/AuthContext';

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
                                <Route path="/" element={<Login />} />
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

export default App;
