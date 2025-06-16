import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import adminReducer from "./components/layout/admin/adminSlice";
import DashboardReducer from "./features/admin/dashboard/dashboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    dashboard: DashboardReducer,
  },
});

export default store;
