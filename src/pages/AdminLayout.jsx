import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/layout/admin/Navbar";
import Sidebar from "../components/layout/admin/Sidebar";
import { setSidebarOpen } from "../components/layout/admin/adminSlice";

export default function AdminLayout() {
  const dispatch = useDispatch();
  const { sidebarOpen, user } = useSelector((state) => state.admin);

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>
      {sidebarOpen && (
        <div
          onClick={() => dispatch(setSidebarOpen(false))}
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
        />
      )}
      <div className="flex flex-col flex-1">
        <Navbar user={user} />
        <main className="flex-1 p-6 bg-[#f5f7fa]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
