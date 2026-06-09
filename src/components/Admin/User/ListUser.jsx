import { useState } from "react";
import UserModal from "../../UserModal";
import LoadingSpinner from "../../LoadingSpinner";

export default function UserTable({
  users,
  onDelete,
  deletingId,
  handleReloadUsers,
  isLoadUser,
}) {
  const [selectedUser, setSelectedUser] = useState(null);

  // Hàm format ngày tháng đơn giản (tùy chỉnh theo nhu cầu)
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <div className="w-full overflow-x-auto rounded-md border border-zinc-800 text-base">
      {/* EDIT MODAL */}
      {selectedUser && (
        <UserModal
          mode="edit"
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSuccess={() => {
            handleReloadUsers();
            setSelectedUser(null);
          }}
        />
      )}

      {/* Logic hiển thị */}
      {isLoadUser ? (
        <LoadingSpinner />
      ) : users.length === 0 ? (
        <div className="p-10 text-center text-gray-400">
          Không có người dùng nào.
        </div>
      ) : (
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="text-black border-b border-zinc-800">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Họ và tên</th>
              <th className="py-3 px-4">Ngày sinh</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Số điện thoại</th>
              <th className="py-3 px-4">Vai trò</th>
              <th className="py-3 px-4">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-zinc-900 transition hover:bg-zinc-200"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 font-medium">{user.fullName}</td>
                <td className="py-3 px-4">{formatDate(user.dateOfBirth)}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.phoneNumber || "N/A"}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="bg-blue-500 px-5 py-2 rounded-md text-white text-xs hover:bg-blue-400 transition-colors"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      disabled={deletingId === user.id}
                      className="bg-red-500 px-5 py-2 rounded-md text-white text-xs hover:bg-red-400 transition-colors disabled:opacity-50"
                    >
                      {deletingId === user.id ? "Đang xóa..." : "Xóa"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}