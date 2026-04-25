import Sidebar from "../components/Sidebar";
import usePlayerContext from "../hooks/usePlayerContext";
import MiniPlayer from "../components/Player/MiniPlayer";
import ListSong from "../components/Admin/Song/List";

export default function Home({ openLogin }) {
  const player = usePlayerContext();

  const formatTime = (t) => {
    if (!t) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const filteredSongs = player.songs.filter((song) =>
    song.title.toLowerCase().includes(player.search.toLowerCase()),
  );

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar
        songs={filteredSongs}
        search={player.search}
        setSearch={player.setSearch}
        onSelect={player.handleSelectSong}
        currentSong={player.currentSong}
      />

      <div className="flex-1 flex flex-col justify-start items-center pb-20">
        <div className="flex justify-between items-center p-4 border-b border-zinc-800">
          <h1 className="text-xl font-bold">🎧 Spotify Clone</h1>

          <button
            onClick={openLogin}
            className="px-4 py-2 bg-green-500 text-black rounded-full font-semibold hover:scale-105 transition"
          >
            Đăng nhập
          </button>
        </div>
        <ListSong
          songs={filteredSongs}
          onSelect={player.handleSelectSong}
          currentSong={player.currentSong}
          formatTime={formatTime}
          onDelete={player.handleDelete}
          deletingId={player.deletingId}
          handleReloadSongs={player.handleReloadSongs}
        />
      </div>

      <MiniPlayer />
    </div>
  );
}
