import './App.css';
import Sidebar from './component/sidebar/Sidebar';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="app-container">
      <Sidebar />
      <div className="content-container">

      </div>
    </div>
    </BrowserRouter>
  )
}

export default App;
