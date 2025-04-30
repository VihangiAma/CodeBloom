
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import SupervisorLoginForm from './Components/SupervisorSection/SupervisorLoginForm';

// Protected Pages (User)
import ProfilePage from './pages/AccountantProfile';
import AdminDashboard from './assets/pages/AdminDashBord';
import AdminProfile from './pages/admin/AdminProfile';
import MechanicalSupervisor from './pages/supervisors/MechanicalSupervisor';
import BodyshopSupervisor from './pages/supervisors/BodyshopSupervisor';
import ServiceSupervisor from './pages/supervisors/ServiceSupervisor';
import ElectricalSupervisor from './pages/supervisors/ElectricalSupervisor';
import AccountantProfile from './pages/AccountantProfile';
import PremiumCustomerProfile from './pages/premiumcustomer/PremiumCustomerProfile';
import UserManagement from './pages/admin/UserManagement';
import AdminUsers from './pages/admin/AdminUsers';

// Supervisor Protected Pages
import SupervisorDashboard from './Components/SupervisorSection/SupervisorDashboard';
import SupervisorProfile from './Components/SupervisorSection/SupervisorProfile';
import ProgressPage from './Components/SupervisorSection/ProgressPage';
import ReportPage from './Components/SupervisorSection/ReportPage';
import AppointmentDetails from './Components/SupervisorSection/Supervisors/AppointmentDetails';
import AddServiceForm from './Components/SupervisorSection/AddServiceForm';

// Section-specific Dashboards
import MechanicalDashboard from './Components/SupervisorSection/Supervisors/MechanicalDashboard';
import ElectricalDashboard from './Components/SupervisorSection/Supervisors/ElectricalDashboard';
import BodyShopDashboard from './Components/SupervisorSection/Supervisors/BodyShopDashboard';
import ServiceDashboard from './Components/SupervisorSection/Supervisors/ServiceDashboard';
import ServiceSupervisorDashboard from './Components/SupervisorSection/ServiceSupervisorDashboard';
import MechanicalSupervisorSection from './Components/SupervisorSection/MechanicalSupervisorDashboard';
import ElectricalSupervisorSection from './Components/SupervisorSection/ElectriaclSupervisorDashboard';
import BodyShopSupervisorSection from './Components/SupervisorSection/BodyShopSupervisorDashboard';
import PremiumCustomerDashboard from './pages/premiumcustomer/PremiumCustomerDashboard'; 

// Customer Pages
import BookAppointment from './Components/CustomerSection/BookAppoinment';

// Inventory and Sales Pages
import InventoryDashboard from './components/InventoryDashboard';
import AccountantDashboard  from './components/AccountantDashboard';    
import HomePage from './assets/pages/HomePage';
import SalesReport from './assets/pages/SalesReport';
import SalesReportAdd from './assets/pages/SalesReportAdd';
import SalesReportUpdate from './assets/pages/SalesReportUpdate';
import SalesReportDelete from './assets/pages/SalesReportDelete';
import SalesReportView from './assets/pages/SalesReportView';

// Protected Route Components
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const SupervisorPrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken');
  return authToken ? children : <Navigate to="/supervisor-login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/supervisor-login" element={<SupervisorLoginForm />} />


        {/* Customer Public */}
        <Route path="/book-appointment" element={<BookAppointment />} />

        {/* Protected User Routes */}
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin-profile" element={<PrivateRoute><AdminProfile /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute><AdminUsers /></PrivateRoute>} />
        <Route path="/user-management" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
        <Route path="/mechanical-supervisor" element={<PrivateRoute><MechanicalSupervisor /></PrivateRoute>} />
        <Route path="/bodyshop-supervisor" element={<PrivateRoute><BodyshopSupervisor /></PrivateRoute>} />
        <Route path="/service-supervisor" element={<PrivateRoute><ServiceSupervisor /></PrivateRoute>} />
        <Route path="/electrical-supervisor" element={<PrivateRoute><ElectricalSupervisor /></PrivateRoute>} />
        <Route path="/accountant" element={<PrivateRoute><AccountantProfile /></PrivateRoute>} />
        <Route path="/premium-customer" element={<PrivateRoute><PremiumCustomerProfile /></PrivateRoute>} />
        <Route path="/premium-customer-dashboard" element={<PrivateRoute><PremiumCustomerDashboard /></PrivateRoute>} />
        


        {/* Supervisor Protected Routes */}
        <Route path="/dashboard" element={<SupervisorPrivateRoute><SupervisorDashboard /></SupervisorPrivateRoute>} />
        <Route path="/supervisor-profile" element={<SupervisorPrivateRoute><SupervisorProfile /></SupervisorPrivateRoute>} />
        <Route path="/appointments" element={<SupervisorPrivateRoute><AppointmentDetails /></SupervisorPrivateRoute>} />
        <Route path="/progress" element={<SupervisorPrivateRoute><ProgressPage /></SupervisorPrivateRoute>} />
        <Route path="/report" element={<SupervisorPrivateRoute><ReportPage /></SupervisorPrivateRoute>} />
        <Route path="/add-service" element={<SupervisorPrivateRoute><AddServiceForm /></SupervisorPrivateRoute>} />

        {/* Section-specific Dashboards */}
        <Route path="/supervisor/mechanical" element={<SupervisorPrivateRoute><MechanicalDashboard /></SupervisorPrivateRoute>} />
        <Route path="/supervisor/electrical" element={<SupervisorPrivateRoute><ElectricalDashboard /></SupervisorPrivateRoute>} />
        <Route path="/supervisor/body-shop" element={<SupervisorPrivateRoute><BodyShopDashboard /></SupervisorPrivateRoute>} />
        <Route path="/supervisor/service" element={<SupervisorPrivateRoute><ServiceDashboard /></SupervisorPrivateRoute>} />
        <Route path="/service-dashboard" element={<SupervisorPrivateRoute><ServiceSupervisorDashboard /></SupervisorPrivateRoute>} />
        <Route path="/mechanical-supervisor-dashboard" element={<SupervisorPrivateRoute><MechanicalSupervisorSection /></SupervisorPrivateRoute>} />
        <Route path="/electrical-supervisor-dashboard" element={<SupervisorPrivateRoute><ElectricalSupervisorSection /></SupervisorPrivateRoute>} />
        <Route path="/body-shop-supervisor-dashboard" element={<SupervisorPrivateRoute><BodyShopSupervisorSection /></SupervisorPrivateRoute>} />



        {/* Inventory and Sales */}
        <Route path="/inventory-dashboard" element={<InventoryDashboard />} />
        <Route path="/accountant-dashboard" element={<AccountantDashboard />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sales-report" element={<SalesReport />} />
        <Route path="/add-sales-report" element={<SalesReportAdd onAdd={() => {}} />} />
        <Route path="/update-sales-report" element={<SalesReportUpdate />} />
        <Route path="/delete-sales-report" element={<SalesReportDelete />} />
        <Route path="/view-sales-report" element={<SalesReportView />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;