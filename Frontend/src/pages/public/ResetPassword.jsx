import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../services/auth.service';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState('');

  const handleReset = async () => {
    if (!password) {
      toast.error('Enter new password');
      return;
    }

    try {
      await resetPassword(token, password);

      toast.success('Password reset successful');

    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white p-8 rounded-2xl shadow w-[400px]">

        <h2 className="text-xl font-bold mb-4">
          Reset Password
        </h2>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          className="w-full border px-4 py-2 rounded-lg"
        />

        <button
          onClick={handleReset}
          className="w-full mt-4 bg-green-700 text-white py-2 rounded-lg"
        >
          Reset Password
        </button>

      </div>
    </div>
  );
};

export default ResetPassword;
