import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ResetPass() {
  const { token } = useParams(); // /reset-password/:token
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    if (password !== confirm) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      await axios.patch(
        `/api/auth/reset-password/${token}`,
        { password, confirmPassword: confirm },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("✅ Password successfully reset!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(
        "❌ Reset failed: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
