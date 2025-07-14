import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import adminReducer from "./components/layout/admin/adminSlice";
import DashboardReducer from "./features/admin/dashboard/dashboardSlice";
import PatientsReducer from "./features/admin/patients/patientSlice";
import AppointmentsReducer from "./features/admin/appointments/appointmentSlice";
import UsersReducer from "./features/admin/users/userSlice";
import reportsReducer from "./features/admin/reports/reportSlice";
import settingsReducer from "./features/admin/setting/settingSlice";  
import logsReducer from "./features/admin/log/logSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    dashboard: DashboardReducer,
    patients: PatientsReducer,
    appointments: AppointmentsReducer,
    users: UsersReducer,
    reports: reportsReducer,
    settings: settingsReducer,
    logs: logsReducer,
  },
});

export default store;
