import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

export default function LoginModal({ onClose }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Group state lại để code gọn hơn
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Reset error khi đổi mode
  useEffect(() => {
    setError("");
  }, [mode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        if (mode === "register") {
          if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu không khớp"); // Set trực tiếp luôn
            setLoading(false);
            return; // Dừng lại, không chạy xuống dưới
          }
        }
        await register({
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        await login({ email: formData.email, password: formData.password });
      }
      // onClose();
    } catch (err) {
      const serverError = err.response?.data;

      // Thứ tự ưu tiên hiển thị lỗi:
      // 1. Lỗi message chung (nếu có)
      // 2. Lỗi chi tiết (nếu có)
      // 3. Fallback message mặc định
      const errorMessage =
        serverError?.message ||
        serverError?.errors?.Password ||
        "Có lỗi xảy ra, vui lòng thử lại sau";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000] isolate p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl w-full max-w-sm relative shadow-2xl border border-zinc-800"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          {mode === "login" ? "Đăng nhập" : "Đăng ký tài khoản"}
        </h2>

        {mode === "register" && (
          <input
            name="name"
            placeholder="Họ và tên"
            required
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 bg-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-white"
          />
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 bg-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-white"
        />
        <input
          name="password"
          type="password"
          placeholder="Mật khẩu"
          required
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 bg-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-white"
        />

        {mode === "register" && (
          <input
            name="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu"
            required
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 bg-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-white"
          />
        )}

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center bg-red-400/10 p-2 rounded">
            {error}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full py-3 bg-green-500 text-black rounded-xl font-bold hover:bg-green-400 transition disabled:opacity-50"
        >
          {loading
            ? "Đang xử lý..."
            : mode === "login"
              ? "Đăng nhập"
              : "Đăng ký"}
        </button>

        <p className="text-sm text-center text-gray-400 mt-4">
          {mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
          <span
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-green-400 cursor-pointer font-semibold"
          >
            {mode === "login" ? "Đăng ký ngay" : "Đăng nhập ngay"}
          </span>
        </p>
      </form>
    </div>
  );
}
