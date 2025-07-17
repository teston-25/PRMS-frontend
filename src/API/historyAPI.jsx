import axios from "../services/axios";

// Fetch all medical history entries for a patient
export const getMedicalHistory = (patientId) =>
  axios.get(`/patients/${patientId}/history`);

// Add a new medical history entry for a patient
export const addMedicalHistory = (patientId, data) =>
  axios.post(`/patients/${patientId}/history`, data);

// Update a specific medical history entry
export const updateMedicalHistory = (historyId, data) =>
  axios.patch(`/history/${historyId}`, data);

// Delete a specific medical history entry
export const deleteMedicalHistory = (historyId) =>
  axios.delete(`/history/${historyId}`); 