import api from "../services/axios";

const patientAPI = {
  // GET /patient (admin, staff)
  getAllPatients: async () => {
    const res = await api.get("/patient");
    return res.data;
  },

  // POST /patient (admin, staff)
  addPatient: async (
    firstName,
    lastName,
    dob,
    gender,
    email,
    phone,
    address
  ) => {
    const res = await api.post("/patient", {
      firstName,
      lastName,
      dob,
      gender,
      email,
      phone,
      address,
    });
    return res.data;
  },

  // GET /patient/:id (admin, staff, doctor, user)
  singlePatient: async (id) => {
    const res = await api.get(`/patient/${id}`);
    return res.data;
  },

  // PATCH /patient/:id (admin, staff)
  updatePatient: async (id, updatedData) => {
    const res = await api.patch(`/patient/${id}`, updatedData);
    return res.data;
  },

  // DELETE /patient/:id (admin, staff)
  deletePatient: async (id) => {
    const res = await api.delete(`/patient/${id}`);
    return res.data;
  },

  // GET /patient/patients/search?q=term  (admin, staff)
  searchPatient: async (searchedPatient) => {
    const res = await api.get(`/patient/patients/search?q=${searchedPatient}`);
    return res.data;
  },
};

export default patientAPI;
