import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ChangePassword = () => {
  const { user, logout } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading session...
      </div>
    );
  }

  const handleChangePassword = async () => {

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('All fields required');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      await api.post('/password/change', {
        user_id: user.id,
        currentPassword,
        newPassword
      });

      toast.success('Password updated successfully');

      setTimeout(() => logout(), 1200);

    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || 'Password change failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-xl w-[420px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          Change Password
        </h2>

        <div className="space-y-4">

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-sm"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-sm"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-sm"
          />

        </div>

        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="w-full mt-6 bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg text-sm font-semibold"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>

      </div>
    </div>
  );
};

export default ChangePassword;
