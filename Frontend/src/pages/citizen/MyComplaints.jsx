import { useEffect, useState } from 'react';
import { getMyComplaints } from '../../services/complaint.service';
import { useAuth } from '../../context/AuthContext';

import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';

const MyComplaints = () => {
  const { user } = useAuth();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchComplaints = async () => {
      try {
        const res = await getMyComplaints(user.id);
        setList(res.data || []);
      } catch (err) {
        console.error('Failed to load complaints', err);
        setError('Failed to load complaints');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [user?.id]);

  return (
    <div className="mt-6 px-4 md:px-0">   {/* ✅ ONLY ADD */}

      <h2 className="text-xl font-bold mb-4">
        My Complaints
      </h2>

      {loading && <Loader />}

      {!loading && error && (
        <EmptyState message={error} />
      )}

      {!loading && !error && list.length === 0 && (
        <EmptyState message="No complaints found" />
      )}

      {!loading && !error && list.length > 0 && (
        <div className="space-y-3">
          {list.map((c) => (
            <div
              key={c.id}
              className="bg-white border p-4 rounded shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-2">   {/*  ONLY ADD */}
                <h3 className="font-semibold break-words">   {/*  ONLY ADD */}
                  {c.title}
                </h3>
                <span className="text-sm text-blue-600">
                  {c.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-1 break-words">   {/* ✅ ONLY ADD */}
                {c.category}
              </p>

              <p className="text-xs text-gray-500 mt-2">
                Created: {new Date(c.created_at).toLocaleString()}
              </p>

              {c.proof && (
  <div className="mt-2">
    <a
      href={`https://citizenmunicipalityportal-production.up.railway.app/${c.proof.replace(/\\/g, '/')}`}
      target="_blank"
      rel="noreferrer"
      className="text-sm text-blue-600 underline break-all"
    >
      View Proof
    </a>
  </div>
)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyComplaints;