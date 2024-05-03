import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Unauthorized from "../ui/Unauthorized";

function ProtectedRoute({ children, accessRoles = [] }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const userIsAuthorized =
    isAuthenticated &&
    (!accessRoles.length || (user && accessRoles.includes(user.role)));

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!userIsAuthorized && isAuthenticated) {
    return <Unauthorized />;
  }

  return userIsAuthorized ? children : null;
}

export default ProtectedRoute;
