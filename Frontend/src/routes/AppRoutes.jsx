import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PublicLayout from '../layouts/PublicLayout';
import CitizenLayout from '../layouts/CitizenLayout';
import StaffLayout from '../layouts/StaffLayout';
import AdminLayout from '../layouts/AdminLayout';

import ProtectedRoute from '../middlewares/ProtectedRoute';

import Landing from '../pages/public/Landing';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import ForgotPassword from '../pages/public/ForgotPassword';
import ResetPassword from '../pages/public/ResetPassword';
import Unauthorized from '../pages/public/Unauthorized';
import Help from '../pages/public/Help';   
import About from '../pages/public/About';

import CitizenDashboard from '../pages/citizen/CitizenDashboard';
import StaffDashboard from '../pages/staff/StaffDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';

import CreateComplaint from '../pages/citizen/CreateComplaint';
import MyComplaints from '../pages/citizen/MyComplaints';

import ChangePassword from '../pages/staff/ChangePassword';


const AppRoutes = () => {

  // ✅ DARK MODE STATE
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('crp_theme') === 'dark';
  });

  // ✅ APPLY THEME
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('crp_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('crp_theme', 'light');
    }
  }, [darkMode]);


  return (
    <>
      {/* ✅ GLOBAL TOGGLE BUTTON */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-2 rounded-full text-sm shadow-lg dark:bg-white dark:text-black"
      >
        {darkMode ? '☀ Light' : '🌙 Dark'}
      </button>

      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        {/* ================= PROTECTED ================= */}
        <Route element={<ProtectedRoute />}>

          {/* 🔵 CITIZEN */}
          <Route element={<CitizenLayout />}>
            <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
            <Route path="/citizen/new-complaint" element={<CreateComplaint />} />
            <Route path="/citizen/my-complaints" element={<MyComplaints />} />
          </Route>

          {/* 🟣 STAFF */}
          <Route element={<StaffLayout />}>
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
          </Route>

          {/* 🟣 ADMIN */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* ✅ GLOBAL CHANGE PASSWORD */}
          <Route path="/change-password" element={<ChangePassword />} />

        </Route>

      </Routes>
    </>
  );
};

export default AppRoutes;
