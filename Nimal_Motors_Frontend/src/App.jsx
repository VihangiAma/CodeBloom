

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
//import ProfilePage from './pages/ProfilePage';
import AdminProfile from './pages/admin/AdminProfile';
import MechanicalSupervisor from './pages/supervisors/MechanicalSupervisor';
import BodyshopSupervisor from './pages/supervisors/BodyshopSupervisor';
import ServiceSupervisor from './pages/supervisors/ServiceSupervisor';
import ElectricalSupervisor from './pages/supervisors/ElectricalSupervisor';
import AccountantProfile from './pages/AccountantProfile';
import PremiumCustomerProfile from './pages/premiumcustomer/PremiumCustomerProfile';


import AdminUsers from './pages/admin/AdminUsers';


import InventoryDashboard from "./components/InventoryDashboard";


// Protected Route Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/users" element={<AdminUsers />} />

          {/* Protected Routes
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          /> */}


         

          <Route
            path="/admin-profile"
            element={
              <PrivateRoute>
                <AdminProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/mechanical-supervisor"
            element={
              <PrivateRoute>
                <MechanicalSupervisor />
              </PrivateRoute>
            }
          />
          <Route
            path="/bodyshop-supervisor"
            element={
              <PrivateRoute>
                <BodyshopSupervisor />
              </PrivateRoute>
            }
          />
          <Route
            path="/service-supervisor"
            element={
              <PrivateRoute>
                <ServiceSupervisor />
              </PrivateRoute>
            }
          />
          <Route
            path="/electrical-supervisor"
            element={
              <PrivateRoute>
                <ElectricalSupervisor />
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
}}

export default App;

