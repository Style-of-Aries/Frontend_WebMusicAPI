import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import authService from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const login = async (data) => {
    const result = await authService.login(data);
    console.log("result: ", result);
    await loadCurrentUser();
    console.log("Logged in user:", result);
    return result;
  };

  const register = async (data) => {
    console.log("Data: ", data);
    const result = await authService.register(data);
    console.log(result.token);
    // await loadCurrentUser();
    return result;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  const loadCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);

        return;
      }
      console.log("token: ", token);
      const decoded = jwtDecode(token);
      console.log("Current user:", decoded);
      setUser({
        id: decoded.nameid, // Tên field phụ thuộc vào cách bạn đặt trong backend
        fullName: decoded.name,
        email: decoded.email,
        role: decoded.role,
      });
    } catch (err) {
      console.error("Token không hợp lệ:", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,

        loading,

        login,

        register,

        logout,

        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}