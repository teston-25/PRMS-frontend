import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(-1, { replace: true });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center text-sm text-blue-600 hover:underline mb-4"
    >
      <ArrowLeftIcon className="h-4 w-4 mr-1" />
      Back
    </button>
  );
};

export default BackButton;
