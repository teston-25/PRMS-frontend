import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const AppointmentForm = ({
  appointment,
  onSubmit,
  isViewMode = false,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: appointment || {
      patient: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      date: "",
      time: "",
      doctor: "",
      reason: "Routine Checkup",
      status: "pending",
    },
  });

  useEffect(() => {
    if (appointment) {
      reset({
        ...appointment,
        date: appointment.date.split("T")[0],
        time: appointment.date.split("T")[1].substring(0, 5),
      });
    }
  }, [appointment, reset]);

  const reasonOptions = [
    "Routine Checkup",
    "Dental Cleaning",
    "Tooth Extraction",
    "Root Canal",
    "Dental Implant",
    "Orthodontic Consultation",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Patient Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <div className="relative">
            <UserIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              {...register("patient.firstName", { required: true })}
              className={`pl-10 w-full p-2 border rounded-lg ${
                errors?.patient?.firstName ? "border-red-500" : ""
              } ${isViewMode ? "bg-gray-100" : ""}`}
              readOnly={isViewMode}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <div className="relative">
            <UserIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              {...register("patient.lastName", { required: true })}
              className={`pl-10 w-full p-2 border rounded-lg ${
                errors?.patient?.lastName ? "border-red-500" : ""
              } ${isViewMode ? "bg-gray-100" : ""}`}
              readOnly={isViewMode}
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("patient.email", { required: true })}
            className={`w-full p-2 border rounded-lg ${
              errors?.patient?.email ? "border-red-500" : ""
            } ${isViewMode ? "bg-gray-100" : ""}`}
            readOnly={isViewMode}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <div className="relative">
            <PhoneIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              {...register("patient.phone", { required: true })}
              className={`pl-10 w-full p-2 border rounded-lg ${
                errors?.patient?.phone ? "border-red-500" : ""
              } ${isViewMode ? "bg-gray-100" : ""}`}
              readOnly={isViewMode}
            />
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <div className="relative">
            <CalendarIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              {...register("date", { required: true })}
              className={`pl-10 w-full p-2 border rounded-lg ${
                errors?.date ? "border-red-500" : ""
              } ${isViewMode ? "bg-gray-100" : ""}`}
              readOnly={isViewMode}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <div className="relative">
            <ClockIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="time"
              {...register("time", { required: true })}
              className={`pl-10 w-full p-2 border rounded-lg ${
                errors?.time ? "border-red-500" : ""
              } ${isViewMode ? "bg-gray-100" : ""}`}
              readOnly={isViewMode}
            />
          </div>
        </div>
      </div>

      {/* Doctor and Reason */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Doctor
          </label>
          <select
            {...register("doctor", { required: true })}
            className={`w-full p-2 border rounded-lg ${
              errors?.doctor ? "border-red-500" : ""
            } ${isViewMode ? "bg-gray-100" : ""}`}
            disabled={isViewMode}
          >
            <option value="">Select Doctor</option>
            {/* Populate with doctors from your API */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason
          </label>
          <select
            {...register("reason", { required: true })}
            className={`w-full p-2 border rounded-lg ${
              errors?.reason ? "border-red-500" : ""
            } ${isViewMode ? "bg-gray-100" : ""}`}
            disabled={isViewMode}
          >
            {reasonOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status (only for edit mode) */}
      {!isViewMode && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            {...register("status", { required: true })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      )}

      {/* Form Actions */}
      {!isViewMode && (
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Appointment"}
          </button>
        </div>
      )}
    </form>
  );
};

export default AppointmentForm;
