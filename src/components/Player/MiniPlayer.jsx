import {
  FaPlay,
  FaPause,
  FaBackwardStep,
  FaForwardStep,
  FaRepeat,
  FaShuffle,
  FaVolumeHigh,
  FaVolumeXmark,
} from "react-icons/fa6";
import usePlayerContext from "../../hooks/usePlayerContext";
import VolumeControl from "./VolumeControl";
import PlayerControl from "./PlayerControls";

export default function MiniPlayer() {
  const player = usePlayerContext();

  const {
    currentSong,
    isPlaying,
    isRepeating,
    isShuffle,
    currentTime,
    duration,
    volume,
    isMuted,

    togglePlay,
    nextSong,
    prevSong,
    toggleRepeat,
    setIsShuffle,
    toggleMute,
    handleVolume,
    seek,
    formatTime,
  } = player;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900/80 backdrop-blur-lg border-t border-white/10 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="w-1/3 overflow-hidden">
          {currentSong ? (
            <div className="flex items-center gap-4">
              <img
                src={currentSong.image}
                className={`w-14 h-14 rounded-full object-cover border-2 border-zinc-400 ${
                  isPlaying ? "animate-spin [animation-duration:8s]" : ""
                }`}
              />
              <div>
                <h2 className="text-sm font-bold truncate">
                  {currentSong.title}
                </h2>
                <p className="text-xs text-zinc-400 truncate">
                  {currentSong.all_artist}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">Chọn bài 🎵</p>
          )}
        </div>

        {/* CENTER */}
        <div className="w-1/3">
          <PlayerControl
            currentSong={currentSong}
            isPlaying={isPlaying}
            isRepeating={isRepeating}
            isShuffle={isShuffle}
            currentTime={currentTime}
            duration={duration}
            togglePlay={togglePlay}
            nextSong={nextSong}
            prevSong={prevSong}
            toggleRepeat={toggleRepeat}
            setIsShuffle={setIsShuffle}
            seek={seek}
            formatTime={formatTime}
          />
        </div>

        {/* RIGHT */}
        <div className="w-1/3 flex justify-end items-center gap-3">
          <VolumeControl
            volume={volume}
            onChange={handleVolume}
            isMuted={isMuted}
            onToggleMute={toggleMute}
          />
        </div>
      </div>
    </div>
  );
}
