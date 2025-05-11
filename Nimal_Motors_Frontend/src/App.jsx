
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


// Public Pages
import LoginPage from './pages/login/LoginPage';
// import RegisterPage from './pages/register/RegisterPage';

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
<<<<<<< HEAD
//import SupervisorDashboard from './components/SupervisorSection/SupervisorDashboard';
import ProgressPage from './components/SupervisorSection/ProgressPage';
import ReportPage from './components/SupervisorSection/ReportPage';
import AppointmentDetails from './components/SupervisorSection/Supervisors/AppointmentDetails';
import AddServiceForm from './components/SupervisorSection/AddServiceForm';

// Section-specific Dashboards
//import MechanicalDashboard from './components/SupervisorSection/Supervisors/MechanicalDashboard';
//import ElectricalDashboard from './components/SupervisorSection/Supervisors/ElectricalDashboard';
//import BodyShopDashboard from './components/SupervisorSection/Supervisors/BodyShopDashboard';
//import ServiceDashboard from './Components/SupervisorSection/Supervisors/ServiceDashboard';
import ServiceSupervisorDashboard from './components/SupervisorSection/ServiceSupervisorDashboard';
import MechanicalSupervisorSection from './components/SupervisorSection/MechanicalSupervisorDashboard';
=======


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
import AddServiceForm from './Components/SupervisorSection/AddServiceForm';

import CompletedServices from './components/SupervisorSection/CompletedServices';
import NotificationBar from './components/SupervisorSection/Notification';
import InvoicePage from './components/SupervisorSection/InvoicePage';
import ApprovedAppointments from './components/SupervisorSection/Supervisors/ApprovedAppointments';
import ServiceInvoice from './components/SupervisorSection/Supervisors/ServiceInvoice';
import Completedappoinments from './components/SupervisorSection/Supervisors/Competedappoinments';
import AdminInvoiceView from './pages/admin/AdminInvoiceView';
import UserTable from './components/SupervisorSection/UserTable';


// Section-specific Dashboards
import ServiceSupervisorDashboard from './Components/SupervisorSection/ServiceSupervisorDashboard';
import MechanicalSupervisorSection from './Components/SupervisorSection/MechanicalSupervisorDashboard';
>>>>>>> 5827098e322c3c9d13877241ca5251f29ab13619
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
<<<<<<< HEAD
//import SalesReportAdd from './assets/pages/SalesReportAdd';
//import SalesReportUpdate from './assets/pages/SalesReportUpdate';
//import SalesReportDelete from './assets/pages/SalesReportDelete';
//import SalesReportView from './assets/pages/SalesReportView';
=======

import SalesReportView from './assets/pages/SalesReportView';
>>>>>>> 5827098e322c3c9d13877241ca5251f29ab13619


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
        {/* <Route path="/register" element={<RegisterPage />} /> */}
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
        <Route path="/admin-invoice-view" element={<PrivateRoute><AdminInvoiceView /></PrivateRoute>} />
        

        {/* Supervisor Protected Routes */}
<<<<<<< HEAD
        {/*<Route path="/dashboard" element={<SupervisorPrivateRoute><SupervisorDashboard /></SupervisorPrivateRoute>} />*/}
=======
        
>>>>>>> 5827098e322c3c9d13877241ca5251f29ab13619
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
<<<<<<< HEAD
       {/* <Route path="/supervisor/mechanical" element={<SupervisorPrivateRoute><MechanicalDashboard /></SupervisorPrivateRoute>} />*/}
        {/*<Route path="/supervisor/electrical" element={<SupervisorPrivateRoute><ElectricalDashboard /></SupervisorPrivateRoute>} />
        <Route path="/supervisor/body-shop" element={<SupervisorPrivateRoute><BodyShopDashboard /></SupervisorPrivateRoute>} />
        <Route path="/supervisor/service" element={<SupervisorPrivateRoute><ServiceDashboard /></SupervisorPrivateRoute>} />*/}
        <Route path="/service-dashboard" element={<SupervisorPrivateRoute><ServiceSupervisorDashboard /></SupervisorPrivateRoute>} />
=======
      
        <Route path="/service-supervisor-dashboard" element={<SupervisorPrivateRoute><ServiceSupervisorDashboard /></SupervisorPrivateRoute>} />
>>>>>>> 5827098e322c3c9d13877241ca5251f29ab13619
        <Route path="/mechanical-supervisor-dashboard" element={<SupervisorPrivateRoute><MechanicalSupervisorSection /></SupervisorPrivateRoute>} />
        <Route path="/electrical-supervisor-dashboard" element={<SupervisorPrivateRoute><ElectricalSupervisorSection /></SupervisorPrivateRoute>} />
        <Route path="/body-shop-supervisor-dashboard" element={<SupervisorPrivateRoute><BodyShopSupervisorSection /></SupervisorPrivateRoute>} />

        {/* Inventory and Sales */}
        <Route path="/inventory-dashboard" element={<InventoryDashboard />} />
        <Route path="/accountant-dashboard" element={<AccountantDashboard />} />
        
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sales-report" element={<SalesReport />} />
<<<<<<< HEAD
        {/*<Route path="/add-sales-report" element={<SalesReportAdd onAdd={() => {}} />} />
        <Route path="/update-sales-report" element={<SalesReportUpdate />} />
        <Route path="/delete-sales-report" element={<SalesReportDelete />} />
        <Route path="/view-sales-report" element={<SalesReportView />} />*/}
=======

        <Route path="/view-sales-report" element={<SalesReportView />} />
>>>>>>> 5827098e322c3c9d13877241ca5251f29ab13619

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;