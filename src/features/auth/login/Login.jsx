import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../../../components/forms/AuthCard";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login, setLoading, setError } from "../authSlice";
import authAPI from "../../../API/authAPI";
import { FaHome } from "react-icons/fa";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const normalizedEmail = formData.email.trim().toLowerCase();
    dispatch(setLoading(true));

    try {
      const data = await authAPI.login(normalizedEmail, formData.password);

      dispatch(login(data));
      localStorage.setItem("token", data.token);
      toast.success(data.message || "Login successful!");

      navigate(data.user.role === "admin" ? "/admin/dashboard" : "/profile");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      dispatch(setError(errorMessage));
      toast.error(errorMessage || "Login failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center relative p-4">
      <Link
        to="/"
        className="absolute top-6 right-6 text-white text-2xl hover:text-gray-200 transition"
        title="Back to Home"
      >
        <FaHome size={24} />
      </Link>

      <AuthCard
        title="Welcome Back"
        buttonText="Log In"
        onSubmit={handleLogin}
        footer={
          <p className="text-sm mt-4 text-center text-white">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        }
      >
        <div className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
