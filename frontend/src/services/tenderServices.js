import api from "./api";

export const getEnrichedReleases = async () => {
  const response = await api.get("/api/enriched-releases");
  return response.data;
};

export const getSpendByBuyer = async () => {
  const response = await api.get("/api/analytics/spend-by-buyer");
  return response.data;
};

export const extractTenderSummary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/api/summary/extract", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const checkReadiness = async (data) => {
  const response = await api.post("/api/readiness/check", data);
  return response.data;
};

export const searchTenders = async (filters) => {
  const params = new URLSearchParams();

  if (filters.keyword) params.append("keyword", filters.keyword);
  if (filters.province) params.append("province", filters.province);
  if (filters.submission_deadline) params.append("submission_deadline", filters.submission_deadline);
  if (filters.buyer) params.append("buyer", filters.buyer);
  if (filters.budget_min) params.append("budget_min", filters.budget_min);
  if (filters.budget_max) params.append("budget_max", filters.budget_max);

  const response = await api.get(`/api/search?${params.toString()}`);
  return response.data;
};
