import { useState } from "react";
import { addSong } from "../../../api";

export default function AddSongModal({ onClose, onSuccess }) {
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  // NEW INPUTS
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [duration, setDuration] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!audio || !image) {
      alert("Thiếu file!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("FileImage", image);
      formData.append("FileSong", audio);

      // NEW FIELDS
      formData.append("Title", title);
      formData.append("Artist", artist);
      formData.append("Duration", duration);

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
      <div className="bg-zinc-900/90 border border-zinc-700 p-6 rounded-2xl w-[420px] shadow-2xl">

        <h2 className="text-white text-xl font-semibold mb-5">
          Upload bài hát
        </h2>

        {/* TITLE */}
        <div className="mb-3">
          <label className="text-gray-400 text-sm mb-1 block">Tên bài hát</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-zinc-800 text-white outline-none"
            placeholder="Nhập tên bài hát"
          />
        </div>

        {/* ARTIST */}
        <div className="mb-3">
          <label className="text-gray-400 text-sm mb-1 block">Nghệ sĩ</label>
          <input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-zinc-800 text-white outline-none"
            placeholder="Nhập tên nghệ sĩ"
          />
        </div>

        {/* DURATION */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm mb-1 block">Thời lượng (giây)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-zinc-800 text-white outline-none"
            placeholder="Ví dụ: 180"
          />
        </div>

        {/* IMAGE */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm mb-1 block">Ảnh</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-zinc-700 file:text-white hover:file:bg-zinc-600"
          />
        </div>

        {/* AUDIO */}
        <div className="mb-5">
          <label className="text-gray-400 text-sm mb-1 block">File nhạc</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files[0])}
            className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-zinc-700 file:text-white hover:file:bg-zinc-600"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-600"
          >
            Hủy
          </button>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-400 disabled:opacity-50"
          >
            {loading ? "Đang upload..." : "Upload"}
          </button>
        </div>

      </div>
    </div>
  );
}