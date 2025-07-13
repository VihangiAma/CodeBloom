import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
//import './styles/Global.css';

// Public Pages

import LoginPage from "./pages/login/LoginPage";
import Home from "./pages/customer/Home";
import AboutUs from "./pages/customer/AboutUs";
import Sections from "./pages/customer/Sections";
import Packages from "./pages/customer/Packages";
import Appointment from "./pages/Appointment";

import PremiumServiceForm from "./pages/premiumcustomer/PremiumServiceForm";

// Protected Pages (User)
import ProfilePage from "./pages/AccountantProfile";
import AdminDashboard from "./assets/pages/AdminDashBord";
import AdminProfile from "./pages/admin/AdminProfile";
import MechanicalSupervisor from "./pages/supervisors/MechanicalSupervisor";
import BodyshopSupervisor from "./pages/supervisors/BodyshopSupervisor";
import ServiceSupervisor from "./pages/supervisors/ServiceSupervisor";
import ElectricalSupervisor from "./pages/supervisors/ElectricalSupervisor";
import AccountantProfile from "./pages/AccountantProfile";
import PremiumCustomerProfile from "./pages/premiumcustomer/PremiumCustomerProfile";

import AdminUsers from "./pages/admin/AdminUsers";
import ServiceHistory from "./pages/premiumcustomer/ServiceHistory";
// New import for ServiceHistory

// Supervisor Protected Pages

import ProgressPage from "./Components/SupervisorSection/ProgressPage";

import AppointmentDetails from "./Components/SupervisorSection/Supervisors/AppointmentDetails";
import CompletedServices from "./components/SupervisorSection/CompletedServices";

import ApprovedAppointments from "./components/SupervisorSection/Supervisors/ApprovedAppointments";

import Completedappoinments from "./components/SupervisorSection/Supervisors/Competedappoinments";
import AdminInvoiceView from "./pages/admin/AdminInvoiceView";
import AddServiceForm from "./components/SupervisorSection/AddServiceForm";
import UserTable from "./components/SupervisorSection/UserTable";
import InvoiceForm from "./components/SupervisorSection/InvoiceForm";
import RepairPackage from "./Components/SupervisorSection/RepairPackagesPage";

// Section-specific Dashboards

import ServiceSupervisorDashboard from "./Components/SupervisorSection/ServiceSupervisorDashboard";
import MechanicalSupervisorSection from "./Components/SupervisorSection/MechanicalSupervisorDashboard";
import ElectricalSupervisorSection from "./components/SupervisorSection/ElectriaclSupervisorDashboard";
import BodyShopSupervisorSection from "./Components/SupervisorSection/BodyShopSupervisorDashboard";
import PremiumCustomerDashboard from "./pages/premiumcustomer/PremiumCustomerDashboard";

// Customer Pages
import BookAppointment from "./Components/CustomerSection/BookAppoinment";

//Chatsection
import ChatBot from "./components/ChatSection/Chatbot";

// Inventory and Sales Pages
import InventoryDashboard from "./components/InventoryDashboard";
import AccountantDashboard from "./components/AccountantDashboard";
import ExpensesPage from "./components/ExpensesPage";
import HomePage from "./assets/pages/HomePage";
import SalesReport from "./assets/pages/SalesReport";
import SalesReportView from "./assets/pages/SalesReportView";
import ResetPassword from "./pages/login/ResetPassword";

import CompletedBodyshopHistory from "./pages/premiumcustomer/CompletedBodyshopHistory";

import ManageBodyshopBookings from "./pages/Appointments/ManageBodyshopBookings";

// Inside your route config:

import GenerateInvoicePage from "./components/GenerateInvoicePage ";

