// src/pages/HomePage.jsx
import { useEffect, useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
// import useAuth from "../hooks/useAuth";

export default function HomePage() {
  const player = useContext(PlayerContext);
  // const { isAuthenticated, user, logout } = useAuth();
  useEffect(() => {
    // Chỉ fetch nếu chưa có dữ liệu hoặc bạn muốn refresh
    if (player.songs.length === 0) {
      player.handleReloadSongs();
    }
  }, []);
  return (
    <div>
      {/* <div className="flex justify-between items-center p-4 border-b border-zinc-800">
        <h1 className="text-xl font-bold">🎧 Spotify Clone</h1>

        {!isAuthenticated ? (
          <button
            onClick={openLogin}
            className="px-4 py-2 bg-green-500 text-black rounded-full"
          >
            Đăng nhập
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span>
              Xin chào,
              <b>{user?.fullName}</b>
            </span>

            <button onClick={logout} className="px-3 py-1 bg-red-500 rounded">
              Logout
            </button>
          </div>
        )}
      </div> */}
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {player.songs.map((song, index) => (
          <div
            key={song.id}
            onClick={() => player.handleSelectSong(song, index)}
            className="bg-gray-900 p-4 rounded-xl hover:bg-gray-800 transition duration-300 group cursor-pointer"
          >
            <img
              src={song.fileImage}
              className="w-full aspect-square rounded-lg shadow-lg mb-4"
            />
            <h3 className="font-bold truncate">{song.title}</h3>
            <p className="text-gray-400 text-sm">Artist Name</p>
          </div>
        ))}
      </div>
    </div>
  );
}
