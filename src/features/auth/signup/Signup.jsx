import { useState } from "react";
import api from "../../../services/axios";
import toast from "react-hot-toast";
import AuthCard from "../../../components/forms/AuthCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup, setLoading, setError } from "../authSlice";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!fullName.trim() || !email.trim()) {
      toast.error("Full name and email are required");
      return;
    }

    dispatch(setLoading(true));

    try {
      const res = await api.post("/auth/signup", {
        fullName,
        email,
        password,
      });

      const { user, token, role, message } = res.data;

      dispatch(
        signup({
          user,
          token,
          role,
        })
      );

      localStorage.setItem("token", token);

      toast.success("Signup successful: " + (message || "Welcome!"));

      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/profile");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      dispatch(setError(errorMsg));
      toast.error("Signup failed: " + errorMsg);
    } finally {
      dispatch(setLoading(false));
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
