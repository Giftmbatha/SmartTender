import axios from "axios";

const API_URL = "http://localhost:8000/api/companies";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getCompanies = async () => {
  const res = await axios.get(API_URL, { headers: getAuthHeaders() });
  return res.data;
};

export const createCompany = async (companyData) => {
  const res = await axios.post(API_URL, companyData, { headers: getAuthHeaders() });
  return res.data;
};

export const updateCompany = async (id, companyData) => {
  const res = await axios.put(`${API_URL}/${id}`, companyData, { headers: getAuthHeaders() });
  return res.data;
};

export const deleteCompany = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
  return res.data;
};
