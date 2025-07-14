import {
  UsersIcon,
  UserGroupIcon,
  CalendarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "./dashboardSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Spinner from "../../../components/common/Spinner";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => {
    return state.dashboard;
  });

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const cards = [
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
        <Spinner />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {cards.map((stat, idx) => (
              <div
                key={idx}
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

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Patient Applications
            </h3>
            <div className="space-y-4">
              {stats.recentPatients.map((patient, idx) => (
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
                  <Link
                    to={`/admin/patients/${patient._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
