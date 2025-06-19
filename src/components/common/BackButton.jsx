import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const BackButton = () => (
  <Link
    to="/admin/patients"
    className="inline-flex items-center text-sm text-blue-600 hover:underline mb-4"
  >
    <ArrowLeftIcon className="h-4 w-4 mr-1" />
    Back
  </Link>
);

export default BackButton;
