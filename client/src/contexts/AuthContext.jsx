import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";

function getStoredUser() {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if (!token || !userData) {
    return null;
  }

  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error("Error parsing user data:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const navigate = useNavigate();

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const value = {
    user,
    loading: false,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
