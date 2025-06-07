import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";
import toast from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout successful!");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data.data.user);
      } catch (err) {
        console.error("Failed to load profile", err);
        handleLogout();
      }
    };

    fetchProfile();
  }, []);

  return user ? (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Profile</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
        >
          Logout
        </button>
      </div>

      <p>
        <strong>Full Name:</strong> {user.fullName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>User ID:</strong> {user._id}
      </p>
    </div>
  ) : (
    <p className="text-center mt-10">Loading profile...</p>
  );
}
