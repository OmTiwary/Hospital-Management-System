import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from './components/Dashboard/Dashboard'
import Appointment from './components/Appointment/Appointment'
import Campaign from './components/Campaign/Campaign'
import Medecine from './components/Medicine/Medicine'
import Invoices from './components/Invoices/Invoice'
import Payments from './components/Payments/Payment'
import Profile from './components/Profile/Profile'
import Reception from './components/Reception/Reception'
import Service from './components/Services/Service'
import Settings from './components/Settings/Setting'
import Doctors from './components/Doctors/Doctors'


function App() {
  return (
    <>
    <BrowserRouter>
    <div className="app-container">
      <Sidebar />
      <div className="content-container">
        <Routes>
        <Route path="/" element= {<Dashboard />} />
        <Route path="/appointment" element= {<Appointment />} />
        <Route path="/campaign" element= {<Campaign />} />
        <Route path="/doctors" element= {<Doctors />} />
        <Route path="/invoices" element= {<Invoices />} />
        <Route path="/medicine" element= {<Medecine />} />
        <Route path="/payments" element= {<Payments />} />
        <Route path="/profile" element= {<Profile />} />
        <Route path="/reception" element= {<Reception />} />
        <Route path="/service" element= {<Service />} />
        <Route path="/settings" element= {<Settings />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;
