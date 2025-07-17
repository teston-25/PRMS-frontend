import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "./settingSlice";
import Spinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import { FaUser, FaLock, FaSave, FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

function getUserFromLocalStorage() {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

function Settings() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.settings || {});
  // Memoize localUser so it doesn't change on every render
  const localUser = useMemo(getUserFromLocalStorage, []);
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    firstName: localUser?.fullName?.split(" ")[0] || "",
    lastName: localUser?.fullName?.split(" ").slice(1).join(" ") || "",
    fullName: localUser?.fullName || "",
    email: "",
    role: localUser?.role || "",
    status: "",
    createdAt: "",
    updatedAt: ""
  });
  const [profileLoading, setProfileLoading] = useState(false);
  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    password: "",
    confirm: ""
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Load profile from Redux or fallback to localStorage
  useEffect(() => {
    // Only run once on mount
    if (!profile && localUser?.id) {
      dispatch(fetchProfile(localUser.id));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        firstName: profile.firstName || profile.fullName?.split(" ")[0] || "",
        lastName: profile.lastName || profile.fullName?.split(" ").slice(1).join(" ") || "",
        fullName: profile.fullName || "",
        email: profile.email || "",
        role: profile.role || localUser?.role || "",
        status: profile.status || "",
        createdAt: profile.createdAt || "",
        updatedAt: profile.updatedAt || ""
      });
    }
  }, [profile, localUser]);

  // Profile form handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const submitData = {
        ...profileForm,
        fullName: profileForm.firstName && profileForm.lastName
          ? `${profileForm.firstName} ${profileForm.lastName}`.trim()
          : profileForm.fullName
      };
      await dispatch(updateProfile(submitData));
      toast.success("Profile updated successfully");  
      
    } finally {
      setProfileLoading(false);
    }
  };

  // Password form handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    if (passwordForm.password !== passwordForm.confirm) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (passwordForm.password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    setPasswordLoading(true);
    try {
      await dispatch(updateProfile({
        ...profileForm,
        password: passwordForm.password,
        oldPassword: passwordForm.oldPassword
      }));
      toast.success("Password updated successfully");
      setPasswordForm({ oldPassword: "", password: "", confirm: "" });
    } finally {
      setPasswordLoading(false);
    }
  };

  // Responsive card layout
  return (
    <div className="p-4 sm:p-6 max-w-screen-md mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Profile & Settings</h1>
      <p className="text-gray-500 mb-8">Manage your account profile and password</p>
      {loading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      <div className="space-y-6">
        {/* Profile Overview Card */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex items-center justify-center bg-indigo-500 rounded-full w-16 h-16">
            <FaUserCircle className="text-white text-4xl" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-800 truncate">{profileForm.fullName || `${profileForm.firstName} ${profileForm.lastName}`.trim() || 'Your Profile'}</h2>
            <p className="text-gray-500 mt-1">{profileForm.role ? profileForm.role.charAt(0).toUpperCase() + profileForm.role.slice(1) : 'User'}</p>
            <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-400">
              {profileForm.createdAt && <span>Created: {new Date(profileForm.createdAt).toLocaleDateString()}</span>}
              {profileForm.updatedAt && <span>Updated: {new Date(profileForm.updatedAt).toLocaleDateString()}</span>}
            </div>
          </div>
        </div>

        {/* Profile Edit Card */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <FaUser className="text-indigo-500 text-lg" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Profile Information</h2>
            {profileLoading && <Spinner />}
          </div>
          <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={profileForm.firstName}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded-lg"
                required
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profileForm.lastName}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded-lg"
                required
                placeholder="Enter your last name"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                className="w-full p-2 border rounded-lg"
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="sm:col-span-2 flex flex-wrap gap-4 mt-2">
              <div className="flex-1 min-w-[120px]">
                <label className="block text-xs font-medium text-gray-500 mb-1">Role</label>
                <input
                  type="text"
                  value={profileForm.role ? profileForm.role.charAt(0).toUpperCase() + profileForm.role.slice(1) : 'N/A'}
                  className="w-full p-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  readOnly
                />
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                <input
                  type="text"
                  value={profileForm.status ? profileForm.status.charAt(0).toUpperCase() + profileForm.status.slice(1) : 'Active'}
                  className="w-full p-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>
            <div className="sm:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                disabled={profileLoading}
              >
                <FaSave className="inline-block" />
                Save Profile
              </button>
            </div>
          </form>
        </div>

        {/* Password Change Card */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <FaLock className="text-indigo-500 text-lg" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Password Settings</h2>
            {passwordLoading && <Spinner />}
          </div>
          <form onSubmit={handlePasswordSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <div className="relative">
                <input
                  type={showPasswords ? 'text' : 'password'}
                  name="oldPassword"
                  value={passwordForm.oldPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border rounded-lg pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPasswords ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type={showPasswords ? 'text' : 'password'}
                name="password"
                value={passwordForm.password}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type={showPasswords ? 'text' : 'password'}
                name="confirm"
                value={passwordForm.confirm}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            {passwordError && <div className="sm:col-span-2 text-red-500 text-sm">{passwordError}</div>}
            <div className="sm:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                disabled={passwordLoading}
              >
                <FaLock className="inline-block" />
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;

