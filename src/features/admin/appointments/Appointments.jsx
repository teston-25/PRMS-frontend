import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { fetchAppointments } from "./appointmentSlice";

const Appointments = () => {
  const dispatch = useDispatch();
  const appointmentsState = useSelector((state) => state.appointments);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Safely extract appointments
  const appointments = Array.isArray(appointmentsState?.data)
    ? appointmentsState.data
    : Array.isArray(appointmentsState?.appointments)
    ? appointmentsState.appointments
    : [];

  const loading = appointmentsState?.loading || false;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString()
  );
  const [statusFilter, setStatusFilter] = useState("All Status");

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const filteredAppointments = appointments.filter((appointment) => {
    const patientName = `${appointment?.patient?.firstName || ""} ${
      appointment?.patient?.lastName || ""
    }`.toLowerCase();
    const doctorName = appointment?.asignedTo?.fullName?.toLowerCase() || "";
    const appointmentDate = appointment?.date || "";
    const appointmentStatus = appointment?.status || "";

    const matchesSearch =
      patientName.includes(searchTerm.toLowerCase()) ||
      doctorName.includes(searchTerm.toLowerCase());

    const matchesDate =
      selectedDate === "All Dates" || appointmentDate === selectedDate;

    const matchesStatus =
      statusFilter === "All Status" || appointmentStatus === statusFilter;

    return matchesSearch && matchesDate && matchesStatus;
  });

  const statusCounts = {
    Total: appointments.length,
    Scheduled: appointments.filter((a) => a?.status === "Scheduled").length,
    "In Progress": appointments.filter((a) => a?.status === "In Progress")
      .length,
    Completed: appointments.filter((a) => a?.status === "Completed").length,
    Cancelled: appointments.filter((a) => a?.status === "Cancelled").length,
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">Loading appointments...</div>
    );
  }

  return (
    <div className="p-2 sm:p-4">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Appointments
        </h1>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Manage patient appointments and scheduling
        </p>
      </div>

      {/* Status Cards - Responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 mb-4 sm:mb-6">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div
            key={status}
            className="bg-white p-3 sm:p-4 rounded-lg shadow text-center"
          >
            <p className="text-xl sm:text-2xl font-bold">{count}</p>
            <p className="text-xs sm:text-sm text-gray-500">{status}</p>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-3 mb-4 sm:mb-6">
        {/* Mobile filter toggle */}
        <button
          className="sm:hidden flex items-center justify-between bg-gray-100 p-3 rounded-lg"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <span>Filters</span>
          {isMobileFiltersOpen ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>

        {/* Search bar - always visible */}
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient or doctor name..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters - Desktop */}
        <div className="hidden sm:flex gap-3">
          <div className="relative flex items-center flex-1 max-w-xs">
            <CalendarIcon className="absolute left-3 h-5 w-5 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value={new Date().toLocaleDateString()}>
                {new Date().toLocaleDateString()}
              </option>
              <option value="All Dates">All Dates</option>
            </select>
          </div>
          <select
            className="flex-1 max-w-xs px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All Status">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 min-w-[120px]">
            <PlusIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Add Appointment</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Filters - Mobile (collapsible) */}
        {isMobileFiltersOpen && (
          <div className="sm:hidden space-y-3 bg-gray-50 p-3 rounded-lg">
            <div className="relative flex items-center">
              <CalendarIcon className="absolute left-3 h-5 w-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value={new Date().toLocaleDateString()}>
                  {new Date().toLocaleDateString()}
                </option>
                <option value="All Dates">All Dates</option>
              </select>
            </div>
            <select
              className="w-full px-4 py-2 border rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All Status">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <PlusIcon className="h-5 w-5" />
              <span>Add Appointment</span>
            </button>
          </div>
        )}
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-3 sm:p-4 border-b">
          <h3 className="text-base sm:text-lg font-semibold">
            Appointments for{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h3>
        </div>

        {filteredAppointments.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        {appointment.patient.firstName}{" "}
                        {appointment.patient.lastName}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        Dr. {appointment.asignedTo.fullName}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        {appointment.date}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            appointment.status === "Scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : appointment.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : appointment.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {appointment.patient.firstName}{" "}
                        {appointment.patient.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Dr. {appointment.asignedTo.fullName}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        appointment.status === "Scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : appointment.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : appointment.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {appointment.date}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="p-6 sm:p-8 text-center">
            <p className="text-gray-500">
              No appointments found for the selected criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
