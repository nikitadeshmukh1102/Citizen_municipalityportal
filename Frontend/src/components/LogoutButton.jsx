import { useAuth } from '../context/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={() => logout()}
      className="text-sm text-red-600 hover:underline"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
