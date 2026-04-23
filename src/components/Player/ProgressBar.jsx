
export default function ProgressBar({ currentTime, duration, onSeek }) {
  return (
    <input
      type="range"
      min="0"
      max={duration || 0}
      value={currentTime || 0}
      onChange={(e) => onSeek(Number(e.target.value))}
      className="w-full h-1 accent-green-500 cursor-pointer"
    />
  );
}