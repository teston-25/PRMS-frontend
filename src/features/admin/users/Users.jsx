import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { fetchUsers, deleteUser } from "./userSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [prevUsersLength, setPrevUsersLength] = useState(0);
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");

  useEffect(() => {
    if (users.length === 0 && prevUsersLength === 0) {
      dispatch(fetchUsers());
      return;
    }

    if (users.length < prevUsersLength) {
      dispatch(fetchUsers());
    }

    setPrevUsersLength(users.length);
  }, [dispatch, users.length, prevUsersLength]);

  const safeUsers = Array.isArray(users) ? users : [];
  const filteredUsers = safeUsers.filter((user) => {
    const fullName = `${user?.fullName || ""}`.toLowerCase();
    const email = user?.email?.toLowerCase() || "";

    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase());

    // Role filter
    const matchesRole =
      roleFilter === "All Roles" ||
      user?.role?.toLowerCase() === roleFilter.toLowerCase();

    // Status filter
    const matchesStatus =
      statusFilter === "All Status" ||
      (statusFilter === "Active" && user?.active === true) ||
      (statusFilter === "Inactive" && user?.active === false);

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id))
        .unwrap()
        .then(() => {
          toast.success("User has been removed!");
        })
        .catch((error) => {
          toast.error("Failed to delete user");
          console.error("Failed to delete user:", error);
        });
    }
  };

  if (status === "loading") {
    return <div className="flex justify-center py-8">Loading users...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600 mt-1">
          Manage system users and permissions
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          className="md:hidden flex items-center gap-2 bg-gray-100 p-2 rounded-lg"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
          <span>Filters</span>
        </button>

        <div className={`${showFilters ? "block" : "hidden"} md:flex gap-4`}>
          <select
            className="border rounded-lg px-4 py-2"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All Roles">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Staff">Staff</option>
            <option value="Doctor">Doctor</option>
            <option value="User">User</option>
          </select>
          <select
            className="border rounded-lg px-4 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <Link
          to="/admin/users/add"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          <span className="hidden sm:inline md:inline">Add User</span>
        </Link>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="hidden md:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <Link
                      to={`/admin/users/view/${user._id}`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <EyeIcon className="h-5 w-5 text-blue-600" />
                    </Link>
                    <Link
                      to={`/admin/users/edit/${user._id}`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <PencilIcon className="h-5 w-5 text-indigo-600" />
                    </Link>
                    <button onClick={() => handleDelete(user._id)}>
                      <TrashIcon className="h-5 w-5 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List */}
        <div className="md:hidden divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <div key={user._id} className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{user.fullName}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-sm capitalize">{user.role}</span>
                <div className="flex gap-3">
                  <Link
                    to={`/admin/users/view/${user._id}`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <EyeIcon className="h-5 w-5 text-blue-600" />
                  </Link>
                  <Link
                    to={`/admin/users/edit/${user._id}`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <PencilIcon className="h-5 w-5 text-indigo-600" />
                  </Link>
                  <button onClick={() => handleDelete(user._id)}>
                    <TrashIcon className="h-5 w-5 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No users found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
