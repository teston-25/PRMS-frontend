import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogOut } from "lucide-react";
import { logout } from "../../../features/auth/authSlice";
import toast from "react-hot-toast";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { setSidebarOpen } from "../admin/adminSlice";
// No sidebar open state for now

export default function DoctorNavbar() {
  const { user } = useSelector((state) => state.auth);
  const sidebarOpen = useSelector((state) => state.admin.sidebarOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful!");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-white shadow-sm px-4 md:px-6 py-3 flex items-center justify-between border-b border-gray-200">
      {/* Hamburger for mobile (show only if sidebar is closed) */}
      {!sidebarOpen && (
        <button
          className="md:hidden text-gray-600 hover:text-gray-800 transition-colors mr-2"
          onClick={() => dispatch(setSidebarOpen(true))}
          aria-label="Open sidebar"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      )}
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 truncate max-w-[180px] lg:max-w-none">
        Doctor Portal
      </h2>

      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* User Avatar Only */}
        <Link to="/doctor/settings" className="outline-none focus:ring-2 focus:ring-blue-400 rounded-full">
          <img
            src={user?.avatar || "https://www.gravatar.com/avatar/?d=mp"}
            alt="User"
            className="w-9 h-9 rounded-full object-cover border-2 border-green-300 shadow-sm min-w-[36px] cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
          />
        </Link>
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