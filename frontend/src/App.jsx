import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import SearchTenders from "./pages/SearchTenders.jsx";
import CompanyProfile from "./pages/CompanyProfile.jsx";
import SummarizeTenders from "./pages/summerizeTenders.jsx";

// PrivateRoute wrapper to protect routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/search"
        element={
          <PrivateRoute>
            <SearchTenders />
          </PrivateRoute>
        }
      />
      <Route
        path="/companies"
        element={
          <PrivateRoute>
            <CompanyProfile />
          </PrivateRoute>
        }
      />

      <Route
        path="/summarize"
        element={
          <PrivateRoute>
            <SummarizeTenders />
          </PrivateRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
