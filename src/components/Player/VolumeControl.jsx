import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";

export default function VolumeControl({
  volume,
  onChange,
  isMuted,
  onToggleMute,
}) {
  return (
    <div className="flex items-center justify-center">
      <button onClick={onToggleMute} className="text-white px-3 py-2 hover:text-gray-400">
        {isMuted ? <FaVolumeXmark /> : <FaVolumeHigh />}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider w-24"
        style={{
          background: `linear-gradient(to right, #22c55e ${volume * 100}%, #555 ${volume * 100}%)`,
        }}
      />
    </div>
  );
}
