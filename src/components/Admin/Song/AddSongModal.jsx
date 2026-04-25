import { useState } from "react";
import { addSong } from "../../../api";

export default function AddSongModal({ onClose, onSuccess }) {
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!audio || !image) {
      alert("Thiếu file!");
      return;
    }

    console.log("file nhạc:", audio);
    console.log("file ảnh:", image);

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("music", audio);

      const res = await addSong(formData);

      onSuccess?.(res.data);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div
        className="bg-zinc-900/90 border border-zinc-700 
    p-6 rounded-2xl w-[420px] shadow-2xl
    transition-all duration-300 scale-100"
      >
        {/* Title */}
        <h2 className="text-white text-xl font-semibold mb-5">
          Upload bài hát
        </h2>

        {/* Image */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm mb-1 block">Ảnh</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm text-gray-300
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-medium
        file:bg-zinc-700 file:text-white
        hover:file:bg-zinc-600
        transition"
          />
        </div>

        {/* Audio */}
        <div className="mb-5">
          <label className="text-gray-400 text-sm mb-1 block">File nhạc</label>

          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files[0])}
            className="w-full text-sm text-gray-300
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-medium
        file:bg-zinc-700 file:text-white
        hover:file:bg-zinc-600
        transition"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm
        bg-zinc-700 text-white
        hover:bg-zinc-600
        transition-colors duration-200"
          >
            Hủy
          </button>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-4 py-2 rounded-md text-sm font-medium
        bg-green-500 text-white
        hover:bg-green-400 hover:scale-105 active:scale-95
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Đang upload..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
