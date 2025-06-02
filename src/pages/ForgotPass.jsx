import { useState } from "react";
import api from "../services/axios";
import toast from "react-hot-toast";

export default function ForgotPass() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    setLoading(true);

    try {
      const res = await api.post("/auth/forgot-password", {
        email: normalizedEmail,
      });

      toast.success(res.data.message || "Reset link sent to your email.");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleForgotPassword}
        className="bg-white shadow-md rounded-md p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <p className="text-sm mb-6 text-center text-gray-600">
          Enter your email address and we’ll send you a reset link.
        </p>
        <input
          type="email"
          placeholder="Your Email"
          className="w-full mb-4 px-4 py-2 border rounded-md text-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
