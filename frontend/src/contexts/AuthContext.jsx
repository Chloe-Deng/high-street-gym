import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  login as apiLogin,
  logout as apiLogout,
  getByAuthenticationKey,
} from "../services/apiUsers";

const AuthContext = createContext();

// 定义初始状态
const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
};

// 定义reducer函数处理action
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// 创建提供者组件
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState,
  );

  useEffect(() => {
    const authenticationKey = localStorage.getItem("authenticationKey");
    if (authenticationKey) {
      getByAuthenticationKey(authenticationKey)
        .then((user) => {
          dispatch({ type: "LOGIN", payload: user });
        })
        .catch(() => {
          localStorage.removeItem("authenticationKey"); // 清除无效的认证密钥
        });
    }
  }, []);

  // 登录
  const login = async (email, password) => {
    const { user, authenticationKey } = await apiLogin(email, password);
    console.log(user);
    localStorage.setItem("authenticationKey", authenticationKey);
    dispatch({ type: "LOGIN", payload: user });
  };

  // 登出
  const logout = async () => {
    if (user && user.authenticationKey) {
      await apiLogout(user.authenticationKey);
    }
    localStorage.removeItem("authenticationKey");
    dispatch({ type: "LOGOUT" });
  };

  // 返回上下文提供者
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 自定义Hook
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
