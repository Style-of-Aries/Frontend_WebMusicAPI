import { useState } from "react";
import AddSongModal from "./AddSongModal";
export default function SongTable({
  songs,
  onSelect,
  currentSong,
  formatTime,
  onDelete,
  deletingId,
  handleReloadSongs,
}) {
  const [openUpload, setOpenUpload] = useState(false);
  return (
    <div className="w-full overflow-x-auto">
      <button
        onClick={() => setOpenUpload(true)}
        className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-400"
      >
        + Thêm bài hát
      </button>

      {openUpload && (
        <AddSongModal
          onClose={() => setOpenUpload(false)}
          onSuccess={handleReloadSongs}
        />
      )}
      <table className="w-full text-left text-sm text-gray-300">
        {/* HEADER */}
        <thead className="text-gray-400 border-b border-zinc-800">
          <tr>
            <th className="py-3 px-4">#</th>
            <th className="py-3 px-4">Bài hát</th>
            <th className="py-3 px-4">Ca sĩ</th>
            <th className="py-3 px-4">Thời lượng</th>
            <th className="py-3 px-4">Hành động</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {songs.map((song, index) => (
            <tr
              key={song.id}
              onClick={() => onSelect(song, index)}
              className={`
                border-b border-zinc-900 cursor-pointer transition
                hover:bg-zinc-800
                ${currentSong?.id === song.id ? "bg-zinc-800 text-green-400" : ""}
              `}
            >
              <td className="py-3 px-4">{index + 1}</td>

              <td className="py-3 px-4 flex items-center gap-3">
                <img
                  src={song.image}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <span className="truncate max-w-[200px]">{song.title}</span>
              </td>

              <td className="py-3 px-4">{song.all_artist}</td>

              <td className="py-3 px-4 text-gray-400">
                {formatTime(song.duration)}
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(song.id);
                  }}
                  disabled={deletingId === song.id}
                  className="bg-red-500 px-5 py-2 rounded-md text-white text-xs
                            hover:bg-red-400
                            transition-colors duration-200
                            disabled:opacity-50"
                >
                  {deletingId === song.id ? "Đang xóa..." : "Xóa"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
