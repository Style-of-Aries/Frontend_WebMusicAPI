import api from "./api";

export const getSongs = () =>
  api.get("/song");

export const addSong = (data) =>
  api.post("/song", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateSong = (id, data) =>
  api.put(`/song/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteSong = (id) =>
  api.delete(`/song/${id}`);