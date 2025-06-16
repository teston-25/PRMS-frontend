import api from "../services/axios";

const userAPI = {
  // GET /users (admin, staff)
  getAllUsers: async () => {
    const res = await api.get("/users");
    return res.data;
  },

  // PATCH /users/:id/role (admin)
  updateUserRole: async (id, role) => {
    const res = await api.patch(`/users/${id}/role`, { role });
    return res.data;
  },

  // PATCH /users/:id/status (admin, staff)
  updateUserStatus: async (id, status) => {
    const res = await api.patch(`/users/${id}/status`, { status });
    return res.data;
  },

  // DELETE /users/:id (admin)
  deleteUser: async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  },
};

export default userAPI;
