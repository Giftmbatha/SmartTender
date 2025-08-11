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
