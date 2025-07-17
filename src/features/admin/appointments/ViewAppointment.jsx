import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "./appointmentSlice";
import { selectCurrentAppointment } from "../../../components/common/selectors";
import AppointmentForm from "./AppointmentForm";
import Spinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import BackButton from "../../../components/common/BackButton";

const ViewAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role || 'admin';

  if (userRole === 'doctor') {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <div className="text-red-500 text-lg font-semibold mb-4">Not authorized to view appointment details.</div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  const currentAppointment = useSelector((state) =>
    selectCurrentAppointment(state, id)
  );
  const { loading, error } = useSelector((state) => state.appointments);

  useEffect(() => {
    // If we don't have appointments loaded, fetch them
    if (!currentAppointment) {
      dispatch(fetchAppointments());
    }
  }, [dispatch, currentAppointment]);

  if (loading === "pending") {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <Spinner text="Loading appointment details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <ErrorMessage message={error} />
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!currentAppointment) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-red-500 mb-4">Appointment not found</div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointment Details</h1>
        <BackButton />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <AppointmentForm appointment={currentAppointment} isViewMode={true} />
      </div>
    </div>
  );
};

export default ViewAppointment;
