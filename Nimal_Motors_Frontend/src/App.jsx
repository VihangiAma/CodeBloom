import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Import components
import LoginForm from "./assets/LoginForm";  // Path to the LoginForm component
import PremiumCustomerInterface from './assets/PremiumCustomerProfile';
import Supervisor1Interface from './assets/Supervisor1Interface';
import Supervisor2Interface from './assets/SupervisorProfile';
import Supervisor3Interface from './assets/Supervisor3Interface';
import Supervisor4Interface from './assets/Supervisor4Interface';
import AdminProfile from './assets/AdminProfile';
// import AccountantProfile from './assets/AccountantProfile';
import SupervisorProfile from './assets/SupervisorProfile';
import AccountantProfile from "./assets/AccountantProfile";


import Notifications from './assets/Notifications';
import Privacy from "./assets/Privacy";
import PersonalInfoAdmin from './assets/PersonalInfoAdmin';
import PersonalInfoAccountant from './assets/PersonalInfoAccountant';





function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/premium-customer" element={<PremiumCustomerInterface />} />
          <Route path="/supervisor-1" element={<Supervisor1Interface />} />
          <Route path="/supervisor-2" element={<Supervisor2Interface />} />
          <Route path="/supervisor-3" element={<Supervisor3Interface />} />
          <Route path="/supervisor-4" element={<Supervisor4Interface />} />
          {/* <Route path="/accountant-profile" element={<AccountantProfile />} /> */}
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/personalinfo-acc" element={<PersonalInfoAccountant />} />
          <Route path="/personalinfo-admin" element={<PersonalInfoAdmin />} />
          <Route path ="/supervisor-profile" element={<SupervisorProfile/>}/>
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/accountant-profile" element={<AccountantProfile />} />



          </Routes>
      </div>
    </Router>
  );
}

export default App;
