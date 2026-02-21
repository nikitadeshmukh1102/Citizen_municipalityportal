import api from './api';

export const loginUser = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const registerUser = (data) => {
  return api.post('/auth/register', data);
};

/* ✅ FORGOT PASSWORD */
export const forgotPassword = (email) => {
  return api.post('/password/forgot', { email });
};

/* ✅ RESET PASSWORD */
export const resetPassword = (token, newPassword) => {
  return api.post('/password/reset', {
    token,
    newPassword
  });
};
