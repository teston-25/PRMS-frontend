import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointmentsByPatient } from "./appointmentSlice";
import AppointmentForm from "./AppointmentForm";

const ViewAppointment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentAppointment, loading, error } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    dispatch(fetchAppointmentsByPatient(id));
  }, [dispatch, id]);

  if (loading) return <div>Loading appointment...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentAppointment) return <div>Appointment not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Appointment Details</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <AppointmentForm appointment={currentAppointment} isViewMode={true} />
      </div>
    </div>
  );
};

export default ViewAppointment;
