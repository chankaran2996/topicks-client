import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { homeForRole } from './roles';

// Usage: <RequireRole roles={['admin']}><AdminDashboard /></RequireRole>
export default function RequireRole({ roles, children }) {
  const { user, checking } = useAuth();
  const location = useLocation();

  if (checking) return <div className="auth-loading">Loading…</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (!roles.includes(user.role)) return <Navigate to={homeForRole(user.role)} replace />;
  return children;
}
