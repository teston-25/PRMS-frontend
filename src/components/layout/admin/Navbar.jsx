import { Bars3Icon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { setSidebarOpen } from "../admin/adminSlice";
import { LogOut } from "lucide-react";
import { logout } from "../../../features/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful!");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-white shadow-sm px-4 md:px-6 py-3 flex items-center border-b border-gray-200">
      {/* Sidebar Toggle */}
      <button
        className="md:hidden text-gray-600 hover:text-gray-800 transition-colors"
        onClick={() => dispatch(setSidebarOpen(true))}
        aria-label="Open sidebar"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      {/* Title */}
      <h1 className="flex-1 text-lg font-semibold text-gray-800 text-center md:text-left truncate">
        Admin Dashboard
      </h1>
      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* User Info */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="hidden sm:block text-sm font-medium text-gray-700 truncate max-w-[120px] lg:max-w-[160px]">
            {user?.fullName}
          </div>
          <Link to="/admin/settings" className="outline-none focus:ring-2 focus:ring-blue-400 rounded-full">
            <img
              src={user?.avatar || "https://www.gravatar.com/avatar/?d=mp"}
              alt="User"
              className="w-9 h-9 rounded-full object-cover border-2 border-green-300 shadow-sm min-w-[36px] cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
            />
          </Link>
        </div>
        {/* Logout Button (styled like sidebar, gray by default, red on hover) */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 px-4 py-2 hover:bg-red-100 hover:text-red-700 rounded-xl transition-colors"
        >
          <LogOut size={22} />
        </button>
      </div>
    </header>
  );
}
