import api from "../services/axios";

const appointmentAPI = {
  // GET /appointments (admin, staff)
  getAllAppointments: async () => {
    const response = await api.get("/api/appointments");
    return response.data;
  },

  // GET /appointments/:id (admin, staff)
  getAppointmentById: async (id) => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  // POST /appointments (admin, staff)
  addAppointment: async (newAppointment) => {
    const response = await api.post("/api/appointments", newAppointment);
    console.log(response.data);
    return response.data;
  },

  // GET /appointments/today (admin, staff)
  getTodaysAppointments: async () => {
    const response = await api.get("/api/appointments/today");
    return response.data;
  },

  // GET /appointments/by-date?date=YYYY-MM-DD (admin, staff)
  getAppointmentsByDate: async (date) => {
    const response = await api.get(`/api/appointments/by-date?date=${date}`);
    return response.data;
  },

  // PATCH /appointments/:id (admin, staff)
  updateAppointment: async (id, updateData) => {
    const response = await api.patch(`/api/appointments/${id}`, updateData);
    return response.data;
  },

  // DELETE /appointments/:id (admin, staff)
  deleteAppointment: async (id) => {
    const response = await api.delete(`/api/appointments/${id}`);
    return response.data;
  },

  // GET /appointments/my-appointments (doctor, staff)
  getMyAppointments: async () => {
    const response = await api.get("/api/appointments/my-appointments");
    return response.data;
  },

  // GET /appointments/today/my (doctor, staff)
  getTodaysMyAppointments: async () => {
    const response = await api.get("/api/appointments/today/my");
    console.log(response.data);
    return response.data;
  },

  // PATCH /appointments/:id/status (doctor, staff)
  updateAppointmentStatus: async (id, status) => {
    const response = await api.patch(`/api/appointments/${id}/status`, { status });
    return response.data;
  },

  // GET /appointments/patient/:id (admin, staff, user)
  getAppointmentsByPatient: async (id) => {
    const response = await api.get(`/api/appointments/patient/${id}`);
    return response.data;
  },

  getAppointmentsByPatientId: async (patientId) => {
    // Replace with your actual API call logic
    const response = await fetch(`/api/appointments/patient/${patientId}`);
    if (!response.ok) throw new Error('Failed to fetch appointments');
    return await response.json();
  },
};

export default appointmentAPI;
