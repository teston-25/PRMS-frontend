import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-[url('src/assets/backg.jpg')] text-white">
      {/* Overlay with blur and tint */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <header className="relative z-10 px-8 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white drop-shadow">
          Seid Nur Dental Clinic
        </h1>
        <div className="space-x-4">
          <Link
            to="/signup"
            className="px-4 py-2 bg-white/90 text-blue-800 font-semibold rounded hover:bg-white transition"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 border border-white text-white hover:bg-white/20 rounded transition"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Centered Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[85vh] px-6">
        <div className="bg-white/80 backdrop-blur-md text-gray-900 rounded-xl p-10 shadow-lg max-w-4xl w-full">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-4">
            Your Smile, Our Priority
          </h2>
          <p className="text-center text-lg text-gray-700 mb-8">
            Welcome to Seid Nur Dental Clinic — providing trusted, affordable,
            and modern dental care for patients of all ages. Our professional
            team is committed to helping you achieve and maintain excellent oral
            health with personalized care in a friendly environment.
          </p>

          <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">
            Our Services
          </h3>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Routine Checkups & Cleanings",
              "Tooth Fillings & Restorations",
              "Root Canal Treatment",
              "Teeth Whitening & Cosmetic Dentistry",
              "Dental Implants & Bridges",
              "Pediatric Dentistry",
              "Orthodontics (Braces)",
              "Tooth Extraction & Surgery",
            ].map((service, index) => (
              <li
                key={index}
                className="bg-white text-center text-sm font-medium p-4 rounded-lg shadow border border-gray-200"
              >
                {service}
              </li>
            ))}
          </ul>

          <div className="text-center mt-10">
            <Link
              to="/signup"
              className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Get Started — Sign Up
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 text-center py-6 text-sm text-gray-200">
        &copy; {new Date().getFullYear()} Seid Nur Dental Clinic. All rights
        reserved.
      </footer>
    </div>
  );
}
