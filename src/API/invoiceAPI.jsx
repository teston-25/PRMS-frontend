import api from "../services/axios";

const invoiceAPI = {
  // GET /invoices (admin, staff, doctor, user - filtered by role)
  getInvoices: async () => {
    const response = await api.get("/invoices");
    return response.data.data;
  },

  // POST /invoices (doctor only)
  createInvoice: async (invoiceData) => {
    const response = await api.post("/invoices", {
      patient: invoiceData.patient,
      medicalHistory: invoiceData.medicalHistory,
      services: invoiceData.services,
      totalAmount: invoiceData.totalAmount,
    });
    return response.data.data;
  },

  // PATCH /invoices/:id/mark-paid (admin, staff only)
  markInvoiceAsPaid: async (invoiceId) => {
    const response = await api.patch(`/invoices/${invoiceId}/mark-paid`);
    return response.data.data;
  },

  // GET /invoices/patient/:patientId (admin, staff, doctor, user - if owner)
  getPatientInvoices: async (patientId) => {
    const response = await api.get(`/invoices/patient/${patientId}`);
    return response.data.data;
  },

  // GET /invoices/:id (admin, staff, doctor, user - if owner)
  getInvoiceById: async (invoiceId) => {
    const response = await api.get(`/invoices/${invoiceId}`);
    return response.data.data;
  },
};

export default invoiceAPI;
