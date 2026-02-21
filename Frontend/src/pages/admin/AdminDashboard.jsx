import { useEffect, useState } from 'react';
import {
  getAllComplaintsAdmin,
  getStaffList,
  assignComplaint
} from '../../services/admin.service';

import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import heroImg from '../../assets/dashboards/admin/admin-hero.png';

const AdminDashboard = () => {

  const [complaints, setComplaints] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    Promise.all([
      getAllComplaintsAdmin(),
      getStaffList()
    ])
      .then(([cRes, sRes]) => {

        setComplaints(cRes.data || []);
        setStaff(sRes.data || []);

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAssign = async (complaintId, staffId) => {
    if (!staffId) return;

    await assignComplaint(complaintId, staffId);

    const res = await getAllComplaintsAdmin();
    setComplaints(res.data || []);
  };

  const handleView = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
  };

 const filteredComplaints = complaints.filter(c =>
  (statusFilter === 'ALL' || c.status === statusFilter) &&
  (c.title || '').toLowerCase().includes(search.toLowerCase())
);

  const stats = {
    TOTAL: complaints.length,
    PENDING: complaints.filter(c => c.status === 'PENDING').length,
    ASSIGNED: complaints.filter(c => c.status === 'ASSIGNED').length,
    RESOLVED: complaints.filter(c => c.status === 'RESOLVED').length
  };

  if (loading) return <Loader />;

 return (
  <div className="min-h-screen flex flex-col px-4 md:px-0">

      {/* HERO */}
      <div className="bg-white rounded-3xl shadow-sm p-6 md:p-10 mb-10 border border-gray-100">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800">
              Admin Dashboard
            </h1>

            <p className="text-gray-500 mb-6">
              Welcome, Administrator! Here you can manage and monitor all citizen complaints.
            </p>

            <div className="flex flex-wrap gap-3">

              <StatCard title="Total Complaints" value={stats.TOTAL} color="from-indigo-400 to-indigo-500" />
              <StatCard title="Pending Complaints" value={stats.PENDING} color="from-blue-400 to-blue-500" />
              <StatCard title="Assigned Complaints" value={stats.ASSIGNED} color="from-green-400 to-green-500" />
              <StatCard title="Resolved Complaints" value={stats.RESOLVED} color="from-cyan-400 to-cyan-500" />

            </div>
          </div>

          <img src={heroImg} className="w-[260px] md:w-[320px] hidden md:block" />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-sm p-5 md:p-8 border border-gray-100">

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">

          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            All Complaints
          </h2>

          <div className="flex flex-col md:flex-row gap-3">

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-xl px-4 py-2 text-sm bg-gray-50 w-full md:w-auto"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search complaints"
              className="border rounded-xl px-4 py-2 text-sm bg-gray-50 w-full md:w-[220px]"
            />

          </div>
        </div>

        {filteredComplaints.length === 0 ? (
          <EmptyState message="No complaints found" />
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="bg-blue-50 text-gray-700">
                  <th className="p-4 text-left">Complaint</th>
                  <th className="p-4 text-left">Citizen</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Assigned Staff</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredComplaints.map(c => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">

                    <td className="p-4 font-medium text-gray-700 whitespace-nowrap">
                      {c.complaint_code} – {c.title}
                    </td>

                    <td className="p-4 text-gray-600">
                      {c.citizen_name || '—'}
                    </td>

                    <td className="p-4">
                      <StatusBadge status={c.status} />
                    </td>

                    <td className="p-4">

                      {c.staff_name ? (
                        <span className="text-gray-700 font-medium">
                          {c.staff_name}
                        </span>
                      ) : (
                        <select
                          onChange={(e) => handleAssign(c.id, e.target.value)}
                          className="border rounded-lg px-3 py-1 text-xs bg-gray-50"
                        >
                          <option value="">Assign Staff</option>
                          {staff.map(s => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      )}

                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleView(c)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-xs shadow-sm"
                      >
                        View
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="
            bg-white rounded-3xl shadow-2xl
            w-full max-w-lg
            mx-4
            p-6 md:p-8
            relative
            max-h-[90vh]
            overflow-y-auto
          ">

            <button
              onClick={closeModal}
              className="absolute top-4 right-5 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-lg md:text-xl font-bold mb-6 text-gray-800">
              Complaint Details
            </h2>

            <div className="space-y-3 text-sm text-gray-600">

              <p><b>Code:</b> {selectedComplaint.complaint_code}</p>
              <p><b>Title:</b> {selectedComplaint.title}</p>
              <p><b>Citizen:</b> {selectedComplaint.citizen_name || '—'}</p>
              <p><b>Status:</b> {selectedComplaint.status}</p>
              <p><b>Assigned Staff:</b> {selectedComplaint.staff_name || 'Unassigned'}</p>

              {selectedComplaint.description && (
                <p><b>Description:</b> {selectedComplaint.description}</p>
              )}

              {selectedComplaint.proof && (
                <img
                  src={`http://localhost:5000/${selectedComplaint.proof}`}
                  className="mt-4 rounded-xl border"
                />
              )}

            </div>
          </div>
        </div>
      )}

     
      <footer className="mt-16 py-6 text-center text-sm text-gray-500">
        Citizen Complaints Management System
      </footer>

    </div>
  );
};


const StatCard = ({ title, value, color }) => (
  <div className={`bg-gradient-to-r ${color} text-white px-5 py-3 rounded-2xl w-full sm:w-[180px] shadow-sm`}>
    <p className="text-xs opacity-90">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);


const StatusBadge = ({ status }) => {

  const styles = {
    PENDING: 'bg-red-100 text-red-600',
    ASSIGNED: 'bg-yellow-100 text-yellow-700',
    IN_PROGRESS: 'bg-blue-100 text-blue-700',
    RESOLVED: 'bg-green-100 text-green-700'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
};

export default AdminDashboard;