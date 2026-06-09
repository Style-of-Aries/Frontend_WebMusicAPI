import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import SongManagement from "./pages/SongManagement";
import UserManagement from "./pages/UserManagement"; // Trang bạn mới tạo
import HomePage from "./pages/Home"; // Trang bạn mới tạo
import AdminRoute from "./components/AdminRoute"; // Trang bạn mới tạo

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <UserLayout>
              <HomePage />
            </UserLayout>
          }
        />

        {/* Admin Routes - Bảo vệ bằng AdminRoute */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* Dùng Nested Routes ở đây */}
          <Route path="songs" element={<SongManagement />} />
          <Route path="users" element={<UserManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
