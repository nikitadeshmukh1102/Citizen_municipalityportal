import { useEffect, useState } from 'react';
import { getAllComplaintsAdmin } from '../../services/admin.service';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllComplaintsAdmin()
      .then(res => {
        setComplaints(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  if (!loading && complaints.length === 0) {
    return <EmptyState message="No complaints found" />;
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        All Complaints
      </h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-blue-50 text-gray-700">
            <th className="p-3 text-left">Complaint ID</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Citizen</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Assigned Staff</th>
            <th className="p-3 text-left">View</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map(c => (
            <tr key={c.id} className="border-b hover:bg-gray-50">

              <td className="p-3 font-medium">
                {c.complaint_code}
              </td>

              <td className="p-3">
                {c.title}
              </td>

              <td className="p-3">
                {c.citizen_name || '—'}
              </td>

              <td className="p-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${c.status === 'RESOLVED' ? 'bg-green-100 text-green-700' :
                    c.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                    c.status === 'ASSIGNED' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-600'}`}
                >
                  {c.status}
                </span>
              </td>

              <td className="p-3">
                {c.staff_name || 'Unassigned'}
              </td>

              <td className="p-3">
                <button className="bg-blue-600 text-white px-4 py-1 rounded-lg text-xs hover:bg-blue-700">
                  View
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminComplaints;
