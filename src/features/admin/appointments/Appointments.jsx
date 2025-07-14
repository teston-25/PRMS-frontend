import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { fetchAppointments, fetchTodaysAppointments, fetchAppointmentsByDate } from "./appointmentSlice";
import { Link } from "react-router-dom";

const Appointments = () => {
  const dispatch = useDispatch();
  const appointmentsState = useSelector((state) => state.appointments);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const appointments = appointmentsState?.appointments || [];
  const todaysAppointments = appointmentsState?.todaysAppointments || [];
  const loading = appointmentsState?.loading || false;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showAllAppointments, setShowAllAppointments] = useState(false);

  useEffect(() => {
    if (appointments.length === 0 && todaysAppointments.length === 0) {
      dispatch(fetchTodaysAppointments());
    }
  }, [dispatch, appointments.length, todaysAppointments.length]);

  // Handle date change and fetch appointments for that date
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowAllAppointments(false);
    if (date && date !== "All Dates") {
      dispatch(fetchAppointmentsByDate(date));
    } else {
      dispatch(fetchAppointments());
    }
  };

  // Handle "All Appointments" button click
  const handleShowAllAppointments = () => {
    setShowAllAppointments(true);
    setSelectedDate("All Dates");
    dispatch(fetchAppointments());
  };

  // Handle "Today's Appointments" button click
  const handleShowTodaysAppointments = () => {
    setShowAllAppointments(false);
    setSelectedDate(new Date().toISOString().split("T")[0]);
    dispatch(fetchTodaysAppointments());
  };

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const patientName = `${appointment?.patient?.firstName || ""} ${
        appointment?.patient?.lastName || ""
      }`.toLowerCase();

      const doctorName = (
        appointment?.assignedTo?.fullName || ""
      ).toLowerCase();

      const appointmentDate = appointment?.date
        ? new Date(appointment.date).toISOString().split("T")[0]
        : "";

      const currentSelectedDate =
        selectedDate === "All Dates"
          ? null
          : selectedDate;

      const statusMap = {
        pending: "Scheduled",
        confirmed: "In Progress",
        completed: "Completed",
        cancelled: "Cancelled",
      };

      const normalizedAppointmentStatus =
        statusMap[appointment?.status?.toLowerCase()] || appointment?.status;

      const matchesSearch =
        searchTerm === "" ||
        patientName.includes(searchTerm.toLowerCase()) ||
        doctorName.includes(searchTerm.toLowerCase());

      const matchesDate =
        !currentSelectedDate || appointmentDate === currentSelectedDate;

      const matchesStatus =
        statusFilter === "All Status" ||
        appointment?.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesDate && matchesStatus;
    });
  }, [appointments, searchTerm, selectedDate, statusFilter]);

  const statusCounts = useMemo(
    () => ({
      Total: filteredAppointments.length,
      Scheduled: filteredAppointments.filter((a) =>
        a?.status?.toLowerCase() === "pending"
      ).length,
      "In Progress": filteredAppointments.filter((a) =>
        a?.status?.toLowerCase() === "confirmed"
      ).length,
      Completed: filteredAppointments.filter((a) =>
        a?.status?.toLowerCase() === "completed"
      ).length,
      Cancelled: filteredAppointments.filter((a) =>
        a?.status?.toLowerCase() === "cancelled"
      ).length,
    }),
    [filteredAppointments]
  );

  const handleDelete = (appointmentId) => {
    // Add your delete logic here
    console.log("Delete appointment:", appointmentId);
    // dispatch(deleteAppointment(appointmentId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span>Loading appointments...</span>
        </div>
      </div>
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

      {/* Status Cards */}
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

      {/* Search and Filters - Desktop */}
      <div className="hidden sm:flex gap-3 mb-4 sm:mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient or doctor name..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Date Picker */}
        <div className="relative w-48">
          <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="date"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <select
          className="w-48 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All Status">All Status</option>
          <option value="pending">Scheduled</option>
          <option value="confirmed">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleShowAllAppointments}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              showAllAppointments
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            All Appointments
          </button>
          <button
            onClick={handleShowTodaysAppointments}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              !showAllAppointments && selectedDate === new Date().toISOString().split("T")[0]
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Today
          </button>
          <Link
            to="/admin/appointments/add"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap"
          >
            <PlusIcon className="h-5 w-5" />
            Add Appointment
          </Link>
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden flex flex-col gap-3 mb-4 sm:mb-6">
        {/* Search bar */}
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

        {/* Mobile filter toggle */}
        <button
          className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <span>Filters</span>
          {isMobileFiltersOpen ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>

        {/* Filters - Mobile (collapsible) */}
        {isMobileFiltersOpen && (
          <div className="space-y-3 bg-gray-50 p-3 rounded-lg">
            <div className="relative flex items-center">
              <CalendarIcon className="absolute left-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </div>
            <select
              className="w-full px-4 py-2 border rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All Status">All Status</option>
              <option value="pending">Scheduled</option>
              <option value="confirmed">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={handleShowAllAppointments}
                className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                  showAllAppointments
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                All Appointments
              </button>
              <button
                onClick={handleShowTodaysAppointments}
                className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                  !showAllAppointments && selectedDate === new Date().toISOString().split("T")[0]
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Today
              </button>
            </div>
            <Link
              to="/admin/appointments/add"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Appointment</span>
            </Link>
          </div>
        )}
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-3 sm:p-4 border-b">
          <h3 className="text-base sm:text-lg font-semibold">
            {showAllAppointments 
              ? "All Appointments"
              : selectedDate === new Date().toISOString().split("T")[0]
              ? "Today's Appointments"
              : `Appointments for ${new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}`
            }
          </h3>
        </div>

        {filteredAppointments.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block">
              <div className="max-h-[35vh] overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Doctor
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment?._id}>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          {appointment?.patient?.firstName || "N/A"}{" "}
                          {appointment?.patient?.lastName || ""}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          {appointment?.assignedTo?.fullName
                            ? `Dr. ${appointment.assignedTo.fullName}`
                            : "N/A"}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          {appointment?.date
                            ? new Date(appointment.date).toLocaleString()
                            : "N/A"}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              appointment?.status === "pending"
                                ? "bg-blue-100 text-blue-800"
                                : appointment?.status === "confirmed"
                                ? "bg-yellow-100 text-yellow-800"
                                : appointment?.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {appointment?.status || "unknown"}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap flex gap-2">
                          <Link
                            to={`/admin/appointments/view/${appointment._id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="View"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </Link>
                          <Link
                            to={`/admin/appointments/edit/${appointment._id}`}
                            className="text-gray-600 hover:text-gray-800"
                            title="Edit"
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(appointment._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden divide-y divide-gray-200 max-h-[54vh] overflow-y-auto">
              {filteredAppointments.map((appointment) => (
                <div key={appointment._id} className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {appointment?.patient?.firstName || "N/A"}{" "}
                        {appointment?.patient?.lastName || ""}
                      </p>
                      <p className="text-sm text-gray-600">
                        Dr. {appointment?.assignedTo?.fullName || "N/A"}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        appointment?.status === "pending"
                          ? "bg-blue-100 text-blue-800"
                          : appointment?.status === "confirmed"
                          ? "bg-yellow-100 text-yellow-800"
                          : appointment?.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {appointment?.status || "unknown"}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {appointment?.date
                      ? new Date(appointment.date).toLocaleString()
                      : "N/A"}
                  </div>
                  <div className="mt-2 flex justify-end gap-3">
                    <Link
                      to={`/admin/appointments/view/${appointment._id}`}
                      className="text-blue-600 hover:text-blue-900"
                      title="View"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </Link>
                    <Link
                      to={`/admin/appointments/edit/${appointment._id}`}
                      className="text-yellow-600 hover:text-yellow-900"
                      title="Edit"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(appointment._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
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
