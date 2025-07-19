import api from "../services/axios";

const patientAPI = {
  // GET /patient (admin, staff)
  getAllPatients: async () => {
    const response = await api.get("/api/patient");
    return response.data;
  },

  // POST /patient (admin, staff)
  addPatient: async (patientData) => {
    const response = await api.post("/api/patient", patientData);
    return response.data.data.patient;
  },

  // GET /patient/:id (admin, staff, doctor, user)
  singlePatient: async (id) => {
    const response = await api.get(`/api/patient/${id}`);
    return response.data;
  },

  // PATCH /patient/:id (admin, staff)
  updatePatient: async (id, updatedData) => {
    const response = await api.patch(`/api/patient/${id}`, updatedData);
    return response.data.data.patient;
  },

  // DELETE /patient/:id (admin, staff)
  deletePatient: async (id) => {
    const response = await api.delete(`/api/patient/${id}`);
    return response.data;
  },

  // GET /patient/patients/search?q=term  (admin, staff)
  searchPatient: async (searchedPatient) => {
    const response = await api.get(
      `/api/patient/patients/search?q=${searchedPatient}`
    );
    return response.data;
  },
};

export default patientAPI;
