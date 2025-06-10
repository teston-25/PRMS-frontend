import { useState } from "react";
import api from "../../../services/axios";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../../components/forms/AuthCard";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setLoading, setError } from "../authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    dispatch(setLoading(true));

    try {
      const res = await api.post("/auth/signin", {
        email: normalizedEmail,
        password,
      });

      const { user, token, role, message } = res.data;

      dispatch(
        login({
          user,
          token,
          role,
        })
      );

      localStorage.setItem("token", token);

      toast.success("Login successful: " + message);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      dispatch(setError(errorMessage));
      toast.error("Login failed: " + errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AuthCard title="Welcome" buttonText="Log In" onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 px-4 py-2 border rounded-md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-2 px-4 py-2 border rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <p className="text-sm mt-2 text-right">
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Forgot password?
        </Link>
      </p>
      <p className="text-sm mt-2 text-right">
        <Link to="/signup" className="text-blue-600 hover:underline">
          if u don't have account Signup?
        </Link>
      </p>
    </AuthCard>
  );
}
