import { useState } from "react";
import SongModal from "../../SongModal";
import LoadingSpinner from "../../LoadingSpinner"; // Import component vừa tạo

export default function SongTable({
  songs,
  onSelect,
  currentSong,
  formatTime,
  onDelete,
  deletingId,
  handleReloadSongs,
  isLoadSong, // Prop này xác định trạng thái đang tải
}) {
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <div className="w-full overflow-x-auto rounded-md border border-zinc-800 text-base">
      {/* EDIT MODAL */}
      {selectedSong && (
        <SongModal
          mode="edit"
          song={selectedSong}
          onClose={() => setSelectedSong(null)}
          onSuccess={() => {
            handleReloadSongs();
            setSelectedSong(null);
          }}
        />
      )}

      {/* Logic hiển thị: Nếu đang load thì hiện Spinner, nếu không thì hiện bảng */}
      {isLoadSong ? (
        <LoadingSpinner />
      ) : songs.length === 0 ? (
        <div className="p-10 text-center text-gray-400">
          Không có bài hát nào.
        </div>
      ) : (
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="text-black border-b border-zinc-800">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Bài hát</th>
              <th className="py-3 px-4">Ca sĩ</th>
              <th className="py-3 px-4">Thời lượng</th>
              <th className="py-3 px-4">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {songs.map((song, index) => (
              <tr
                key={song.id}
                onClick={() => onSelect(song, index)}
                className={`border-b border-zinc-900 cursor-pointer transition hover:bg-zinc-200 ${currentSong?.id === song.id ? "bg-zinc-800 text-green-400" : ""}`}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={song.fileImage}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <span className="truncate max-w-[200px]">{song.title}</span>
                </td>
                <td className="py-3 px-4">{song.artist}</td>
                <td className="py-3 px-4">{formatTime(song.duration)}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSong(song);
                      }}
                      className="bg-blue-500 px-5 py-2 rounded-md text-white text-xs hover:bg-blue-400 transition-colors"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(song.id);
                      }}
                      disabled={deletingId === song.id}
                      className="bg-red-500 px-5 py-2 rounded-md text-white text-xs hover:bg-red-400 transition-colors disabled:opacity-50"
                    >
                      {deletingId === song.id ? "Đang xóa..." : "Xóa"}
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