// Protected Route Components
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const SupervisorPrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");
  return authToken ? children : <Navigate to="/supervisor-login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile/basic" element={<PremiumServiceForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ResetPassword />} />
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/sections" element={<Sections />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/appointment" element={<Appointment />} />
        {/* <Route path="/supervisor-login" element={<SupervisorLoginForm />} /> */}
        {/* Customer Public */}
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/repair-packages" element={<RepairPackage />} />
        {/* Protected User Routes */}
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
          path="/admin-profile"
          element={
            <PrivateRoute>
              <AdminProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <AdminUsers />
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
        <Route
          path="/premium-customer-dashboard"
          element={
            <PrivateRoute>
              <PremiumCustomerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/service-history"
          element={
            <PrivateRoute>
              <ServiceHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-invoice-view"
          element={
            <PrivateRoute>
              <AdminInvoiceView />
            </PrivateRoute>
          }
        />
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
          path="/admin-profile"
          element={
            <PrivateRoute>
              <AdminProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <AdminUsers />
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
        <Route
          path="/premium-customer-dashboard"
          element={
            <PrivateRoute>
              <PremiumCustomerDashboard />
            </PrivateRoute>
          }
        />
        {/* Supervisor Protected Routes */}
        <Route
          path="/appointments"
          element={
            <SupervisorPrivateRoute>
              <AppointmentDetails />
            </SupervisorPrivateRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <SupervisorPrivateRoute>
              <ProgressPage />
            </SupervisorPrivateRoute>
          }
        />
        <Route
          path="/completed-services"
          element={
            <SupervisorPrivateRoute>
              <CompletedServices />
            </SupervisorPrivateRoute>
          }
        />
        <Route
          path="/approved-appointments"
          element={
            <SupervisorPrivateRoute>
              <ApprovedAppointments />
            </SupervisorPrivateRoute>
          }
        />
        <Route
          path="/completed-appointments"
          element={
            <SupervisorPrivateRoute>
              <Completedappoinments />
            </SupervisorPrivateRoute>
          }
        />
        <Route
          path="/add-service"
          element={
            <SupervisorPrivateRoute>
              <AddServiceForm />
            </SupervisorPrivateRoute>
          }
        />
        <Route
          path="/user-table"
          element={
            <SupervisorPrivateRoute>
              <UserTable />
            </SupervisorPrivateRoute>
          }
        />
        <Route
          path="/invoice-form"
          element={
            <SupervisorPrivateRoute>
              <InvoiceForm />
            </SupervisorPrivateRoute>
          }
        />
        {/* Section-specific Dashboards */}
        <Route
          path="/service-supervisor-dashboard"
          element={
            <SupervisorPrivateRoute>
              <ServiceSupervisorDashboard />
            </SupervisorPrivateRoute>
          }
        />
        <Route
          path="/mechanical-supervisor-dashboard"
          element={
            <SupervisorPrivateRoute>
              <MechanicalSupervisorSection />
            </SupervisorPrivateRoute>
          }
        />
        <Route
          path="/electrical-supervisor-dashboard"
          element={
            <SupervisorPrivateRoute>
              <ElectricalSupervisorSection />
            </SupervisorPrivateRoute>
          }
        />
        <Route
          path="/body-shop-supervisor-dashboard"
          element={
            <SupervisorPrivateRoute>
              <BodyShopSupervisorSection />
            </SupervisorPrivateRoute>
          }
        />
        {/* Inventory and Sales */}
        <Route path="/inventory-dashboard" element={<InventoryDashboard />} />
        <Route path="/accountant-dashboard" element={<AccountantDashboard />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sales-report" element={<SalesReport />} />\
        <Route
          path="/chatbot/:section"
          element={<ChatBot section="Service" />}
        />
        <Route path="/view-sales-report" element={<SalesReportView />} />
        <Route
          path="/test/bodyshop-bookings"
          element={<ManageBodyshopBookings />}
        />
        <Route
          path="/bodyshop/completed"
          element={<CompletedBodyshopHistory />}
        />
        <Route path="/generate-invoice" element={<GenerateInvoicePage />} />
        <Route path="/generate-invoice/:id" element={<GenerateInvoicePage />} />
        <Route
          path="/chatbot/:section"
          element={<ChatBot section="Service" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
        <>
          <Route path="admin-invoice-view" element={<AdminInvoiceView />} />
        </>
      </Routes>
    </Router>
  );
}

export default App;
