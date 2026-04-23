// hooks/useAuth.js
import { login, register } from "../api";

export const useAuth = () => {
  const handleLogin = async (data) => {
    console.log(data);
    try {
      const res = await login(data);
      localStorage.setItem("token", res.data.token);
      console.log(res);
      return res.data;
    } catch (err) {
      console.log("API ERROR:", err.response?.data);
      throw err; // 🔥 QUAN TRỌNG
    }
  };
  const handleRegister = async (data) => {
    console.log(data);
    try {
      const res = await register(data);
    //   localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (err) {
      console.log("API ERROR:", err.response?.data);
      throw err; // 🔥 QUAN TRỌNG
    }
  };

  return { handleLogin , handleRegister };
};
