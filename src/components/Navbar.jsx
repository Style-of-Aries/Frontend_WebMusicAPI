// Ví dụ tại src/components/Navbar.jsx
import { useState } from "react";
import LoginModal from "./LoginModal";
import useAuth from "../hooks/useAuth";
import ConfirmModal from "./ConfirmModal"; // Import component vừa tạo
import { NavLink } from "react-router-dom"; // Import component vừa tạo

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false); // State cho modal xác nhận
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsLogoutConfirmOpen(false);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-black text-white">
      <h1 className="text-xl font-bold">My Music App</h1>

      {/* Nút bấm để mở Modal */}
      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          {/* Thêm điều kiện kiểm tra role Admin */}
          {user?.role === "Admin" && (
            <NavLink
              to="/admin"
              className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500 transition"
            >
              Trang quản trị
            </NavLink>
          )}

          <span>
            Xin chào, <b>{user?.fullName}</b>
          </span>

          <button
            onClick={() => setIsLogoutConfirmOpen(true)}
            className="px-3 py-1 bg-red-500 rounded hover:bg-red-400 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 rounded-full text-black font-semibold"
        >
          Đăng nhập
        </button>
      )}

      {/* Điều kiện để hiển thị Modal */}
      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
      {/* Hiển thị Modal xác nhận */}
      {isLogoutConfirmOpen && (
        <ConfirmModal
          title="Đăng xuất?"
          message="Bạn có chắc chắn muốn thoát khỏi tài khoản không?"
          onClose={() => setIsLogoutConfirmOpen(false)}
          onConfirm={handleLogout}
        />
      )}
    </nav>
  );
}
