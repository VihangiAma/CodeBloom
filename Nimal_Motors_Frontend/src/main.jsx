/*import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App.jsx";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import StockManagement from "./pages/StockManagement";
import { Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
     <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/stock" element={<StockManagement />} />
    </Routes>
    </Router>
    </React.StrictMode>
 
);*/

/*import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountantProfile from "./pages/AccountantProfile";
import InventoryDashboard from "./pages/InventoryDashboard";
import Invoices from "./pages/Invoices";
import "./index.css"; // Ensure Tailwind CSS is working

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/accountant" element={<AccountantProfile />} />
        <Route path="/inventory" element={<InventoryDashboard />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/" element={<Dashboard />} />

      </Routes>
    </Router>
  </React.StrictMode>
);

*/

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Ensure CSS is imported
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-right" autoClose={1000} />

  </React.StrictMode>
);



//User names and password
// user name- chamath.gunasekara@gmail.com
// password- mechanical123