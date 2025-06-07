import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { setSidebarOpen } from "../layout/adminSlice";

export default function Navbar({ user }) {
  const dispatch = useDispatch();

  return (
    <header className="bg-black text-white flex items-center justify-between px-4 md:px-6 py-4 shadow">
      <button
        className="md:hidden"
        onClick={() => dispatch(setSidebarOpen(true))}
        aria-label="Open sidebar"
      >
        <Bars3Icon className="h-7 w-7" />
      </button>

      <h1 className="text-lg font-semibold">Admin Dashboard</h1>

      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-sm">{user?.fullName}</span>
        <UserCircleIcon className="h-8 w-8 text-white" />
      </div>
    </header>
  );
}
