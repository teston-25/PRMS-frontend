import api from "../services/axios";

const auditLogAPI = {

  getAuditLogs: async () => {
    try {
      const response = await api.get("/audit-logs");
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
      throw error; 
    }
  }
}
export default auditLogAPI;