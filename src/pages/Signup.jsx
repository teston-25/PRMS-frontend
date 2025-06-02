import { useState } from "react";
import api from "../services/axios";
import toast from "react-hot-toast";
import AuthCard from "../components/AuthCard";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      const res = await api.post("/auth/signup", {
        fullName,
        email,
        password,
        token,
      });
      toast.success("Signup successful: " + (res.data.message || "Welcome!"));
      localStorage.setItem("token", res.data.token);
      setTimeout(
        () => toast.success("Login successful: " + res.data.message),
        1000
      );
      setToken(res.data.token);

      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/profile");
    } catch (err) {
      toast.error(
        "Signup failed: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <AuthCard
      title="Create an Account"
      buttonText="Sign Up"
      onSubmit={handleSignup}
    >
      <input
        type="text"
        placeholder="Full Name"
        className="w-full mb-4 px-4 py-2 border rounded-md"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />

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
        className="w-full mb-4 px-4 py-2 border rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full mb-4 px-4 py-2 border rounded-md"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
    </AuthCard>
  );
}
