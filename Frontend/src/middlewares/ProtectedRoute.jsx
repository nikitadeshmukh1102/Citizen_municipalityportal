import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {

  const { user } = useAuth();
  const location = useLocation();

  const token = localStorage.getItem('crp_token');
  const storedUser = localStorage.getItem('crp_user');

  if (!token || !storedUser) {
    return <Navigate to="/login" replace />;
  }

  const parsedUser = JSON.parse(storedUser);

  const role = parsedUser.role;
  const path = location.pathname;

  /* ✅ ADD THIS BLOCK (CRITICAL FIX 🔥) */
  if (path === '/change-password') {
    return <Outlet />;
  }

  if (path.startsWith('/citizen') && role !== 'CITIZEN') {
    return <Navigate to="/unauthorized" replace />;
  }

  if (path.startsWith('/staff') && role !== 'STAFF') {
    return <Navigate to="/unauthorized" replace />;
  }

  if (path.startsWith('/admin') && role !== 'ADMIN') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
