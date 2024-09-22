import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Prueba from './components/prueba';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/prueba" element={
                            <PrivateRoute>
                                <Prueba />
                            </PrivateRoute>
                        } />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
