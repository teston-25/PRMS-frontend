import api from "../services/axios";
import { useSelector } from "react-redux";

const reportsAPI = {
  // GET /reports/summary (admin, doctor, staff)
  getSummaryReport: async () => {
    const response = await api.get("/reports/summary");
    // console.log("[reportsAPI] getSummaryReport response:", response);
    return response.data;
  },

  // GET /reports/appointments?from=DATE&to=DATE (admin, doctor, staff)
  getAppointmentsByDateRange: async (fromDate, toDate) => {
    const response = await api.get(
      `/reports/appointments-by-date?from=${fromDate}&to=${toDate}`
    );
    // console.log("[reportsAPI] getAppointmentsByDateRange response:", response);
    return response.data.data;
  },

  // GET /reports/diagnoses (admin, doctor, staff)
  getFrequentDiagnoses: async () => {
    const response = await api.get("/reports/frequent-diagnoses");
    // console.log("[reportsAPI] getFrequentDiagnoses response:", response);
    return response.data.data;
  },
};

export default reportsAPI;
