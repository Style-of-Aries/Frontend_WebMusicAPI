import { useEffect, useState } from "react";
import SongModal from "../components/SongModal";
import usePlayer from "../hooks/usePlayer";
import ListSong from "../components/Admin/Song/List"; // Component chứa bảng của bạn
// import { getSongs } from "../api";

export default function SongManagement() {
  const player = usePlayer();
  // const [songs, setSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [mode, setMode] = useState("add");
  // const [isLoading, setIsLoading] = useState(false);
  // const BASE_URL = import.meta.env.VITE_API_URL;
  // const songs = player.songs;
  // const isLoading = player.isLoading;
  // const [deletingId, setDeletingId] = useState(null);

  const handleOpenAdd = () => {
    setMode("add");
    setSelectedSong(null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    // Chỉ fetch nếu chưa có dữ liệu hoặc bạn muốn refresh
    if (player.songs.length === 0) {
      player.handleReloadSongs();
    }
  }, []);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Quản lý bài hát</h2>
        <button
          onClick={handleOpenAdd}
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
        >
          + Thêm bài hát
        </button>
      </div>

      <ListSong
        songs={player.songs}
        onSelect={player.handleSelectSong}
        currentSong={player.currentSong}
        formatTime={player.formatTime}
        onDelete={player.handleDelete}
        handleReloadSongs={player.handleReloadSongs}
        // onEdit={handleOpenEdit} // Truyền hàm edit xuống
        deletingId={player.deletingId}
        isLoadSong={player.isLoading}
      />

      {isModalOpen && (
        <SongModal
          mode={mode}
          song={selectedSong}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            player.handleReloadSongs();
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
