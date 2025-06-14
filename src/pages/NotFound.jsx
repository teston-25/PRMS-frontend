import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center px-6">
      <div className="text-center max-w-lg bg-white shadow-xl rounded-2xl p-10">
        <h1 className="text-5xl font-bold text-purple-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or was moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg transition"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
