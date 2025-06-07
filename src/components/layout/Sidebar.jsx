import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen, logout } from "../layout/adminSlice";

const navItems = [
  { name: "Dashboard", to: "/admin" },
  { name: "Patients", to: "/admin/patients" },
  { name: "Appointments", to: "/admin/appointments" },
  { name: "Users", to: "/admin/users" },
  { name: "Reports", to: "/admin/reports" },
  { name: "Settings", to: "/admin/settings" },
  { name: "Access Logs", to: "/admin/logs" },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.admin.sidebarOpen);
  console.log(sidebarOpen);
  return (
    <aside className="w-64 h-full bg-gradient-to-b from-green-200 via-green-400 to-green-600 shadow-md">
      <div className="p-6 text-xl font-bold text-gray-900 border-b bg-green-100/50">
        PRMS Admin
      </div>

      <nav className="mt-6 flex flex-col gap-1">
        {navItems.map(({ name, to }) => (
          <NavLink
            key={to}
            to={to}
            end
            onClick={() => dispatch(setSidebarOpen(false))}
            className={({ isActive }) =>
              [
                "px-6 py-2 transition-colors",
                isActive
                  ? "bg-white text-green-700 font-semibold rounded-tr-2xl rounded-br-2xl shadow"
                  : "text-gray-900 hover:bg-green-300/70",
              ].join(" ")
            }
          >
            {name}
          </NavLink>
        ))}

        <button
          onClick={() => dispatch(logout())}
          className="text-left w-full px-6 py-2 text-red-700 hover:bg-red-100 transition-colors"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
