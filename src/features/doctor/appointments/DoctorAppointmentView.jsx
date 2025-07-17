import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorAppointmentById, updateDoctorAppointment } from "./docAppointmentSlice";
import AppointmentForm from "../../admin/appointments/AppointmentForm";
// Placeholder import for the modal; will be made reusable next
import MedicalHistoryModal from "../../admin/patients/MedicalHistoryModal";

const DoctorAppointmentView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const { currentAppointment, loading, error } = useSelector((state) => state.doctorAppointments);

  useEffect(() => {
    dispatch(fetchDoctorAppointmentById(id));
  }, [dispatch, id]);

  const handleStatusUpdate = async (data) => {
    // Only update status
    await dispatch(updateDoctorAppointment({ id, updateData: { status: data.status } }));
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!currentAppointment) return <div className="p-4">Appointment not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointment Details</h1>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow mb-4">
        <AppointmentForm
          appointment={currentAppointment}
          onSubmit={handleStatusUpdate}
          isStatusOnly={true}
          role="doctor"
        />
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setShowHistoryModal(true)}
      >
        View Medical History
      </button>
      {showHistoryModal && (
        <MedicalHistoryModal
          patientId={currentAppointment.patient?._id || currentAppointment.patient}
          onClose={() => setShowHistoryModal(false)}
        />
      )}
    </div>
  );
};

export default DoctorAppointmentView; 