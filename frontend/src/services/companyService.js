// frontend/src/services/companyService.js
import api from "./api";

const CompanyService = {
  getProfile: async () => {
    const response = await api.get("/companies/me");
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put("/companies/me", data);
    return response.data;
  },
};

export default CompanyService;
