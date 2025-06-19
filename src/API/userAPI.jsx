import api from "../services/axios";

const userAPI = {
  // GET /users (admin, staff)
  getAllUsers: async () => {
    const response = await api.get("/users");
    console.log(response.data.data.users);
    return response.data.data.users;
  },

  // PATCH /users/:id/role (admin)
  updateUserRole: async (id, role) => {
    const response = await api.patch(`/users/${id}/role`, { role });
    return response.data;
  },

  // PATCH /users/:id/status (admin, staff)
  updateUserStatus: async (id, status) => {
    const response = await api.patch(`/users/${id}/status`, { status });
    return response.data;
  },

  // DELETE /users/:id (admin)
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export default userAPI;
