import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../services/auth.service';

import loginImg from '../../assets/common/login.png';
import bgImg from '../../assets/landing/bg/grass.png';

import { useSearchParams, useNavigate, Link } from 'react-router-dom';

import {
  isValidEmail,
  isValidPassword
} from '../../utils/validators';

import toast from 'react-hot-toast';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [params] = useSearchParams();
  const expired = params.get('expired');

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(form.email)) {
      return setError('Please enter a valid email address');
    }

    if (!isValidPassword(form.password)) {
      return setError(
        'Password must be 8+ chars, include 1 uppercase, 1 number & 1 special character'
      );
    }

    try {
      setLoading(true);

      const response = await loginUser(
        form.email,
        form.password
      );

      console.log("LOGIN RESPONSE →", response.data);

      const token = response.data.token;
      const user = response.data.user;

      if (!token) {
        throw new Error('Token missing from backend');
      }

      login(user, token);

      toast.success('Login successful');

      const role = user.role;

      if (role === 'CITIZEN') {
        navigate('/citizen/dashboard');
      } 
      else if (role === 'STAFF') {
        navigate('/staff/dashboard');
      } 
      else if (role === 'ADMIN') {
        navigate('/admin/dashboard');
      }

    } catch (err) {

      console.error("LOGIN ERROR →", err);

      const msg =
        err.response?.data?.message ||
        err.message ||
        'Invalid email or password';

      setError(msg);
      toast.error(msg);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center md:bg-bottom flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bgImg})` }}
    >

     <div className="
flex 
flex-col 
md:flex-row 
w-full 
max-w-5xl 
items-center 
justify-center 
gap-10
">

  {/* IMAGE */}
  <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
    <img 
      src={loginImg} 
      alt="Login" 
      className="w-60 md:w-full max-w-sm drop-shadow-xl"
    />
  </div>

  <div className="
w-[92%]
md:w-1/2 
bg-white/90
backdrop-blur-lg
rounded-2xl
shadow-xl
p-6 
md:p-10
mx-auto
mt-2
">
         <h2 className="text-xl md:text-3xl font-bold mb-2 text-gray-800">
            Welcome Back
          </h2>

          <p className="text-xs md:text-base text-gray-600 mb-5 md:mb-6">
            Login to continue to your dashboard
          </p>

          {expired && (
            <p className="text-red-600 mb-4 text-sm">
              Session expired. Please login again.
            </p>
          )}

          <form onSubmit={submit} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg border bg-white/80"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
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

            {/* ✅ FORGOT PASSWORD LINK (ONLY ADDITION) */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold shadow-lg bg-gradient-to-r from-blue-600 to-blue-500"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {error && (
              <p className="text-red-600 text-sm">
                {error}
              </p>
            )}

          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
