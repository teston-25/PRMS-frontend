import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPatientById, updatePatient } from "./patientSlice";
import { useParams, useNavigate } from "react-router-dom";
import PatientFormFields from "../../admin/patients/PatientFormFields";
import toast from "react-hot-toast";

const EditPatientForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    dispatch(fetchPatientById(id)).then((res) => {
      if (res.payload) {
        setFormData(res.payload.patient);
      }
    });
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePatient({ id, updatedData: formData })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Update successful");
        navigate(-1);
      } else {
        toast.error("Update failed");
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <PatientFormFields formData={formData} setFormData={setFormData} />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Update Patient
        </button>
      </form>
    </div>
  );
};

export default EditPatientForm;
