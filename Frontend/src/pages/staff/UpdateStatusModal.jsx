import { useState } from 'react';
import { addRemark } from '../../services/staff.service';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';   // ✅ ONLY ADD

const UpdateStatusModal = ({ complaint, close }) => {
  const { user } = useAuth();

  const [status, setStatus] = useState('');
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {

    if (!status) {
      toast.error('Select status');     // ✅ ALERT → TOAST
      return;
    }

    if (!remark.trim()) {
      toast.error('Enter remark');      // ✅ ALERT → TOAST
      return;
    }

    try {
      setLoading(true);

      await addRemark({
        complaint_id: complaint.id,
        staff_id: user.id,
        status_at_time: status,
        message: remark
      });

      toast.success('Updated successfully');   // ✅ ALERT → TOAST

      close();
      window.location.reload();

    } catch (err) {
      console.error(err);
      toast.error('Update failed');            // ✅ ALERT → TOAST
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      {/* ✅ RESPONSIVE SAFETY ADDED */}
      <div className="
        bg-white rounded-2xl shadow-xl
        w-full max-w-lg
        mx-4
        p-6
        max-h-[90vh]
        overflow-y-auto
      ">

        <h3 className="text-lg font-semibold mb-4">
          Update Complaint
        </h3>

        <div className="mb-4">
          <p className="text-sm text-gray-500">Complaint</p>
          <p className="font-semibold">{complaint.title}</p>
        </div>

        {/* STATUS */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">
            Change Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
          >
            <option value="">Select Status</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>

        {/* REMARK */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">
            Remarks / Progress Note
          </label>

          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter progress details..."
            className="w-full border rounded-lg px-3 py-2 text-sm mt-1 h-24 resize-none"
          />
        </div>

        {/* ✅ BUTTON RESPONSIVE SAFETY */}
        <div className="flex flex-col md:flex-row justify-end gap-3 mt-6">

          <button
            onClick={close}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white text-sm"
          >
            {loading ? 'Updating...' : 'Save Update'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default UpdateStatusModal;