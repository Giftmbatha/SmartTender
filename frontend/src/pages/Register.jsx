import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authServices";

export default function Register() {
  const [formData, setFormData] = useState({ 
    full_name: "", 
    email: "", 
    password: "", 
    team_name: "" 
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-10 transform transition-transform duration-300 hover:scale-[1.01]">
        
        {/* Header section with branding */}
        <div className="mb-8 text-center">
          <Link to="/" className="text-4xl font-extrabold tracking-tight text-white uppercase">SmartTender</Link>
          <h2 className="mt-4 text-3xl font-extrabold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Already a member?
            <Link to="/login" className="ml-1 font-semibold text-indigo-400 transition-colors duration-300 hover:text-indigo-300">
              Sign in here
            </Link>
          </p>
        </div>

        {/* The registration form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="relative px-4 py-3 text-sm text-red-400 bg-red-900 border border-red-700 rounded-lg" role="alert">
              <span className="block">{error}</span>
            </div>
          )}

          {/* Full Name input */}
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-300">Full Name</label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="block w-full px-4 py-3 mt-1 text-white transition-colors duration-300 bg-gray-900 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Team Name input */}
          <div>
            <label htmlFor="team_name" className="block text-sm font-medium text-gray-300">Team Name</label>
            <input
              id="team_name"
              name="team_name"
              type="text"
              value={formData.team_name}
              onChange={handleChange}
              placeholder="Your team name"
              required
              className="block w-full px-4 py-3 mt-1 text-white transition-colors duration-300 bg-gray-900 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="block w-full px-4 py-3 mt-1 text-white transition-colors duration-300 bg-gray-900 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Password input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="block w-full px-4 py-3 mt-1 text-white transition-colors duration-300 bg-gray-900 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Submit button with gradient and hover effects */}
          <button
            type="submit"
            className="flex justify-center w-full px-4 py-3 text-lg font-bold text-white transition-all duration-500 transform rounded-lg shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-2xl hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-1"
          >
            Create Your Account
          </button>
        </form>
      </div>
    </div>
  );
}