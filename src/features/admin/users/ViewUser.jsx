import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserFormFields from "./UserFormFields";
import api from "../../../services/axios";
import Spinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { useDispatch } from "react-redux";
import { fetchUserById } from "./userSlice";

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await dispatch(fetchUserById(id));
        if (response && response.payload) {
          const userObj = response.payload.user || response.payload;
          setUser(userObj);
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, dispatch]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
      </div>

      <UserFormFields formData={user} setFormData={() => {}} readOnly={true} />
    </div>
  );
};

export default ViewUser;
