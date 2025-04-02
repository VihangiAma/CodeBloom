import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StockProvider } from "./context/StockContext";
import Dashboard from "./Pages/Dashboard";
import SupervisorLoginForm from "./Pages/SupervisorLoginForm";


function App() {
    return (
        <StockProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/" element={<SupervisorLoginForm />} />
                    
                </Routes>
            </Router>
        </StockProvider>,
        <SupervisorLoginForm/>
   
    );
}

export default App;
