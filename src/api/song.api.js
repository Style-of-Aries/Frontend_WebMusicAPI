import api from "./api";

export const getSongs = () => api.get("/songsNew");
export const addSong = (data) => 
  api.post("/addSong", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const deleteSong = (id) => api.delete(`/deleteSong/${id}`);