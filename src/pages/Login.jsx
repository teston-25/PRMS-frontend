import { useState } from "react";
import api from "../services/axios";
import { useNavigate } from "react-router-dom"; // ✅ STEP 1
import AuthCard from "../components/AuthCard";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ✅ STEP 2

  const handleLogin = async (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    try {
      const res = await api.post("/auth/signin", {
        email: normalizedEmail,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setTimeout(
        () => toast.success("Login successful: " + res.data.message),
        200
      );

      navigate("/profile");
    } catch (err) {
      toast.error(
        "Login failed: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <AuthCard title="Welcome Back" buttonText="Log In" onSubmit={handleLogin}>
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
    </AuthCard>
  );
}
