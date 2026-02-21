import { useState, useEffect } from 'react';
import AllComplaints from './AllComplaints';
import { useAuth } from '../../context/AuthContext';

// ✅ assets
import heroImg from '../../assets/dashboards/staff/staff-hero.png';
import searchIcon from '../../assets/icons/search.svg';

const StaffDashboard = () => {
  const { user } = useAuth();

  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (user?.isFirstLogin) {
      setShowPasswordPopup(true);
    }
  }, [user]);

  return (
    <div className="bg-[#f6f8fb] min-h-screen relative">

      {/* ✅ FLOATING TOP POPUP */}
      {showPasswordPopup && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4">   {/* ✅ MOBILE SAFE */}
          <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] w-full max-w-[520px] overflow-hidden">   {/* ✅ WIDTH SAFE */}

            <div className="bg-[#f7f9fc] px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">
                Change your password
              </h3>
            </div>

            <div className="px-6 py-5">
              <p className="text-sm text-gray-600 mb-6 break-words">   {/* ✅ TEXT SAFE */}
                The password you just used was found in a data breach.
                For security reasons, please change your password now.
              </p>

              <div className="flex flex-col sm:flex-row justify-end gap-3">   {/* ✅ STACK SAFE */}
                <button
                  onClick={() => setShowPasswordPopup(false)}
                  className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm w-full sm:w-auto"
                >
                  OK
                </button>

                <button
                  onClick={() => window.location.href = '/change-password'}
                  className="px-5 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white text-sm w-full sm:w-auto"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-10">   {/* ✅ RESPONSIVE PADDING */}
        <div className="bg-white rounded-2xl shadow p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between border-l-8 border-blue-600">   {/* ✅ FLEX SAFE */}

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 break-words">   {/* ✅ TEXT SAFE */}
              Staff Dashboard
            </h2>

            <p className="text-gray-700 mb-1 break-words">
              Welcome, <span className="font-semibold">{user?.name}</span>!
              Here are the complaints assigned to you.
            </p>

            <p className="text-gray-600 mb-6 break-words">
              Manage and update them as needed.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 w-full sm:w-fit">   {/* ✅ WIDTH SAFE */}
              <p className="text-sm text-yellow-800 break-words">
                <span className="font-semibold">Tip:</span> Click on "Update" to change status and add remarks to a complaint.
              </p>
            </div>
          </div>

          <img
            src={heroImg}
            alt="Staff Hero"
            className="hidden md:block w-[380px]"
          />
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-10">   {/* ✅ RESPONSIVE PADDING */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">   {/* ✅ STACK SAFE */}

          <div>
            <h3 className="text-2xl font-bold">
              Assigned Complaints
            </h3>

            <p className="text-sm text-gray-600">
              Assigned complaints are listed here. You can filter them by status and department.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">   {/* ✅ MOBILE SAFE */}

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-xl px-4 py-2 text-sm shadow-sm w-full sm:w-auto"
            >
              <option value="ALL">Filter by Status: All</option>
              <option value="PENDING">Pending</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="border rounded-xl px-4 py-2 text-sm shadow-sm w-full sm:w-auto"
            >
              <option value="ALL">Filter by Department: All</option>
              <option value="WATER">Water</option>
              <option value="ROAD">Road</option>
              <option value="STREET_LIGHT">Street Light</option>
              <option value="SANITATION">Sanitation</option>
            </select>

            <div className="relative w-full sm:w-auto">   {/* ✅ SEARCH SAFE */}
              <img
                src={searchIcon}
                className="absolute left-3 top-3 w-4 opacity-60"
                alt=""
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search complaints"
                className="border rounded-xl pl-9 pr-4 py-2 text-sm shadow-sm w-full"
              />
            </div>

          </div>
        </div>

        <AllComplaints
          statusFilter={statusFilter}
          departmentFilter={departmentFilter}
          search={search}
        />
      </section>

      <footer className="mt-16 py-6 text-center text-sm text-gray-500">
        Citizen Complaints Management System
      </footer>

    </div>
  );
};

export default StaffDashboard;