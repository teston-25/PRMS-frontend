import api from "../../services/axios";

const adminAPI = {
  Appointments: async () => {
    const res = await api.get("/appointments");
    return res.data;
  },
  addAppointments: async (patient, assignedTo, date, reason) => {
    const res = await api.post("/appointments", {
      patient,
      assignedTo,
      reason,
      date,
    });
    return res.data;
  },
  todaysAppointment: async () => {
    const res = await api.get("/appointments/today");
    return res.data;
  },
  Users: async () => {
    const res = await api.get("/users");
    return res.data;
  },
  Patients: async () => {
    const res = await api.get("/patient");
    return res.data;
  },
};

export default adminAPI;
