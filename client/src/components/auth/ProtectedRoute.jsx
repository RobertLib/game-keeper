import { Navigate } from "react-router-dom";
import { useSession } from "../../contexts/session";

/**
 * @typedef Props
 * @property {React.ReactNode} children
 * @property {string} [role]
 * @param {Props} props
 */
function ProtectedRoute({ children, role }) {
  const { currentUser } = useSession();

  if (!currentUser || (role && currentUser.role !== role)) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
