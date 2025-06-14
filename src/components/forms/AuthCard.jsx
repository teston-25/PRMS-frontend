export default function AuthCard({ title, onSubmit, buttonText, children }) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-100 text-gray-800"
    >
      <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">
        {title}
      </h2>

      <div className="space-y-4">{children}</div>

      <button
        type="submit"
        className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-md"
      >
        {buttonText}
      </button>
    </form>
  );
}
