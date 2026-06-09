import { login, register, getMe } from "../api";

const authService = {
  login: async (data) => {
    const res = await login(data);

    localStorage.setItem(
      "token",

      res.data.token,
    );

    return res.data;
  },

  register: async (data) => {
    const res = await register(data);
    console.log("res: ", res);
    return res.data;
  },

  logout: async () => {
    // try {
    //   await logout();
    // } finally {
    localStorage.removeItem("token");
    // }
  },

  getMe: async () => {
    const res = await getMe();

    return res.data;
  },
};

export default authService;
