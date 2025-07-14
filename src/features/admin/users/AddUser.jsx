import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser } from "./userSlice";
import UserFormFields from "./UserFormFields";
import Spinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import AuthCard from "../../../components/forms/AuthCard";

const AddUser = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.users);

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    role: "user",
    active: true,
    password: "defaultPassword", // You might want to generate this or make it required
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(addNewUser(userData));

      if (addNewUser.fulfilled.match(resultAction)) {
        toast.success("User created successfully!");
        setUserData({
          fullName: "",
          email: "",
          role: "user",
          active: true,
          password: "password",
        });
      }
    } catch (err) {
      toast.error("Failed to create user: " + (err.message || "Unknown error"));
    }
  };

  const handleReset = () => {
    setUserData({
      fullName: "",
      email: "",
      role: "user",
      active: true,
      password: "defaultPassword",
    });
  };

  if (loading === "pending") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center relative p-4">
      <Link
        to="/admin/users"
        className="absolute top-6 right-6 text-white text-2xl hover:text-gray-200 transition"
        title="Back to Users"
      >
        <FaHome size={24} />
      </Link>

      <AuthCard
        title="Add New User"
        buttonText={loading === "pending" ? "Creating..." : "Create User"}
        onSubmit={handleSubmit}
        disabled={loading === "pending"}
        footer={
          <div className="flex justify-between w-full mt-4">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm text-white hover:underline"
            >
              Reset Form
            </button>
            <Link
              to="/admin/users"
              className="text-sm text-white font-semibold hover:underline"
            >
              Back to Users
            </Link>
          </div>
        }
      >
        <div className="space-y-4">
          <UserFormFields
            formData={userData}
            setFormData={setUserData}
            readOnly={false}
          />
        </div>
      </AuthCard>

      {error && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <ErrorMessage message={error} />
        </div>
      )}
    </div>
  );
};

export default AddUser;
