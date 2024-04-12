import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Unauthorized from "../ui/Unauthorized";

function ProtectedRoute({ children, accessRoles = [] }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // 检查用户是否有权限访问此路由
  const userIsAuthorized =
    isAuthenticated &&
    (!accessRoles.length || (user && accessRoles.includes(user.role)));

  useEffect(() => {
    // 如果用户未登录，则重定向到登录页面
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // 如果用户没有权限，则显示没有授权的消息
  if (!userIsAuthorized && isAuthenticated) {
    return <Unauthorized />;
  }

  // 如果用户有权限，则渲染children
  return userIsAuthorized ? children : null;
}

export default ProtectedRoute;
