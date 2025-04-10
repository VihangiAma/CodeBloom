import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import LoginForm from "./pages/login/LoginPage";  // Path to the LoginForm component

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          {/* Add a default route for "/" */}
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
