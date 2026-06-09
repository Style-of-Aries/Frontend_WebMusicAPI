import { useState, useEffect } from "react";
import UserTable from "../components/Admin/User/ListUser";
import UserModal from "../components/UserModal";
import { getUsers, deleteUser } from "../api"; // Giả định bạn có service này

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isLoadUser, setIsLoadUser] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mode, setMode] = useState("add");

  const handleOpenAdd = () => {
    setMode("add");
    setSelectedUser(null);
    setIsModalOpen(true);
  };
  // 1. Hàm lấy danh sách User
  const fetchUsers = async () => {
    setIsLoadUser(true);
    try {
      const res = await getUsers();
      console.log("loaded user: ", res.data);
      setUsers(res.data.data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách người dùng:", err);
    } finally {
      setIsLoadUser(false);
    }
  };

  // 2. Hàm xóa User
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;

    setDeletingId(id);
    try {
      await deleteUser(id);
      fetchUsers(); // Tải lại danh sách sau khi xóa thành công
    } catch (err) {
      console.error("Chi tiết lỗi:", err); // Dùng biến err ở đây
      alert("Xóa thất bại!");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Quản lý người dùng</h1>
        {/* Có thể thêm nút "Thêm mới" ở đây */}
        <button
          onClick={handleOpenAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
        >
          + Thêm bài hát
        </button>
      </div>

      <UserTable
        users={users}
        isLoadUser={isLoadUser}
        onDelete={handleDelete}
        deletingId={deletingId}
        handleReloadUsers={fetchUsers}
      />

      {isModalOpen && (
        <UserModal
          mode={mode}
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            fetchUsers();
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
