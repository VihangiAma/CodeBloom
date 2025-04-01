import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StockProvider } from "./context/StockContext";
import Dashboard from "./Pages/Dashboard";
import AppointmentForm from "./Components/AppointmentForm";
import SupervisorDashboard from "./Components/SupervisorDashboard";
import AppointmentManagement from "./Components/Appointmentmanagement";

function App() {
    return (
        <StockProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/appointment" element={<AppointmentForm />} />
                </Routes>
            </Router>
        </StockProvider>,
        <AppointmentForm/>,
        <SupervisorDashboard/>
    );
}

export default App;
