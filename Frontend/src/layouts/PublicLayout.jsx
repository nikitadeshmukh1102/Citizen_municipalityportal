import { Outlet, NavLink, Link } from "react-router-dom";
import { useState } from "react";   // ✅ ADD ONLY
import logo from "../assets/common/logo.png";

const PublicLayout = () => {

  const [menuOpen, setMenuOpen] = useState(false);  // ✅ ADD ONLY

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">

      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-white/40 dark:border-gray-700 shadow-sm">
<div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">

         <div className="flex items-center gap-2 md:gap-3">
            <img src={logo} alt="CRP Logo" className="h-9" />
          <span className="text-sm md:text-xl font-semibold text-gray-800 dark:text-white">
              Citizen Resolution Platform
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-gray-700 dark:text-gray-200 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <Link to="/about" className="hover:text-blue-600 transition">About</Link>
            <Link to="/help" className="hover:text-blue-600 transition">Help</Link>
            <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow"
            >
              Register
            </Link>
          </nav>

          {/* ✅ ADD ONLY */}
          <button
          className="md:hidden text-xl px-2 text-gray-700 dark:text-gray-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

        {/* ✅ ADD ONLY */}
        {menuOpen && (
          <div className="
md:hidden
mx-3 mb-3
px-4 py-3
flex flex-col gap-3
text-sm font-medium

bg-white/80 dark:bg-gray-900/80
backdrop-blur-xl

rounded-2xl
shadow-[0_10px_30px_rgba(0,0,0,0.08)]
border border-white/40 dark:border-gray-700
">
         <NavLink
  to="/"
  className={({ isActive }) =>
    `px-3 py-2 rounded-lg transition-all duration-200 active:scale-95 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "hover:bg-blue-50 dark:hover:bg-gray-800"
    }`
  }
>
  Home
</NavLink>

<NavLink
  to="/about"
  className={({ isActive }) =>
    `px-3 py-2 rounded-lg transition-all duration-200 active:scale-95${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "hover:bg-blue-50 dark:hover:bg-gray-800"
    }`
  }
>
  About
</NavLink>

<NavLink
  to="/help"
  className={({ isActive }) =>
    `px-3 py-2 rounded-lg transition-all duration-200 active:scale-95 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "hover:bg-blue-50 dark:hover:bg-gray-800"
    }`
  }
>
  Help
</NavLink>

<NavLink
  to="/login"
  className={({ isActive }) =>
    `px-3 py-2 rounded-lg transition-all duration-200 active:scale-95 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "hover:bg-blue-50 dark:hover:bg-gray-800"
    }`
  }
>
  Login
</NavLink>

<NavLink
  to="/register"
  className={({ isActive }) =>
    `px-3 py-2 rounded-lg transition-all duration-200 active:scale-95${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "hover:bg-blue-50 dark:hover:bg-gray-800"
    }`
  }
>
  Register
</NavLink>
          </div>
        )}

      </header>

      <main className="flex-1">
        <Outlet />
      </main>

    </div>
  );
};

export default PublicLayout;