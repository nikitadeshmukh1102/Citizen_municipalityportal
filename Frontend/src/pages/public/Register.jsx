import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/auth.service';
import {
  isValidName,
  isValidEmail,
  isValidPassword
} from '../../utils/validators';

import registerImg from '../../assets/common/register.png';
import bgImg from '../../assets/landing/bg/grass.png'; // 🌿 grass + city bg
import logo from '../../assets/common/logo.png';

import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isValidName(form.name)) {
      return setError('Name must be at least 3 letters (alphabets only)');
    }

    if (!isValidEmail(form.email)) {
      return setError('Please enter a valid email address');
    }

    if (!isValidPassword(form.password)) {
      return setError(
        'Password must be 8+ chars, include 1 uppercase, 1 number & 1 special character'
      );
    }

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password
      });

      setSuccess('Registration successful. You can now login.');
      toast.success('Registration successful');

      setTimeout(() => navigate('/login'), 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
     className="min-h-screen relative bg-cover bg-center md:bg-bottom flex flex-col"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
{/* 
      ================= GLASS HEADER (CLONE) =================
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/60 border-b border-white/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} className="h-9" alt="logo" />
            <span className="font-semibold text-gray-800">
              Citizen Resolution Platform
            </span>
          </div> */}
{/* 
          <nav className="hidden md:flex gap-8 items-center text-gray-700">
            <Link to="/">Home</Link>
            <Link to="/help">Help</Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg shadow hover:bg-yellow-300"
            >
              Login
            </Link>
          </nav>
        </div>
      </header> */}

      {/* ================= REGISTER CARD ================= */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="relative max-w-5xl w-full rounded-3xl bg-white/70 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.15)] overflow-hidden grid md:grid-cols-2">

          {/* LEFT IMAGE */}
         <div className="flex items-center justify-center p-6 md:p-10">
            <img src={registerImg} alt="Register" className="w-full max-w-sm" />
          </div>

          {/* RIGHT FORM */}
         <div className="p-6 md:p-10">
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-2">
              Create a New Account
            </h2>
            <p className="text-xs md:text-base text-gray-600 mb-5 md:mb-6">
              Please fill in the form below to register.
            </p>

            <form onSubmit={submit} className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg border bg-white/80"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg border bg-white/80"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg border bg-white/80 pr-14"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-sm text-blue-600"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 rounded-lg border bg-white/80 pr-14"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-3 text-sm text-blue-600"
                >
                  {showConfirm ? 'Hide' : 'Show'}
                </button>
              </div>

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg hover:opacity-90">
                Register
              </button>
            </form>

            {success && <p className="text-green-600 mt-4">{success}</p>}
            {error && <p className="text-red-600 mt-4">{error}</p>}

            <p className="text-sm text-center mt-6 text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-medium">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="text-center text-gray-600 py-6 text-sm">
        © 2026 Citizen Resolution Platform | All Rights Reserved
      </footer>

    </div>
  );
};

export default Register;
