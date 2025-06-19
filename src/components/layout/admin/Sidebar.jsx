import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen } from "../admin/adminSlice";
import { logout } from "../../../features/auth/authSlice";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  Settings,
  LogOut,
  ClipboardList,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    to: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  { name: "Patients", to: "/admin/patients", icon: <Users size={18} /> },
  {
    name: "Appointments",
    to: "/admin/appointments",
    icon: <CalendarDays size={18} />,
  },
  { name: "Users", to: "/admin/users", icon: <Users size={18} /> },
  { name: "Reports", to: "/admin/reports", icon: <FileText size={18} /> },
  { name: "Settings", to: "/admin/settings", icon: <Settings size={18} /> },
  { name: "Access Logs", to: "/admin/logs", icon: <ClipboardList size={18} /> },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarOpen = useSelector((state) => state.admin.sidebarOpen);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful!");
    navigate("/");
  };

  return (
    <aside className="w-64 h-full bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 shadow-xl flex flex-col">
      <div className="px-6 py-5 text-2xl font-bold text-gray-800 border-b border-blue-300/50 bg-blue-50 rounded-br-3xl">
        PRMS Admin
      </div>
      <nav className="flex-1 mt-4 space-y-1 px-3">
        {navItems.map(({ name, to, icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            onClick={() => dispatch(setSidebarOpen(false))}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                isActive
                  ? "bg-white text-blue-800 shadow-sm"
                  : "text-gray-800 hover:bg-white/30 hover:text-blue-900",
              ].join(" ")
            }
          >
            {icon}
            {name}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-green-300/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-sm font-semibold text-red-700 px-4 py-3 hover:bg-red-100 rounded-xl transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
