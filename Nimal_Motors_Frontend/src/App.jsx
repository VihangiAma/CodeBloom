// 

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import MechanicalSupervisorProfile from './pages/MechanicalSupervisorProfile';
import BodyshopSupervisorProfile from './pages/BodyshopSupervisorProfile';
import ServiceSupervisorProfile from './pages/ServiceSupervisorProfile';
import ElectricalSupervisorProfile from './pages/ElectricalSupervisorProfile';
import AccountantProfile from './pages/AccountantProfile';
import PremiumCustomerProfile from './pages/PremiumCustomerProfile';

// Protected Route Component
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    
                    {/* Protected Routes */}
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <ProfilePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin-dashboard"
                        element={
                            <PrivateRoute>
                                <AdminDashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/mechanical-supervisor"
                        element={
                            <PrivateRoute>
                                <MechanicalSupervisorProfile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/bodyshop-supervisor"
                        element={
                            <PrivateRoute>
                                <BodyshopSupervisorProfile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/service-supervisor"
                        element={
                            <PrivateRoute>
                                <ServiceSupervisorProfile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/electrical-supervisor"
                        element={
                            <PrivateRoute>
                                <ElectricalSupervisorProfile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/accountant"
                        element={
                            <PrivateRoute>
                                <AccountantProfile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/premium-customer"
                        element={
                            <PrivateRoute>
                                <PremiumCustomerProfile />
                            </PrivateRoute>
                        }
                    />
                    
                    {/* Redirect root to login */}
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
