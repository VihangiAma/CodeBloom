
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


// Public Pages
import LoginPage from './pages/login/LoginPage';
// import RegisterPage from './pages/register/RegisterPage';


import SupervisorLoginForm from './Components/SupervisorSection/SupervisorLoginForm';
import PremiumServiceForm from './pages/premiumcustomer/PremiumServiceForm';

//  import SupervisorLoginForm from './Components/SupervisorSection/SupervisorLoginForm';


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
// import UserManagement from './pages/admin/UserManagement';
import AdminUsers from './pages/admin/AdminUsers';
import ServiceHistory from './pages/premiumcustomer/ServiceHistory';
// New import for ServiceHistory


// Supervisor Protected Pages
import ProgressPage from './Components/SupervisorSection/ProgressPage';
import ReportPage from './Components/SupervisorSection/ReportPage';
import AppointmentDetails from './Components/SupervisorSection/Supervisors/AppointmentDetails';
import CompletedServices from './components/SupervisorSection/CompletedServices';
import NotificationBar from './components/SupervisorSection/Notification';
import InvoicePage from './components/SupervisorSection/InvoicePage';
import ApprovedAppointments from './components/SupervisorSection/Supervisors/ApprovedAppointments';
import ServiceInvoice from './components/SupervisorSection/Supervisors/ServiceInvoice';
import Completedappoinments from './components/SupervisorSection/Supervisors/Competedappoinments';
import AdminInvoiceView from './pages/admin/AdminInvoiceView';
import AddServiceForm from './components/SupervisorSection/AddServiceForm';
import UserTable from './components/SupervisorSection/UserTable';


// Section-specific Dashboards
import ServiceSupervisorDashboard from './Components/SupervisorSection/ServiceSupervisorDashboard';
import MechanicalSupervisorSection from './Components/SupervisorSection/MechanicalSupervisorDashboard';
import ElectricalSupervisorSection from './components/SupervisorSection/ElectriaclSupervisorDashboard';
import BodyShopSupervisorSection from './Components/SupervisorSection/BodyShopSupervisorDashboard';
import PremiumCustomerDashboard from './pages/premiumcustomer/PremiumCustomerDashboard'; 

// Customer Pages
import BookAppointment from './Components/CustomerSection/BookAppoinment';

// Inventory and Sales Pages
import InventoryDashboard from './components/InventoryDashboard';
import AccountantDashboard  from './components/AccountantDashboard'; 
import ExpensesPage from './components/ExpensesPage';   
import HomePage from './assets/pages/HomePage';
import SalesReport from './assets/pages/SalesReport';
import SalesReportView from './assets/pages/SalesReportView';
import ResetPassword from './pages/login/ResetPassword';


import CompletedBodyshopHistory from './pages/premiumcustomer/CompletedBodyshopHistory';

import ManageBodyshopBookings from './pages/Appointments/ManageBodyshopBookings';


// Inside your route config:


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

        <Route path="/profile/basic" element={<PremiumServiceForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />



        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/supervisor-login" element={<SupervisorLoginForm />} />


        {/* Customer Public */}
        <Route path="/book-appointment" element={<BookAppointment />} />

        {/* Protected User Routes */}
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin-profile" element={<PrivateRoute><AdminProfile /></PrivateRoute>} />
        <Route path="/admin/users" element={<PrivateRoute><AdminUsers /></PrivateRoute>} />
        {/* <Route path="/user-management" element={<PrivateRoute><UserManagement /></PrivateRoute>} /> */}
        <Route path="/mechanical-supervisor" element={<PrivateRoute><MechanicalSupervisor /></PrivateRoute>} />
        <Route path="/bodyshop-supervisor" element={<PrivateRoute><BodyshopSupervisor /></PrivateRoute>} />
        <Route path="/service-supervisor" element={<PrivateRoute><ServiceSupervisor /></PrivateRoute>} />
        <Route path="/electrical-supervisor" element={<PrivateRoute><ElectricalSupervisor /></PrivateRoute>} />
        <Route path="/accountant" element={<PrivateRoute><AccountantProfile /></PrivateRoute>} />
        <Route path="/premium-customer" element={<PrivateRoute><PremiumCustomerProfile /></PrivateRoute>} />
        <Route path="/premium-customer-dashboard" element={<PrivateRoute><PremiumCustomerDashboard /></PrivateRoute>} />
        <Route path="/service-history" element={<PrivateRoute><ServiceHistory /></PrivateRoute>} />
{/* <Route 
  path="/premium-customer-dashboard" 
  element={
    <PrivateRoute>
      <PremiumCustomerDashboard />
    </PrivateRoute>
  } 
/>         */}
        <Route path="/admin-invoice-view" element={<PrivateRoute><AdminInvoiceView /></PrivateRoute>} />
        

        {/* Supervisor Protected Routes */}
        
        <Route path="/appointments" element={<SupervisorPrivateRoute><AppointmentDetails /></SupervisorPrivateRoute>} />
        <Route path="/progress" element={<SupervisorPrivateRoute><ProgressPage /></SupervisorPrivateRoute>} />
        <Route path="/report" element={<SupervisorPrivateRoute><ReportPage /></SupervisorPrivateRoute>} />
         <Route path="/completed-services" element={<SupervisorPrivateRoute><CompletedServices /></SupervisorPrivateRoute>} />
        <Route path="/notification" element={<SupervisorPrivateRoute><NotificationBar /></SupervisorPrivateRoute>} />
        <Route path="/invoice/:id" element={<InvoicePage />} />
        <Route path="/approved-appointments" element={<SupervisorPrivateRoute><ApprovedAppointments /></SupervisorPrivateRoute>} />
        <Route path="/completed-appointments" element={<SupervisorPrivateRoute><Completedappoinments /></SupervisorPrivateRoute>} />
        <Route path="/service-invoice" element={<SupervisorPrivateRoute><ServiceInvoice /></SupervisorPrivateRoute>} />

        <Route path="/user-table" element={<SupervisorPrivateRoute><UserTable /></SupervisorPrivateRoute>} />
       <Route path="/add-service" element={<SupervisorPrivateRoute><AddServiceForm /></SupervisorPrivateRoute>} />

        
        {/* Section-specific Dashboards */}
      
        <Route path="/service-supervisor-dashboard" element={<SupervisorPrivateRoute><ServiceSupervisorDashboard /></SupervisorPrivateRoute>} />
        <Route path="/mechanical-supervisor-dashboard" element={<SupervisorPrivateRoute><MechanicalSupervisorSection /></SupervisorPrivateRoute>} />
        <Route path="/electrical-supervisor-dashboard" element={<SupervisorPrivateRoute><ElectricalSupervisorSection /></SupervisorPrivateRoute>} />
        <Route path="/body-shop-supervisor-dashboard" element={<SupervisorPrivateRoute><BodyShopSupervisorSection /></SupervisorPrivateRoute>} />

        {/* Inventory and Sales */}
        <Route path="/inventory-dashboard" element={<InventoryDashboard />} />
        <Route path="/accountant-dashboard" element={<AccountantDashboard />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sales-report" element={<SalesReport />} />

        <Route path="/view-sales-report" element={<SalesReportView />} />
        <Route path="/test/bodyshop-bookings" element={<ManageBodyshopBookings />} /> 
        <Route path="/bodyshop/completed" element={<CompletedBodyshopHistory />} />



        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>



  );
}

export default App;