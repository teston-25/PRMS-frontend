import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, deletePatient, searchPatient } from "./patientSlice";
import { Link } from "react-router-dom";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import * as XLSX from "xlsx";
import { PlusIcon } from "lucide-react";
import toast from "react-hot-toast";
import Spinner from "../../../components/common/Spinner";
const Patients = () => {
  const dispatch = useDispatch();
  const {
    list: allPatients,
    searchResults,
    loading,
  } = useSelector((state) => state.patients);
  const [searchTerm, setSearchTerm] = useState("");

  const exportToExcel = () => {
    const dataToExport = displayedPatients.map((patient) => ({
      "First Name": patient.firstName,
      "Last Name": patient.lastName,
      Gender: patient.gender,
      Email: patient.email,
      Phone: patient.phone,
      Age: patient.age,
      "Date of Birth": new Date(patient.dob).toLocaleDateString(),
      Address: patient.address,
      "Policy Number": patient.insuranceInfo?.policyNumber || "N/A",
      "Emergency Phone": patient.emergencyContact?.phone || "N/A",
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Patients");

    const fileName = `Patients_Export_${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      dispatch(searchPatient(value));
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      dispatch(deletePatient(id));
      toast.success("Patient has been removed");
    }
  };

  // Determine which patients to display
  const displayedPatients = searchTerm.trim() ? searchResults : allPatients;

  return (
    <div className="p-4 sm:p-6 max-w-screen-xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div>
          <h1 className="text-2xl font-bold">Patients</h1>
          <p className="text-gray-500 text-sm">
            Manage patient information and records
          </p>
        </div>
        {displayedPatients !== 0 ? (
          <button
            onClick={exportToExcel}
            disabled={displayedPatients.length === 0}
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded shadow text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Export Excel
          </button>
        ) : (
          ""
        )}
        <Link
          to="/admin/patients/add"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 min-w-[120px]"
        >
          <PlusIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Add Patient</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search patients..."
            className="w-full sm:w-96 p-2 border rounded"
          />
        </div>

        <div className="overflow-x-auto">
          <div className="max-h-[50vh] overflow-y-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase border-b sticky top-0 bg-white z-10">
                <tr>
                  <th className="py-2">Patient</th>
                  <th>Contact</th>
                  <th>Age</th>
                  {/* <th>Last Visit</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6">
                      <Spinner />
                    </td>
                  </tr>
                ) : displayedPatients.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6">
                      {searchTerm.trim()
                        ? "No matching patients found"
                        : "No patients found"}
                    </td>
                  </tr>
                ) : (
                  displayedPatients.map((p) => (
                    <tr key={p._id} className="border-b hover:bg-gray-50">
                      <td className="py-3">
                        <div className="flex items-center space-x-2">
                          <div className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                            {(p.firstName || "NA")
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                            {(p.lastName || "NA")
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">
                              {p.firstName} {p.lastName}
                            </div>
                            <div className="text-gray-500 text-sm">
                              {p.gender}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-gray-800">{p.email}</div>
                        <div className="text-gray-500 text-sm">{p.phone}</div>
                      </td>
                      <td>
                        {p.age} yrs
                        <div className="text-gray-500 text-xs">
                          Born {new Date(p.dob).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="flex gap-2 py-2">
                        <Link
                          to={`/admin/patients/${p._id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </Link>
                        <Link
                          to={`/admin/patients/edit/${p._id}`}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          {displayedPatients.length}{" "}
          {displayedPatients.length === 1 ? "patient" : "patients"}{" "}
          {searchTerm.trim() ? "matching search" : "total"}
        </p>
      </div>
    </div>
  );
};

export default Patients;
