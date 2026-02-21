import api from './api';

// send reset link
export const forgotPassword = (email) => {
  return api.post('/password/forgot', { email });
};

// reset password
export const resetPassword = (token, password) => {
  return api.post(`/password/reset/${token}`, { password });
};
