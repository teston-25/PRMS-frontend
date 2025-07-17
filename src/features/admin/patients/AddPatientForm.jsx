import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPatient } from "./patientSlice";
import { useNavigate } from "react-router-dom";
import PatientFormFields from "../../admin/patients/PatientFormFields";
import toast from "react-hot-toast";

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(createPatient(formData));

      if (createPatient.fulfilled.match(resultAction)) {
        toast.success("Patient added successfully!");
        navigate(-1);
      } else {
        throw new Error(resultAction.payload);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <PatientFormFields formData={formData} setFormData={setFormData} />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatientForm;
