// components/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AdminRoute({ children }) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <div>Đang tải...</div>; // Tránh trường hợp chưa kịp load User đã bị redirect

  if (!isAuthenticated || user?.role !== "Admin") {
    return <Navigate to="/" />; // Đẩy về trang chủ nếu không phải Admin
  }

  return children;
}