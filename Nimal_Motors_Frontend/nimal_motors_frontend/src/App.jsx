import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StockProvider } from "./context/StockContext";
import Dashboard from "./Pages/Dashboard";
import AppointmentForm from "./Components/AppointmentForm";

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
        <AppointmentForm/>
    );
}

export default App;
