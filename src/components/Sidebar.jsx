// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink

const Sidebar = ({ isOpen }) => {
  // Style dùng chung cho NavLink để giữ logic active
  const linkClass = ({ isActive }) => 
    `px-4 py-3 flex items-center transition-all ${
      isActive ? "bg-gray-700 text-green-400 border-l-4 border-green-500" : "hover:bg-gray-700"
    }`;

  return (
    <aside
      className={`${isOpen ? "w-64" : "w-20"} h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col fixed shadow-xl`}
    >
      <div className="p-4 text-2xl font-bold text-center border-b border-gray-700">
        {isOpen ? "ADMIN PANEL" : "AP"}
      </div>

      <nav className="flex-1 mt-6">
        {/* Thay div bằng NavLink */}
        <NavLink to="/admin/songs" className={linkClass}>
          <span className="text-xl">🎵</span>
          {isOpen && <span className="ml-4">Quản lý bài hát</span>}
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <span className="text-xl">👤</span>
          {isOpen && <span className="ml-4">Quản lý người dùng</span>}
        </NavLink>
        <NavLink to="/" className={linkClass}>
          <span className="text-xl">👤</span>
          {isOpen && <span className="ml-4">Trang người dùng</span>}
        </NavLink>
      </nav>

      <div className="mb-24 p-4 flex justify-center">
        <button
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white transition-all rounded-full text-sm font-medium"
        >
          {isOpen ? "Logout" : "🚪"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;