import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProfile } from "../services/profileService"; // ✅ use createProfile

export default function CreateCompany() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    registration_number: "",
    industry: "",
    location: "",
    phone: "",
    email: "",
    website: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProfile(form);  // ✅ calls /api/company-profiles/me
      navigate("/dashboard");
    } catch (err) {
      alert("Company registration failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-2">
          SmartTender
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Register your company details
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Company Name</label>
            <input
              name="name"
              placeholder="Enter company name"
              value={form.name}
              onChange={handleChange}
              className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Registration Number</label>
            <input
              name="registration_number"
              placeholder="Enter registration number"
              value={form.registration_number}
              onChange={handleChange}
              className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Industry</label>
            <input
              name="industry"
              placeholder="Enter industry"
              value={form.industry}
              onChange={handleChange}
              className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Location</label>
            <input
              name="location"
              placeholder="Enter location"
              value={form.location}
              onChange={handleChange}
              className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Phone Number</label>
            <input
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
              className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Company Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter company email"
              value={form.email}
              onChange={handleChange}
              className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Website</label>
            <input
              name="website"
              placeholder="Enter company website"
              value={form.website}
              onChange={handleChange}
              className="border rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Finish & Go to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
