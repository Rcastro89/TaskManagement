import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { UserTaskProvider } from './context/UserTaskContext'; // Aseg�rate de importar

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <UserTaskProvider> {/* Envuelve App con UserTaskProvider */}
            <App />
        </UserTaskProvider>
    </AuthProvider>
);
