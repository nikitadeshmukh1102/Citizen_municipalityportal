import { useEffect, useState } from 'react';
import { getStaffList } from '../../services/admin.service';

const StaffList = () => {

  const [staff, setStaff] = useState([]);

  useEffect(() => {
    getStaffList()
      .then(res => {
        /* ✅ FIX */
        setStaff(res.data || []);
      });
  }, []);

  if (staff.length === 0) {
    return <div className="bg-white p-6 rounded-xl shadow">No staff members found</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-xl font-bold mb-4">
        Staff Members
      </h2>

      <table className="w-full text-sm">

        <tbody>
          {staff.map(s => (
            <tr key={s.id} className="border-b">
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.email}</td>
              <td className="p-3">{s.department || '—'}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default StaffList;
