import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = authService.getCurrentUser();
    if (!data) {
      navigate("/login");
    } else {
      setUser(data);
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">📊 Dashboard</h1>
      {user && <p className="text-gray-700">Welcome back, {user.name || "User"}!</p>}
      <div className="mt-6 text-gray-500">Tender tracking and insights will appear here.</div>
    </div>
  );
}
