// frontend/src/services/profileService.js
import api from "./api";

// ✅ Create company profile
export async function createProfile(data) {
  const res = await api.post("/api/company-profiles/me", data);
  return res.data;
}

// ✅ Get logged-in user's company profile
export async function getProfile() {
  const res = await api.get("/api/company-profiles/me");
  return res.data;
}

// ✅ Update logged-in user's company profile
export async function updateProfile(data) {
  const res = await api.put("/api/company-profiles/me", data);
  return res.data;
}

// ✅ Delete logged-in user's company profile
export async function deleteProfile() {
  const res = await api.delete("/api/company-profiles/me");
  return res.data;
}
