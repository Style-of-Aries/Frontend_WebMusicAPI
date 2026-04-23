export default function Sidebar({
  songs,
  search,
  setSearch,
  onSelect,
  currentSong,
}) {
  const filtered = songs.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-80 pb-20 bg-zinc-900 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">🎵 Playlist</h2>
      <div className="relative w-full">
        <input
          className="w-full pl-10 pr-4 py-2 rounded-full bg-zinc-800 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          placeholder="Tìm bài hát..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
          🔍
        </span>
      </div>
      <div className="space-y-2">
        {filtered.map((song, index) => (
          <div
            key={song.id}
            onClick={() => onSelect(song, index)}
            className={`p-3 rounded-lg cursor-pointer transition
                hover:bg-zinc-700 ${
              currentSong?.id === song.id ? "text-green-400" : ""
            }`}
          >
            🎧 {song.title}
          </div>
        ))}
      </div>
    </div>
  );
}
