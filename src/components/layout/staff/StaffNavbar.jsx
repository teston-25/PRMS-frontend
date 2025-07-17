import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogOut } from "lucide-react";
import { logout } from "../../../features/auth/authSlice";
import { setSidebarOpen } from "../../../features/staff/staffSlice";
import toast from "react-hot-toast";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function StaffNavbar() {
  const { user } = useSelector((state) => state.auth);
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
      <div className="flex items-center flex-1">
        <button
          className="md:hidden mr-3"
          onClick={() => dispatch(setSidebarOpen(true))}
          aria-label="Open sidebar"
        >
          <Bars3Icon className="w-7 h-7 text-gray-700" />
        </button>
        <div className="flex-1 flex justify-center">
          <h2 className="text-xl font-semibold text-gray-800 truncate max-w-[180px] lg:max-w-none text-center">
            Staff Portal
          </h2>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <Link to="/staff/settings" className="outline-none focus:ring-2 focus:ring-blue-400 rounded-full">
          <img
            src={user?.avatar || "https://www.gravatar.com/avatar/?d=mp"}
            alt="User"
            className="w-9 h-9 rounded-full object-cover border-2 border-green-300 shadow-sm min-w-[36px] cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
          />
        </Link>
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