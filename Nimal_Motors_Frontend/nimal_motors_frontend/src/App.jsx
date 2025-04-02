import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StockProvider } from "./context/StockContext";
import Dashboard from "./Pages/Dashboard";
import SupervisorLoginForm from "./Pages/SupervisorLoginForm";
import SupervisorDashboard from "./Components/SupervisorDashboard";


function App() {
    return (
        <StockProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/" element={<SupervisorLoginForm />} />
                    <Route path="/supervisor-dashboard/:section" element={<SupervisorDashboard />} />
                </Routes>
            </Router>
        </StockProvider>,
        <SupervisorLoginForm/>,
        <SupervisorDashboard/>
    );
}

export default App;
