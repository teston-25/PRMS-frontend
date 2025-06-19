import { Routes, Route } from "react-router-dom";

import AdminLayout from "../pages/AdminLayout";
import Dashboard from "../features/admin/dashboard/Dashboard";
import Patients from "../features/admin/patients/Patients";
import Appointments from "../features/admin/appointments/Appointments";
import Users from "../features/admin/users/Users";
import Reports from "../features/admin/reports/Reports";
import Settings from "../features/admin/setting/Settings";
import Logs from "../features/admin/log/Logs";
import Landing from "../pages/Landing";
import Login from "../features/auth/login/Login";
import Signup from "../features/auth/signup/Signup";
import ForgotPass from "../features/auth/login/ForgotPass";
import ResetPass from "../features/auth/login/ResetPass";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoutes";
import Profile from "../pages/Profile";
import AddPatientForm from "../features/admin/patients/AddPatientForm";
import EditPatientForm from "../features/admin/patients/EditPatientForm";
import ViewPatientProfile from "../features/admin/patients/ViewPatientProfile";

export default function AppRoutes() {
  return (
    <Routes>
      {/* { Public Routes /} */}
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPass />} />
      <Route path="/reset-password/:token" element={<ResetPass />} />
      <Route path="" element={<NotFound />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={<ProtectedRoute allowedRoles={["admin"]} />}
      >
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="users" element={<Users />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logs" element={<Logs />} />
          <Route path="patients/add" element={<AddPatientForm />} />
          <Route path="patients/edit/:id" element={<EditPatientForm />} />
          <Route path="patients/:id" element={<ViewPatientProfile />} />
          {/* <Route path="patients/:id" element={<Appointments />} /> */}
        </Route>
      </Route>
      {/* staff Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["staff", "user", "doctor"]}>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
