import { useEffect, useState } from 'react';
import { getAllComplaints } from '../../services/staff.service';
import UpdateStatusModal from './UpdateStatusModal';

import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';

const AllComplaints = ({ statusFilter, departmentFilter, search }) => {
  const [complaints, setComplaints] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllComplaints().then(res => {
      setComplaints(res.data || []);
      setLoading(false);
    });
  }, []);

  const filteredComplaints = complaints.filter(c =>
    (statusFilter === 'ALL' || c.status === statusFilter) &&
    (departmentFilter === 'ALL' || c.category === departmentFilter) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      {loading && <Loader />}

      {!loading && filteredComplaints.length === 0 && (
        <EmptyState message="No complaints found" />
      )}

      {!loading && filteredComplaints.length > 0 && (

      
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Complaint ID</th>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Proof</th>
                <th className="px-6 py-4 text-left">Remarks</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredComplaints.map((c, i) => (
                <tr
                  key={c.id}
                  className={`${i % 2 ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-100`}
                >
                  <td className="px-6 py-4 font-semibold">
                    {c.complaint_code}
                  </td>

                  <td className="px-6 py-4">{c.title}</td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                      {c.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    {c.proof ? (
  <a
    href={`https://citizenmunicipalityportal-production.up.railway.app/${c.proof.replace(/\\/g, '/')}`}
    target="_blank"
    rel="noreferrer"
    className="text-blue-600 hover:underline"
  >
    View
  </a>
) : '-'}
                  </td>

                  <td className="px-6 py-4 text-xs">
                    {c.remarks?.length
                      ? c.remarks[c.remarks.length - 1].message
                      : '—'}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelected(c)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {selected && (
        <UpdateStatusModal
          complaint={selected}
          close={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default AllComplaints;