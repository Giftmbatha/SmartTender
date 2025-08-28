import { useState, useEffect } from "react";
import { getProfile, updateProfile, deleteProfile } from "../services/profileService";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  // Fetch profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        setForm(data);
      } catch (err) {
        setError("⚠️ Failed to load profile");
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updated = await updateProfile(form);
      setProfile(updated.profile); // ✅ update with profile object only
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      try {
        await deleteProfile();
        localStorage.removeItem("access_token");
        navigate("/register"); // go back to register
      } catch (err) {
        alert("Failed to delete profile");
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (!profile) return <p className="text-center mt-10">No profile found</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg p-6 rounded-2xl w-full max-w-2xl">
        {/* Header with Back button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Company Profile</h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            ⬅ Back to Dashboard
          </button>
        </div>

        {!isEditing ? (
          <>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Reg No:</strong> {profile.registration_number}</p>
            <p><strong>Industry:</strong> {profile.industry}</p>
            <p><strong>Location:</strong> {profile.location}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Website:</strong> {profile.website}</p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <input
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              placeholder="Company Name"
              className="border p-2 w-full mb-2 rounded"
              required
            />
            <input
              name="registration_number"
              value={form.registration_number || ""}
              onChange={handleChange}
              placeholder="Registration Number"
              className="border p-2 w-full mb-2 rounded"
              required
            />
            <input
              name="industry"
              value={form.industry || ""}
              onChange={handleChange}
              placeholder="Industry"
              className="border p-2 w-full mb-2 rounded"
              required
            />
            <input
              name="location"
              value={form.location || ""}
              onChange={handleChange}
              placeholder="Location"
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 w-full mb-2 rounded"
              required
            />
            <input
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              name="website"
              value={form.website || ""}
              onChange={handleChange}
              placeholder="Website"
              className="border p-2 w-full mb-4 rounded"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
