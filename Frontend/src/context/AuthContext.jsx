import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('crp_user'));
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(
    localStorage.getItem('crp_token')
  );

  const [forcePasswordChange, setForcePasswordChange] = useState(
    JSON.parse(localStorage.getItem('crp_force_pwd')) || false
  );


  useEffect(() => {
    const storedUser = localStorage.getItem('crp_user');
    const storedToken = localStorage.getItem('crp_token');

    if (storedToken && !storedUser) {
      localStorage.clear();
      setUser(null);
      setToken(null);
    }
  }, []);

  const login = (userData, jwtToken) => {

    localStorage.setItem('crp_user', JSON.stringify(userData));
    localStorage.setItem('crp_token', jwtToken);

    if (userData.forcePasswordChange) {
      localStorage.setItem('crp_force_pwd', true);
      setForcePasswordChange(true);
    } else {
      localStorage.removeItem('crp_force_pwd');
      setForcePasswordChange(false);
    }

    setUser(userData);
    setToken(jwtToken);
  };

  const logout = (reason = null) => {

    localStorage.clear();

    setUser(null);
    setToken(null);
    setForcePasswordChange(false);

    if (reason === 'expired') {
      window.location.href = '/login?expired=true';
    } else {
      window.location.href = '/login';
    }
  };

  const resetForcePasswordChange = () => {
    localStorage.removeItem('crp_force_pwd');
    setForcePasswordChange(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        forcePasswordChange,
        resetForcePasswordChange
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);