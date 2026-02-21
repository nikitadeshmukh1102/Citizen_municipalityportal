import { useState } from 'react';
import { forgotPassword } from '../../services/auth.service';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    if (!email) {
      toast.error('Enter email');
      return;
    }

    try {
      const res = await forgotPassword(email);

      toast.success('Reset link generated');

      console.log('TOKEN:', res.data.resetToken);

    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white p-8 rounded-2xl shadow w-[400px]">

        <h2 className="text-xl font-bold mb-4">
          Forgot Password
        </h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border px-4 py-2 rounded-lg"
        />

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg"
        >
          Send Reset Link
        </button>

      </div>
    </div>
  );
};

export default ForgotPassword;
