import api from "./api";

export const getUsers = () => api.get("/user");

export const addUser = (data) => api.post("/user", data);

export const updateUser = (id, data) => api.put(`/user/${id}`, data);

export const deleteUser = (id) => api.delete(`/user/${id}`);
