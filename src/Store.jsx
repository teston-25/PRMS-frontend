import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import adminReducer from "./components/layout/admin/adminSlice";
import DashboardReducer from "./features/admin/dashboard/dashboardSlice";
import PatientsReducer from "./features/admin/patients/patientSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    dashboard: DashboardReducer,
    patients: PatientsReducer,
  },
});

export default store;
