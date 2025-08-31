import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'; 
import Register from './pages/Register.jsx'; 
import Dashboard from './pages/Dashboard.jsx'; 
import Home from './pages/Home.jsx';
import SearchTenders from "./pages/SearchTenders";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/search" element={<SearchTenders />} /> 
    </Routes>
  );
}

export default App;