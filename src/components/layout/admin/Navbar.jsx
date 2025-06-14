import { Bars3Icon, BellIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { setSidebarOpen } from "../admin/adminSlice";
import { Search } from "lucide-react";

export default function Navbar({ user }) {
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 z-20 w-full bg-white shadow-sm px-4 md:px-6 py-3 flex items-center justify-between rounded-bl-3xl border-b border-gray-200">
      {/* Sidebar Toggle */}
      <button
        className="md:hidden text-gray-600 hover:text-gray-800 transition-colors"
        onClick={() => dispatch(setSidebarOpen(true))}
        aria-label="Open sidebar"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Search or Title Placeholder */}
      <h1 className="text-lg font-semibold text-gray-800 hidden md:block truncate max-w-[180px] lg:max-w-none">
        Admin Dashboard
      </h1>

      {/* Search bar - now properly centered and responsive */}
      <div className="flex-1 mx-2 md:mx-4 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients, appointments..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors placeholder-gray-500"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative">
          <BellIcon className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            1
          </span>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="hidden sm:block text-sm font-medium text-gray-700 truncate max-w-[120px] lg:max-w-[160px]">
            {user?.fullName}
          </div>
          <img
            src={user?.avatar || "https://www.gravatar.com/avatar/?d=mp"}
            alt="User"
            className="w-9 h-9 rounded-full object-cover border-2 border-green-300 shadow-sm min-w-[36px]"
          />
        </div>
      </div>
    </header>
  );
}
