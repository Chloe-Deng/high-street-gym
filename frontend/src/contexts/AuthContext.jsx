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
  authenticationKey: null,
};

// 定义reducer函数处理action
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        authenticationKey: action.payload.authenticationKey,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        authenticationKey: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// 创建提供者组件
function AuthProvider({ children }) {
  const [{ user, isAuthenticated, authenticationKey }, dispatch] = useReducer(
    authReducer,
    initialState,
  );

  useEffect(() => {
    const initAuthentication = async () => {
      const authenticationKey = localStorage.getItem("authenticationKey");
      if (authenticationKey) {
        try {
          const user = await getByAuthenticationKey(authenticationKey);
          dispatch({ type: "LOGIN", payload: { user, authenticationKey } });
        } catch (error) {
          console.error("Error fetching user by authentication key:", error);
          localStorage.removeItem("authenticationKey"); // Clear the invalid auth key
          dispatch({ type: "LOGOUT" });
        }
      }
    };

    initAuthentication();
  }, []);

  const login = async (email, password) => {
    try {
      const { user, authenticationKey } = await apiLogin(email, password);
      // console.log(user);

      if (!user || !authenticationKey) {
        throw new Error("Authentication failed");
      }

      localStorage.setItem("authenticationKey", authenticationKey);
      localStorage.setItem("userID", user.id); // Assume user always has an ID

      dispatch({ type: "LOGIN", payload: { user, authenticationKey } });
    } catch (error) {
      console.error("Login error:", error.message);
      // Handle login error, such as displaying a message to the user
    }
  };

  const logout = async () => {
    try {
      if (user && authenticationKey) {
        await apiLogout(authenticationKey);
      }

      localStorage.removeItem("authenticationKey");
      localStorage.removeItem("userID");
      // sessionStorage.clear();

      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // 返回上下文提供者
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, authenticationKey, login, logout }}
    >
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
