import axios from "../services/axios";

// Get current user's profile
export const getProfile = async () => {
  const res = await axios.get("/api/profile/me");
  return res.data;
};

// Update current user's profile
export const updateProfile = async (data) => {
  const res = await axios.patch("/api/profile/me", data);
  return res.data;
};

export default { getProfile, updateProfile }; 