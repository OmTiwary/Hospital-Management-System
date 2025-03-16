import './App.css';
import Dashboard from './component/Dashboard/Dashboard';
import Sidebar from './component/sidebar/Sidebar';
import Patients from './component/Patients/Patients';
import Inventory from './component/Inventory/Inventory';
import Profile from './component/Profile/Profile';
import Remainder from './component/Remainder/Remainder';
import Revenue from './component/Revenue/Revenue';
import Settings from './component/Settings/Settings';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="app-container">
      <Sidebar />
      <div className="content-container">
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/patients' element={<Patients />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/remainder' element={<Remainder />} />
          <Route path='/revenue' element={<Revenue />} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App;
