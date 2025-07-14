import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserFormFields from "./UserFormFields";
import Spinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import api from "../../../services/axios";
import fetchUserById from "./userSlice";
import { useDispatch } from "react-redux";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    role: "",
    active: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await dispatch(fetchUserById(id));
        console.log(response);
        setUser(response.payload);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await api.put(`/users/${id}`, user);
      setTimeout(() => navigate("/admin/users"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit User</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <UserFormFields
          formData={user}
          setFormData={setUser}
          readOnly={false}
        />

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/admin/users`)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
