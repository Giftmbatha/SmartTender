import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'; // Corrected path
import Register from './pages/Register.jsx'; // Corrected path
import Dashboard from './pages/Dashboard.jsx'; // Corrected path
import Home from './pages/Home.jsx';
import './App.css'; // Ensure this is imported for styles

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  );
}

export default App;