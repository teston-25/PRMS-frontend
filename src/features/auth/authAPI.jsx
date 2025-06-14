import api from "../../services/axios";

const authAPI = {
  login: async (email, password) => {
    const response = await api.post("/auth/signin", { email, password });
    return response.data;
  },

  signup: async (userData) => {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (token, newPassword) => {
    const response = await api.post(`/auth/reset-password/${token}`, {
      password: newPassword,
    });
    return response.data;
  },
};

export default authAPI;
