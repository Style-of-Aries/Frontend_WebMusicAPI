import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function LoginModal({ onClose }) {
  const { handleLogin, handleRegister } = useAuth();

  const [mode, setMode] = useState("login"); // login | register
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    setError("");

    try {
      setLoading(true);

      if (mode === "login") {
        await handleLogin({ email, password });
      } else {
        if (password !== confirmPassword) {
          setError("Mật khẩu không khớp");
          return;
        }

        await handleRegister({
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        });
      }

      onClose(); // chỉ đóng khi thành công
    } catch (err) {
      setError(err.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-8 rounded-2xl w-96 relative shadow-xl">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === "login" ? "🔐 Đăng nhập" : "📝 Đăng ký"}
        </h2>

        {/* NAME (REGISTER ONLY) */}
        {mode === "register" && (
          <input
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 px-4 py-2 bg-zinc-800 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          />
        )}

        {/* EMAIL */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-zinc-800 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* PASSWORD */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          className="w-full mb-4 px-4 py-2 bg-zinc-800 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* CONFIRM PASSWORD (REGISTER ONLY) */}
        {mode === "register" && (
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Nhập lại mật khẩu"
            className="w-full mb-4 px-4 py-2 bg-zinc-800 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
          />
        )}

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* SWITCH MODE */}
        <p className="text-sm text-center text-gray-400 mb-4">
          {mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
          <span
            onClick={() =>
              setMode(mode === "login" ? "register" : "login")
            }
            className="text-green-400 cursor-pointer ml-1"
          >
            {mode === "login" ? "Đăng ký" : "Đăng nhập"}
          </span>
        </p>

        {/* BUTTON */}
        <button
          onClick={onSubmit}
          disabled={loading}
          className="w-full py-2 bg-green-500 text-black rounded-lg font-semibold hover:scale-105 transition disabled:opacity-50"
        >
          {loading
            ? "Đang xử lý..."
            : mode === "login"
            ? "Đăng nhập"
            : "Đăng ký"}
        </button>
      </div>
    </div>
  );
}