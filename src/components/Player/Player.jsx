import ProgressBar from "./ProgressBar";
import PlayerControls from "./PlayerControls";
import VolumeControl from "./VolumeControl";

export default function Player({
  currentSong,
  isPlaying,
  currentTime,
  duration,
  onPlay,
  onNext,
  onPrev,
  onSeek,
  volume,
  handleVolume,
  isMuted,
  toggleMute,
}) {
  if (!currentSong) return null;

  return (
    <div className="text-center">
      <img src={currentSong.image} className="w-60 mx-auto rounded-full" />

      <h2>{currentSong.name}</h2>

      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onSeek={onSeek}
      />

      <PlayerControls
        isPlaying={isPlaying}
        onPlay={onPlay}
        onNext={onNext}
        onPrev={onPrev}
      />

      <VolumeControl
        volume={volume}
        onChange={handleVolume}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />
    </div>
  );
}
