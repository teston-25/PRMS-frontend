import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import adminReducer from "./components/layout/admin/adminSlice";
import DashboardReducer from "./features/admin/dashboard/dashboardSlice";
import PatientsReducer from "./features/admin/patients/patientSlice";
import AppointmentsReducer from "./features/admin/appointments/appointmentSlice";
import UsersReducer from "./features/admin/users/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    dashboard: DashboardReducer,
    patients: PatientsReducer,
    appointments: AppointmentsReducer,
    users: UsersReducer,
  },
});

export default store;
