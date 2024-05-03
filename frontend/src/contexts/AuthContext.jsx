import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  login as apiLogin,
  logout as apiLogout,
  getByAuthenticationKey,
} from "../services/apiUsers";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  authenticationKey: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        authenticationKey: action.payload.authenticationKey,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
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

  const updateUserProfile = (updatedUser) => {
    dispatch({ type: "UPDATE_USER", payload: updatedUser });
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        authenticationKey,
        login,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
