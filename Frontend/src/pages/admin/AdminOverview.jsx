import { useEffect, useState } from 'react';
import { getAllComplaintsAdmin } from '../../services/admin.service';

const AdminOverview = () => {

  const [stats, setStats] = useState({
    PENDING: 0,
    ASSIGNED: 0,
    IN_PROGRESS: 0,
    RESOLVED: 0
  });

  useEffect(() => {
    getAllComplaintsAdmin()
      .then(res => {

        /* ✅ FIX */
        const data = res.data || [];

        const count = {
          PENDING: 0,
          ASSIGNED: 0,
          IN_PROGRESS: 0,
          RESOLVED: 0
        };

        data.forEach(c => {
          if (count[c.status] !== undefined) {
            count[c.status]++;
          }
        });

        setStats(count);
      });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card title="PENDING" value={stats.PENDING} />
      <Card title="ASSIGNED" value={stats.ASSIGNED} />
      <Card title="IN_PROGRESS" value={stats.IN_PROGRESS} />
      <Card title="RESOLVED" value={stats.RESOLVED} />
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <p className="text-xs">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AdminOverview;
