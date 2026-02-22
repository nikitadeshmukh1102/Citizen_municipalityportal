import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// assets
import logo from '../assets/common/logo.png';

const StaffLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#f6f8fb]">

      {/* ================= HEADER 1 ================= */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-green-100 to-green-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

          <div className="flex flex-wrap items-center gap-3">

            <img src={logo} alt="Logo" className="w-8 h-8" />
            <span className="text-sm font-medium text-slate-700">
              Citizen Complaints Management System
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-700">
            <span>Hello,</span>
            <span className="font-semibold">{user?.name}</span>
          </div>

        </div>
      </header>

      {/* ================= HEADER 2 ================= */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          <h1 className="text-white text-lg font-semibold">
            Staff Resolution Panel
          </h1>

          <div className="flex items-center gap-3 flex-wrap">
            <NavLink
              to="/staff/dashboard"
              className="px-4 py-1.5 rounded-full text-sm text-white bg-white/20 hover:bg-white/30 transition"
            >
              Home
            </NavLink>

            <NavLink
              to="/help"
              className="px-4 py-1.5 rounded-full text-sm text-white bg-white/20 hover:bg-white/30 transition"
            >
              Help
            </NavLink>

            <button
              onClick={logout}
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-5 py-1.5 rounded-full text-sm font-semibold transition"
            >
              Logout
            </button>

          </div>
        </div>
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main>
        <Outlet />
      </main>

    </div>
  );
};

export default StaffLayout;
