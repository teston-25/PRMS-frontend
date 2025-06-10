import { Bars3Icon, BellIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { setSidebarOpen } from "../layout/adminSlice";

export default function Navbar({ user }) {
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-20 w-full bg-white shadow-sm px-4 md:px-6 py-3 flex items-center justify-between rounded-bl-3xl border-b border-gray-200">
      {/* Sidebar Toggle */}
      <button
        className="md:hidden text-gray-600"
        onClick={() => dispatch(setSidebarOpen(true))}
        aria-label="Open sidebar"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Search or Title Placeholder */}
      <h1 className="text-lg font-semibold text-gray-800 hidden md:block">
        Admin Dashboard
      </h1>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <BellIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            1
          </span>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block text-sm font-medium text-gray-700">
            {user?.fullName}
          </div>
          <img
            src={user?.avatar || "https://www.gravatar.com/avatar/?d=mp"}
            alt="User"
            className="w-9 h-9 rounded-full object-cover border-2 border-green-300 shadow-sm"
          />
        </div>
      </div>
    </header>
  );
}
