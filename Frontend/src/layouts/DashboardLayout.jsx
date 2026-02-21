import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const isCitizen = user?.role === 'CITIZEN';

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* SIDEBAR → ONLY STAFF & ADMIN */}
      {!isCitizen && (
        <aside className="w-64 bg-blue-700 text-white p-5">
          <h2 className="text-xl font-bold mb-6">
            {user?.role} Dashboard
          </h2>

          <nav className="space-y-3 text-sm">
            <p className="opacity-80">Welcome,</p>
            <p className="font-semibold">{user?.name}</p>

            <button
              onClick={logout}
              className="mt-6 w-full bg-red-500 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </nav>
        </aside>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;
