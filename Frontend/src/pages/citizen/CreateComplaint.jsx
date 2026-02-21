import { useState } from 'react';
import { createComplaintWithProof } from '../../services/complaint.service';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateComplaint = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        Loading user...
      </div>
    );
  }

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'WATER'
  });

  const [proof, setProof] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    setErr('');
    setSubmitting(true);

    try {
      const fd = new FormData();
      fd.append('citizen_id', user.id);
      fd.append('title', form.title);
      fd.append('description', form.description);
      fd.append('category', form.category);
      if (proof) fd.append('proof', proof);

      await createComplaintWithProof(fd);

      toast.success('Complaint submitted successfully');

      setTimeout(() => {
        navigate('/citizen/dashboard');
      }, 800);

    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to submit complaint';

      setErr(message);
      toast.error(message);

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 px-4">

      {/* ✅ MOBILE SAFE WRAPPER */}
      <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">

        {/* ===== HEADER ===== */}
        <div className="px-6 md:px-8 py-6 border-b bg-gradient-to-r from-blue-50 to-blue-100">
          <h2 className="text-2xl font-bold text-slate-800 break-words">
            Raise a Complaint
          </h2>
          <p className="text-sm text-slate-600 mt-1 break-words">
            Please provide accurate details to help us resolve your issue faster.
          </p>
        </div>

        {/* ===== FORM ===== */}
        <form onSubmit={submit} className="px-6 md:px-8 py-8 space-y-6">

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Complaint Title
            </label>
            <input
              type="text"
              placeholder="e.g. Water leakage near my house"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Describe the issue in detail"
              className="w-full border rounded-lg px-4 py-3 min-h-[130px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
            <p className="text-xs text-slate-500 mt-1 break-words">
              Include location, duration, or any helpful details.
            </p>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Complaint Category
            </label>
            <select
              className="w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option value="WATER">Water</option>
              <option value="ROAD">Road</option>
              <option value="STREET_LIGHT">Street Light</option>
              <option value="SANITATION">Sanitation</option>
            </select>
          </div>

          {/* PROOF */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Upload Proof (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProof(e.target.files[0])}
              className="block w-full text-sm text-slate-600
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
            />
            <p className="text-xs text-slate-500 mt-1 break-words">
              Upload an image to support your complaint (jpg, png).
            </p>
          </div>

          {/* SUBMIT */}
          <div className="pt-4">
            <button
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-60"
            >
              {submitting ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </div>

          {msg && <p className="text-green-600 text-sm">{msg}</p>}
          {err && <p className="text-red-600 text-sm break-words">{err}</p>}

        </form>
      </div>
    </div>
  );
};

export default CreateComplaint;