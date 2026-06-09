import {
  FaPlay,
  FaPause,
  FaBackwardStep,
  FaForwardStep,
  FaRepeat,
  FaShuffle,
} from "react-icons/fa6";
import usePlayer from "../../hooks/usePlayer";

export default function PlayerControl() {
  const {
    currentSong,
    isPlaying,
    isRepeating,
    isShuffle,
    currentTime,
    duration,

    togglePlay,
    nextSong,
    prevSong,
    toggleRepeat,
    setIsShuffle,
    seek,
    formatTime,
  } = usePlayer();

  return (
    <div className="flex flex-col items-center">
      {/* CONTROL BUTTONS */}
      <div className="flex items-center gap-5">
        <button
          onClick={toggleRepeat}
          className="text-gray-300 hover:text-white transition"
        >
          <FaRepeat className={isRepeating ? "text-green-500" : ""} />
        </button>

        <button
          onClick={prevSong}
          className="text-gray-300 hover:text-white transition"
        >
          <FaBackwardStep />
        </button>

        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-black shadow-lg hover:scale-110 active:scale-95 transition"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button
          onClick={nextSong}
          className="text-gray-300 hover:text-white transition"
        >
          <FaForwardStep />
        </button>

        <button
          onClick={() => setIsShuffle(!isShuffle)}
          className="text-gray-300 hover:text-white transition"
        >
          <FaShuffle className={isShuffle ? "text-green-500" : ""} />
        </button>
      </div>

      {/* PROGRESS BAR */}
      {currentSong && (
        <div className="w-full flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-400">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.01"
            value={currentTime || 0}
            onChange={(e) => seek(Number(e.target.value))}
            className="slider w-full"
            style={{
              background: `linear-gradient(
      to right,
      #22c55e ${(currentTime / duration) * 100}%,
      #555 ${(currentTime / duration) * 100}%
    )`,
            }}
          />

          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      )}
    </div>
  );
}
