import { useState } from "react";
import { addUser, updateUser } from "../api"; // Giả định bạn có các hàm này

export default function UserModal({
  mode = "add",
  user = null,
  onClose,
  onSuccess,
}) {
  const isEdit = mode === "edit";

  // State cho các trường thông tin User
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  // const [dateOfBirth, setDateOfBirth] = useState(
  //   user?.dateOfBirth
  //     ? new Date(user.dateOfBirth).toISOString().split("T")[0]
  //     : "",
  // );
  const formatDate = (date) => {
    if (!date) return "";
    // Nếu là chuỗi, format lại. Nếu là Date object, format lại.
    return new Date(date).toISOString().split("T")[0];
  };
  const [dateOfBirth, setDateOfBirth] = useState(
    formatDate(user?.dateOfBirth) || "",
  );
  // const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || "");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [role, setRole] = useState(user?.role || "User");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation cơ bản
    if (!fullName || !email || !role) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    try {
      setLoading(true);

      const userData = {
        fullName,
        email,
        dateOfBirth,
        phoneNumber,
        role,
        // Chỉ thêm password vào object nếu là chế độ thêm mới
        ...(!isEdit && { password }),
      };

      let res;
      if (isEdit) {
        res = await updateUser(user.id, userData);
      } else {
        console.log("Data: ", userData);
        res = await addUser(userData);
        console.log("res: ", res.data);
      }

      onSuccess?.(res.data);
      onClose();
    } catch (err) {
      console.log(err);
      alert("Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[1000] isolate">
      <div className="bg-zinc-900/90 border border-zinc-700 rounded-2xl w-[420px] max-w-[95vw] max-h-[90vh] flex flex-col">
        {/* Tiêu đề cố định */}
        <div className="p-6 pb-0">
          <h2 className="text-white text-xl mb-5">
            {isEdit ? "Sửa thông tin người dùng" : "Thêm người dùng mới"}
          </h2>
        </div>
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {/* Full Name */}
          <div className="mb-3">
            <label className="text-gray-400 block mb-1">Họ và tên</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
              placeholder="Nhập họ tên đầy đủ của người dùng"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="text-gray-400 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
              placeholder="Nhập email của người dùng"
            />
          </div>
          {!isEdit && (
            <div className="mb-3">
              <label className="text-gray-400 block mb-1">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
                placeholder="Nhập mật khẩu cho người dùng"
              />
            </div>
          )}

          {/* Date of Birth */}
          <div className="mb-3">
            <label className="text-gray-400 block mb-1">Ngày sinh</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:border-blue-500 outline-none transition"
            />
            <p className="text-xs text-zinc-500 mt-1">
              Chọn ngày sinh để hệ thống xác thực tài khoản
            </p>
          </div>

          {/* Phone Number */}
          <div className="mb-3">
            <label className="text-gray-400 block mb-1">Số điện thoại</label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
              placeholder="Nhập số điện thoại của người dùng"
            />
          </div>

          {/* Role */}
          <div className="mb-5">
            <label className="text-gray-400 block mb-1">Vai trò</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>
        {/* Footer cố định */}
        <div className="p-6 pt-0 flex justify-end gap-3 border-t border-zinc-800 pt-4">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600"
            >
              Hủy
            </button>
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 disabled:opacity-50"
            >
              {loading ? "Đang lưu..." : isEdit ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
