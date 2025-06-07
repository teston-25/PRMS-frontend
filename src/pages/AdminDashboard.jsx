import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchProfile, setSidebarOpen } from "../components/layout/adminSlice";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, sidebarOpen, loading, error } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchProfile())
      .unwrap()
      .catch(() => {
        toast.error("Failed to load profile. Please login again.");
        navigate("/login");
      });
  }, [dispatch, navigate]);

  if (loading || !user)
    return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div
          onClick={() => dispatch(setSidebarOpen(false))}
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
        />
      )}

      <div className="flex flex-col flex-1">
        <Navbar user={user} />

        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.fullName}</h2>
          <p className="text-gray-700">
            Select a section from the sidebar to manage the system.
          </p>
        </main>
      </div>
    </div>
  );
}
