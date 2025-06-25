import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAppointment } from "./appointmentSlice";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../users/userSlice";
import toast from "react-hot-toast";

export default function AddAppointment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useSelector((state) => state.users);

  // Filter doctors only once when users change
  const doctors = users.filter((user) => user.role === "doctor");

  const [formData, setFormData] = useState({
    patient: {
      email: "",
      phone: "",
    },
    date: "",
    time: "",
    doctor: "",
    reason: "Routine Checkups & Cleanings",
    status: "Scheduled",
  });

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email" || name === "phone") {
      setFormData((prev) => ({
        ...prev,
        patient: {
          ...prev.patient,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const appointmentData = {
      patient: {
        email: formData.patient.email,
        phone: formData.patient.phone,
      },
      date: new Date(`${formData.date}`).toISOString(),
      doctor: formData.doctor,
      reason: formData.reason,
      status: formData.status,
    };

    dispatch(addAppointment(appointmentData)).then(() => {
      navigate("/admin/appointments");
      toast.success("Appointment has added succesfully!");
    });
  };

  const reasonOptions = [
    "Routine Checkups & Cleanings",
    "Tooth Fillings & Restorations",
    "Root Canal Treatment",
    "Teeth Whitening & Cosmetic Dentistry",
    "Dental Implants & Bridges",
    "Pediatric Dentistry",
    "Orthodontics (Braces)",
    "Tooth Extraction & Surgery",
  ];

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Schedule New Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Contact */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Patient Contact
          </label>
          <input
            type="email"
            name="email"
            placeholder="Patient Email"
            value={formData.patient.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <p className="text-xs text-gray-500">OR</p>
          <input
            type="tel"
            name="phone"
            placeholder="Patient Phone"
            value={formData.patient.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        {/* Doctor Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Doctor
          </label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled={usersLoading}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.fullName}{" "}
                {doctor.specialization && `(${doctor.specialization})`}
              </option>
            ))}
          </select>
          {usersError && (
            <p className="text-red-500 text-sm mt-1">{usersError}</p>
          )}
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reason
          </label>
          <select
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            {reasonOptions.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/appointments")}
            className="text-gray-600 hover:underline"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={usersLoading}
          >
            {usersLoading ? "Loading..." : "Save Appointment"}
          </button>
        </div>
      </form>
    </div>
  );
}
