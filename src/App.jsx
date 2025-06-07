import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./features/auth/signup/Signup";
import Login from "./features/auth/login/Login";
import Profile from "./pages/Profile";
import ForgotPass from "./features/auth/login/ForgotPass";
import ResetPass from "./features/auth/login/ResetPass";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <div className="absolute top-5 right-5 space-x-4">
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
          </div>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/reset-password/:token" element={<ResetPass />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
