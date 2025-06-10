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

        <main className="flex-1 p-6 bg-[#f5f7fa]">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Dashboard Overview
          </h2>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              {
                label: "Active Users",
                value: "1472",
                color: "from-blue-400 to-blue-600",
              },
              {
                label: "Total Patients",
                value: "1432",
                color: "from-green-400 to-green-600",
              },
              {
                label: "Total Appointments",
                value: "5472",
                color: "from-indigo-400 to-indigo-600",
              },
              {
                label: "Total Users",
                value: "6432",
                color: "from-purple-400 to-purple-600",
              },
            ].map((card, index) => (
              <div
                key={index}
                className={`rounded-2xl p-5 text-white shadow-lg bg-gradient-to-br ${card.color}`}
              >
                <p className="text-lg font-medium">{card.label}</p>
                <p className="text-2xl font-bold">{card.value}</p>
                <span className="text-sm text-white/80">+2.3% ↑</span>
              </div>
            ))}
          </div>

          {/* Patient Application List */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Patient Applications
            </h3>
            <div className="space-y-4">
              {[
                { name: "John Adams", gender: "Male", age: 33 },
                { name: "Mary Adams", gender: "Female", age: 17 },
                { name: "Ronda Rousy", gender: "Female", age: 24 },
              ].map((patient, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-1 border-4 border-gray-100 rounded-xl p-3"
                >
                  <div>
                    <p className="font-semibold text-gray-500">
                      {patient.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {patient.gender}, {patient.age} yrs
                    </p>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-600">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
