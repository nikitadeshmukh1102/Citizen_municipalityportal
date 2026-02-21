import { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';

function App() {

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('crp_theme') === 'dark';
  });

  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('crp_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('crp_theme', 'light');
    }

  }, [darkMode]);

  return (
    <>
      {/* ✅ FIXED TOGGLE BUTTON */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-2 rounded-full text-sm shadow-lg dark:bg-white dark:text-black"
      >
        {darkMode ? '☀ Light' : '🌙 Dark'}
      </button>

      <AppRoutes />
    </>
  );
}

export default App;
