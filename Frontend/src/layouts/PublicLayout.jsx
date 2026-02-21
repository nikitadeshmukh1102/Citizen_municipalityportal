import { Outlet, Link } from "react-router-dom";
import logo from "../assets/common/logo.png";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">

      {/* ================= GLASS HEADER (STICKY) ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-white/40 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="CRP Logo" className="h-9" />
            <span className="text-xl font-semibold text-gray-800 dark:text-white">
              Citizen Resolution Platform
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-gray-700 dark:text-gray-200 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>

            <Link to="/about" className="hover:text-blue-600 transition">
              About
            </Link>

            <Link to="/help" className="hover:text-blue-600 transition">
              Help
            </Link>

            <Link to="/login" className="hover:text-blue-600 transition">
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow"
            >
              Register
            </Link>
          </nav>

        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1">
        <Outlet />
      </main>

    </div>
  );
};

export default PublicLayout;
