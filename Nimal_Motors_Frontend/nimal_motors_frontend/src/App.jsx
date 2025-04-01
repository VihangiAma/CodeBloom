import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StockProvider } from "./context/StockContext";
import Dashboard from "./Pages/Dashboard";

function App() {
    return (
        <StockProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </Router>
        </StockProvider>
    );
}


export default App