import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  LogOut,
  User,
  Briefcase,
  Settings,
  LayoutDashboard,
  Grid3X3,
  Layers,
} from "lucide-react";
import TenderSearch from "../components/Tender/TenderSearch";

export default function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    const savedUser = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
      return;
    }

    if (savedRole) setRole(savedRole);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-white bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="container flex items-center justify-between px-6 py-5 mx-auto">
          <Link
            to="/"
            className="flex items-center gap-2 text-3xl font-extrabold tracking-widest text-white uppercase"
          >
            <LayoutDashboard className="text-indigo-400 h-7 w-7" />
            SmartTender
          </Link>
          <div className="flex items-center space-x-6">
            <span className="font-medium text-gray-300">
              Welcome, {user.full_name || "User"}!
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-2 font-bold text-white transition duration-300 transform bg-red-600 rounded-full shadow-md hover:bg-red-500 hover:scale-105"
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container flex-1 px-6 py-12 mx-auto">
        <h1 className="mb-8 text-4xl font-extrabold text-white">
          {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
        </h1>

        {role === "admin" ? (
          /* Admin Dashboard */
          <div className="p-8 bg-gray-800 border border-gray-700 shadow-xl rounded-2xl">
            <h2 className="flex items-center gap-3 mb-6 text-2xl font-bold text-white">
              <Briefcase className="text-indigo-400 h-7 w-7" />
              Admin Tools
            </h2>
            <p className="mb-6 text-gray-400">
              Manage users, plans, and teams across the entire SmartTender
              platform.
            </p>

            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <li className="p-6 transition-all duration-300 transform bg-gray-900 shadow-md rounded-xl hover:shadow-2xl hover:-translate-y-1">
                <Link
                  to="/admin/teams"
                  className="flex items-center gap-2 font-semibold text-indigo-400 transition-colors duration-300 hover:text-indigo-300"
                >
                  <Grid3X3 className="w-5 h-5" />
                  Manage Teams
                </Link>
              </li>
              <li className="p-6 transition-all duration-300 transform bg-gray-900 shadow-md rounded-xl hover:shadow-2xl hover:-translate-y-1">
                <Link
                  to="/admin/plans"
                  className="flex items-center gap-2 font-semibold text-indigo-400 transition-colors duration-300 hover:text-indigo-300"
                >
                  <Layers className="w-5 h-5" />
                  Manage Plans
                </Link>
              </li>
              <li className="p-6 transition-all duration-300 transform bg-gray-900 shadow-md rounded-xl hover:shadow-2xl hover:-translate-y-1">
                <Link
                  to="/admin/users"
                  className="flex items-center gap-2 font-semibold text-indigo-400 transition-colors duration-300 hover:text-indigo-300"
                >
                  <User className="w-5 h-5" />
                  View All Users
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          /* User Dashboard */
          <div className="space-y-8">
            {/* Quick actions / cards */}
            <div className="p-8 bg-gray-800 border border-gray-700 shadow-xl rounded-2xl">
              <h2 className="flex items-center gap-3 mb-6 text-2xl font-bold text-white">
                <User className="text-green-400 h-7 w-7" />
                User Tools
              </h2>
              <p className="mb-6 text-gray-400">
                Access your tools to streamline your tendering process and win
                more bids.
              </p>
              <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <li className="p-6 transition-all duration-300 transform bg-gray-900 shadow-md rounded-xl hover:shadow-2xl hover:-translate-y-1">
                  <Link
                    to="/user/plan"
                    className="flex items-center gap-2 font-semibold text-green-400 transition-colors duration-300 hover:text-green-300"
                  >
                    <Settings className="w-5 h-5" />
                    View My Plan
                  </Link>
                </li>
                <li className="p-6 transition-all duration-300 transform bg-gray-900 shadow-md rounded-xl hover:shadow-2xl hover:-translate-y-1">
                  <Link
                    to="/user/summaries"
                    className="flex items-center gap-2 font-semibold text-green-400 transition-colors duration-300 hover:text-green-300"
                  >
                    <Layers className="w-5 h-5" />
                    Tender Summaries
                  </Link>
                </li>
                <li className="p-6 transition-all duration-300 transform bg-gray-900 shadow-md rounded-xl hover:shadow-2xl hover:-translate-y-1">
                  <Link
                    to="/user/readiness"
                    className="flex items-center gap-2 font-semibold text-green-400 transition-colors duration-300 hover:text-green-300"
                  >
                    <Briefcase className="w-5 h-5" />
                    Check Readiness
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tender Search embedded on dashboard */}
            <div className="p-8 bg-gray-800 border border-gray-700 shadow-xl rounded-2xl">
              <TenderSearch />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 bg-gray-900">
        <div className="container px-6 mx-auto text-sm text-center text-gray-500">
          &copy; {new Date().getFullYear()} SmartTender. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
