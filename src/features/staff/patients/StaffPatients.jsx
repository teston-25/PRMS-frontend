import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../admin/patients/patientSlice";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Spinner from "../../../components/common/Spinner";
import toast from "react-hot-toast";

export default function StaffPatients() {
  const dispatch = useDispatch();
  const { patients, loading, error } = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          Patient Management
        </h2>
        <Link
          to="/staff/patients/add"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Patient</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div
            key={patient._id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {patient.firstName} {patient.lastName}
                </h3>
                <p className="text-sm text-gray-500">
                  {patient.gender} • {patient.age} years
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">
                  {patient.firstName?.charAt(0)}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Phone:</span> {patient.phone}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {patient.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Address:</span> {patient.address}
              </p>
            </div>

            <div className="flex space-x-2">
              <Link
                to={`/staff/patients/${patient._id}`}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-lg transition-colors"
              >
                View Profile
              </Link>
              <Link
                to={`/staff/patients/edit/${patient._id}`}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-center py-2 rounded-lg transition-colors"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>

      {patients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No patients found.</p>
        </div>
      )}
    </div>
  );
} 