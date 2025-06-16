import api from "../services/axios";

const appointmentAPI = {
  // GET /appointments (admin, staff)
  getAllAppointments: async () => {
    const res = await api.get("/appointments");
    return res.data;
  },

  // POST /appointments (admin, staff)
  addAppointment: async (patient, assignedTo, date, reason) => {
    const res = await api.post("/appointments", {
      patient,
      assignedTo,
      date,
      reason,
    });
    return res.data;
  },

  // GET /appointments/today (admin, staff)
  getTodaysAppointments: async () => {
    const res = await api.get("/appointments/today");
    return res.data;
  },

  // GET /appointments/by-date?date=YYYY-MM-DD (admin, staff)
  getAppointmentsByDate: async (date) => {
    const res = await api.get(`/appointments/by-date?date=${date}`);
    return res.data;
  },

  // PATCH /appointments/:id (admin, staff)
  updateAppointment: async (id, updateData) => {
    const res = await api.patch(`/appointments/${id}`, updateData);
    return res.data;
  },

  // DELETE /appointments/:id (admin, staff)
  deleteAppointment: async (id) => {
    const res = await api.delete(`/appointments/${id}`);
    return res.data;
  },

  // GET /appointments/my-appointments (doctor, staff)
  getMyAppointments: async () => {
    const res = await api.get("/appointments/my-appointments");
    return res.data;
  },

  // GET /appointments/today/my (doctor, staff)
  getTodaysMyAppointments: async () => {
    const res = await api.get("/appointments/today/my");
    return res.data;
  },

  // PATCH /appointments/:id/status (doctor, staff)
  updateAppointmentStatus: async (id, status) => {
    const res = await api.patch(`/appointments/${id}/status`, { status });
    return res.data;
  },

  // GET /appointments/patient/:id (admin, staff, user)
  getAppointmentsByPatient: async (id) => {
    const res = await api.get(`/appointments/patient/${id}`);
    return res.data;
  },
};

export default appointmentAPI;
