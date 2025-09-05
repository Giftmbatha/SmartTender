import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authServices";
import { Mail, Lock, Eye, EyeOff, TriangleAlert } from "lucide-react";


const colors = {
  primary: "#708A58",
  secondary: "#2D4F2B",
  background: "#FAF7F3",
};

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await loginUser(formData);

      if (response?.access_token) {
        localStorage.setItem("token", response.access_token);
        navigate("/dashboard");
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-sans" style={{ backgroundColor: colors.background }}>
      <div className="flex w-full max-w-6xl overflow-hidden transition-all duration-300 shadow-2xl rounded-3xl">
        
        {/* Left section with image and text - hidden on small screens */}
        <div className="relative items-center justify-center hidden p-8 md:flex md:w-1/2 lg:p-12" style={{ backgroundColor: colors.secondary }}>
          <div className="absolute inset-0 z-0">
            <img 
              src="https://placehold.co/1000x1200/2D4F2B/FAF7F3?text=Welcome+to+SmartTender"
              alt="Background image"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="relative z-10 text-center text-white">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
              SmartTender
            </h1>
            <p className="text-lg font-light lg:text-xl">
              Your gateway to a smarter tendering process.
            </p>
          </div>
        </div>

        {/* Right section with the login form */}
        <div className="flex items-center justify-center w-full p-6 md:w-1/2 sm:p-10 lg:p-16" style={{ backgroundColor: colors.background }}>
          <div className="w-full max-w-md">
            
            {/* Header section with branding */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold" style={{ color: colors.secondary }}>
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Don't have an account?
                <Link to="/register" className="ml-1 font-semibold transition-colors duration-300 hover:underline" style={{ color: colors.primary }}>
                  Create a new one
                </Link>
              </p>
            </div>

            {/* The login form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="relative flex items-center p-4 text-sm rounded-lg" style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }} role="alert">
                  <TriangleAlert className="w-5 h-5 mr-3" />
                  <span className="block">{error}</span>
                </div>
              )}

              {/* Email input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="block w-full rounded-lg border-gray-300 pl-10 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#708A58] focus:border-[#708A58]"
                  />
                </div>
              </div>

              {/* Password input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="block w-full rounded-lg border-gray-300 pl-10 pr-10 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#708A58] focus:border-[#708A58]"
                  />
                  <div 
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Submit button with gradient and hover effects */}
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-3 text-lg font-bold text-white transition-all duration-300 rounded-lg shadow-md hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}