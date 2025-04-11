import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import LoginPage from "./pages/login/LoginPage";  // Path to the LoginForm component

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
