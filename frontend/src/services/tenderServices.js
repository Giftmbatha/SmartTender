import api from "./api";

export const getEnrichedReleases = async () => {
  const response = await api.get("/api/enriched-releases");
  return response.data;
};



export const getSpendByBuyer = async () => {
  const response = await api.get("/api/analytics/spend-by-buyer");
  return response.data;
};

export const summarizeTender = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/api/summarize", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};


export const summarizeFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/api/summarize", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error summarizing file:", err);
    throw err;
  }
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



export const searchTenders = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });

    const response = await api.get(`/tenders/search?${params.toString()}`);
    const data = response.data;

    if (Array.isArray(data.results)) {
      return { count: data.count || data.results.length, results: data.results };
    }
    if (Array.isArray(data.releases)) {
      return { count: data.releases.length, results: data.releases };
    }
    if (Array.isArray(data.data)) {
      return { count: data.data.length, results: data.data };
    }

    return { count: 0, results: [] };
  } catch (error) {
    console.error("Error searching tenders:", error);
    throw error;
  }
};