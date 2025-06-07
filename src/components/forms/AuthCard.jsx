export default function AuthCard({ title, onSubmit, buttonText, children }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg w-96 text-gray-800"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      {children}
      <button
        type="submit"
        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-xl transition"
      >
        {buttonText}
      </button>
    </form>
  );
}
