// authServices.js
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm";

const API_BASE_URL = "http://localhost:8000"; // Dummy backend for now

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getEnrichedReleases = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/enriched-releases`);
    return response.data;
  } catch (error) {
    console.error("Error fetching enriched releases:", error);
    throw error;
  }
};

export const getSpendByBuyer = async () => {
  try {
    const response = await api.get("/api/analytics/spend-by-buyer");
    return response.data;
  } catch (error) {
    console.error("Error fetching spend by buyer:", error);
    throw error;
  }
};

export const extractTenderSummary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/api/summary/extract", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error extracting summary:", error);
    throw error;
  }
};

export const checkReadiness = async (data) => {
  try {
    const response = await api.post("/api/readiness/check", data);
    return response.data;
  } catch (error) {
    console.error("Error checking readiness:", error);
    throw error;
  }
};
