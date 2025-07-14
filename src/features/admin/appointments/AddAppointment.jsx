import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppointmentForm from "./AppointmentForm";
import { addAppointment } from "./appointmentSlice";
import toast from "react-hot-toast";

const AddAppointment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      const appointmentData = {
        patient: {
          ...(data.patient.email && { email: data.patient.email }),
          ...(data.patient.phone && { phone: data.patient.phone }),
        },
        assignedTo: data.doctor,
        date: new Date(`${data.date}T${data.time}:00`).toISOString(),
        reason: data.reason,
        status: data.status,
      };

      console.log("Submitting appointment:", appointmentData);

      const result = await dispatch(addAppointment(appointmentData)).unwrap();

      if (result?.appointment?._id) {
        toast.success("Appointment booked successfully!");
        navigate("/admin/appointments");
      } else {
        throw new Error("No ID returned from server");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Create New Appointment
        </h2>
      </div>

      <AppointmentForm
        onSubmit={handleSubmit}
        loading={loading}
        fetchDoctorsOnMount={true}
      />
    </div>
  );
};

export default AddAppointment;
