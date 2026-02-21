import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyComplaints } from '../../services/complaint.service';
import { useNavigate } from 'react-router-dom';

// assets
import heroImg from '../../assets/dashboards/citizen/citizen-hero.png';
import searchIcon from '../../assets/icons/search.svg';

const statusMap = {

  RESOLVED: {
    label: 'Resolved',
    class: 'bg-green-100 text-green-700',
    icon: '✅'
  },

  IN_PROGRESS: {
    label: 'In Progress',
    class: 'bg-yellow-100 text-yellow-700',
    icon: '🟡'
  },

  PENDING: {
    label: 'Pending',
    class: 'bg-red-100 text-red-700',
    icon: '⏳'
  },

  /* ✅ ADD THIS ONLY */
  ASSIGNED: {
    label: 'Assigned',
    class: 'bg-blue-100 text-blue-700',
    icon: '📌'
  }
};

const CitizenDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('ALL');
  const [department, setDepartment] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getMyComplaints(user.id).then(res => {
      setComplaints(res.data || []);
      setLoading(false);
    });
  }, [user.id]);

  const filtered = complaints.filter(c =>
    (status === 'ALL' || c.status === status) &&
    (department === 'ALL' || c.category === department) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#f6f8fb] min-h-screen">

    
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-10">   
        <div className="bg-white rounded-2xl shadow p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between border-l-8 border-blue-500">   

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 break-words"> 
              Welcome, {user.name}!
            </h2>

            <p className="text-gray-600 mb-6 max-w-xl break-words">   
              Here are your complaints. Track their status and stay updated.
            </p>

            <button
              onClick={() => navigate('/citizen/new-complaint')}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow font-medium transition"   
            >
              Submit New Complaint
            </button>
          </div>

          <img
            src={heroImg}
            className="hidden md:block w-[380px]"
            alt="Citizen Hero"
          />
        </div>
      </section>

     
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-14">   

        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6">   
          <div>
            <h3 className="text-2xl font-bold">My Complaints</h3>
            <p className="text-sm text-gray-600">
              Track your submitted complaints here.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">  

            <select
              className="border rounded-xl px-4 py-2 text-sm w-full sm:w-auto"   
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="ALL">Status: All</option>
              <option value="RESOLVED">Resolved</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="PENDING">Pending</option>
            </select>

            <select
              className="border rounded-xl px-4 py-2 text-sm w-full sm:w-auto"   
              value={department}
              onChange={e => setDepartment(e.target.value)}
            >
              <option value="ALL">Department: All</option>
              <option value="ROAD">Road</option>
              <option value="WATER">Water</option>
              <option value="SANITATION">Sanitation</option>
              <option value="STREET_LIGHT">Street Light</option>
            </select>

            <div className="relative w-full sm:w-auto">   
              <img
                src={searchIcon}
                className="absolute left-3 top-3 w-4 opacity-60"
                alt=""
              />
              <input
                className="border rounded-xl pl-9 pr-4 py-2 text-sm w-full"   
                placeholder="Search complaints"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

          </div>
        </div>

       
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden overflow-x-auto">

          {loading ? (
            <div className="py-16 text-center text-gray-500">
              Loading complaints...
            </div>
          ) : (
            <table className="min-w-full text-sm">   

              <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Complaint ID</th>
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Department</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Remarks</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((c, i) => {

                  const latestRemark =
                    c.remarks?.length
                      ? c.remarks[c.remarks.length - 1].message
                      : '—';

                  return (
                    <tr
                      key={c.id}
                      className={`${i % 2 ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-100 transition`}
                    >
                      <td className="px-6 py-4 font-semibold">
                        CMP-{c.id}
                      </td>

                      <td className="px-6 py-4 break-words">  
                        {c.title}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium whitespace-nowrap">  
                          {c.category.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">   
                        <span className={`inline-flex gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusMap[c.status].class}`}>
                          {statusMap[c.status].icon} {statusMap[c.status].label}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(c.created_at).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-gray-600 truncate max-w-xs">
                        {latestRemark}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          )}
        </div>
      </section>

      <footer className="mt-20 py-6 text-center text-sm text-gray-500">
        Citizen Complaints Management System
      </footer>
    </div>
  );
};

export default CitizenDashboard;