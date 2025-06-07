import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="absolute top-5 right-5 space-x-4">
      <Link to="/signup" className="hover:underline">
        Signup
      </Link>
      <Link to="/login" className="hover:underline">
        Login
      </Link>
    </div>
  );
}

export default Landing;
