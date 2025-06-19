import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPatientById } from "./patientSlice";
import { useParams } from "react-router-dom";
import PatientFormFields from "../../admin/patients/PatientFormFields";

const ViewPatientProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Patient Profile</h2>
      <form className="space-y-4">
        <PatientFormFields
          formData={formData}
          setFormData={setFormData}
          readOnly={true}
        />
      </form>
    </div>
  );
};

export default ViewPatientProfile;
