import { FaExclamationCircle } from "react-icons/fa";

const ErrorMessage = ({ message, onRetry, className = "" }) => {
  return (
    <div
      className={`bg-red-50 border-l-4 border-red-500 p-4 ${className}`}
      role="alert"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <FaExclamationCircle
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">
            {message || "An unexpected error occurred. Please try again."}
          </p>
          {onRetry && (
            <div className="mt-2">
              <button
                type="button"
                onClick={onRetry}
                className="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
