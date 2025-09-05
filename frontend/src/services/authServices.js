import api from "./api.js";

export const registerUser = async (formData) => {
  const response = await api.post("/auth/register", formData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  const data = response.data;
  
  // Save token & plan details
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("plan", JSON.stringify({
    name: data.plan_name,
    max_users: data.max_users,
    can_ai_summary: data.can_ai_summary,
    can_readiness_check: data.can_readiness_check,
    can_export: data.can_export,
    weekly_search_limit: data.weekly_search_limit
  }));
  
  return data;
};
