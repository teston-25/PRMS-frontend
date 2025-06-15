import {
  UsersIcon,
  UserGroupIcon,
  CalendarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import adminAPI from "./adminAPI";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeUsers: 0,
    totalUsers: 0,
    totalPatients: 0,
    totalAppointments: 0,
    patients: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [userRes, patientRes, appointmentRes] = await Promise.all([
          adminAPI.Users(),
          adminAPI.Patients(),
          adminAPI.Appointments(),
        ]);

        const users = userRes?.data?.users || [];
        const activeUsers = users.filter((u) => u.active === true).length;

        setStats({
          activeUsers,
          totalUsers: userRes?.results || users.length,
          totalPatients: patientRes?.results || 0,
          totalAppointments: appointmentRes?.results || 0,
          patients: patientRes.data.patients,
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
        toast.error("Failed to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  console.log(stats.patients);

  const statCards = [
    {
      label: "Active Users",
      value: stats.activeUsers,
      color: "bg-blue-500",
      change: "+12%",
      icon: UsersIcon,
    },
    {
      label: "Total Patients",
      value: stats.totalPatients,
      color: "bg-green-500",
      change: "+8%",
      icon: UserGroupIcon,
    },
    {
      label: "Total Appointments",
      value: stats.totalAppointments,
      color: "bg-purple-500",
      change: "+23%",
      icon: CalendarIcon,
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      color: "bg-orange-500",
      change: "+15%",
      icon: UserCircleIcon,
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Dashboard Overview
      </h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600">
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Patient Applications
        </h3>
        <div className="space-y-4">
          {stats.patients.slice(0, 4).map((patient, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border border-gray-100 rounded-xl p-3"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {patient.firstName} {patient.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {patient.gender}, {patient.age} yrs
                </p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm transition-colors">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
