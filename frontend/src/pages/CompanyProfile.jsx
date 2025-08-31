import { useEffect, useState } from "react";
import CompanyService from "./services/companyService";

export default function CompanyProfile() {
  const [formData, setFormData] = useState({
    industry_sector: "",
    services: "",
    certifications: "",
    coverage: "",
    experience_years: "",
    contact_info: "",
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch existing profile on load
    CompanyService.getProfile()
      .then((data) => setFormData(data))
      .catch(() => setMessage({ type: "error", text: "Failed to load profile." }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CompanyService.updateProfile(formData);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to update profile." });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Company Profile</h2>

      {message && (
        <div
          className={`p-2 mb-3 rounded ${
            message.type === "success" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="industry_sector"
          value={formData.industry_sector}
          onChange={handleChange}
          placeholder="Industry Sector"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="services"
          value={formData.services}
          onChange={handleChange}
          placeholder="Services Provided"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="certifications"
          value={formData.certifications}
          onChange={handleChange}
          placeholder="Certifications (CIDB, BBBEE, etc.)"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="coverage"
          value={formData.coverage}
          onChange={handleChange}
          placeholder="Geographic Coverage"
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="experience_years"
          value={formData.experience_years}
          onChange={handleChange}
          placeholder="Years of Experience"
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="contact_info"
          value={formData.contact_info}
          onChange={handleChange}
          placeholder="Contact Information"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
