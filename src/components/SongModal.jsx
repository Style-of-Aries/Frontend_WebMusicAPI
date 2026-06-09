import { useState } from "react";
import { addSong, updateSong } from "../api";

export default function SongModal({
  mode = "add",
  song = null,
  onClose,
  onSuccess,
}) {
  const isEdit = mode === "edit";

  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  const [title, setTitle] = useState(song?.title || "");
  const [artist, setArtist] = useState(song?.artist || "");
  const [duration, setDuration] = useState(song?.duration || "");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("mode: ", mode);
    // chỉ Add mới bắt buộc file
    if (!isEdit && (!audio || !image)) {
      alert("Thiếu file!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      // console.log("Id: ",song.id);
      // text fields
      formData.append("Title", title);
      formData.append("Artist", artist);

      if (duration !== "") formData.append("Duration", duration);

      // file chỉ append nếu có
      if (image) formData.append("FileImage", image);

      if (audio) formData.append("FileSong", audio);

      let res;

      if (isEdit) {
        res = await updateSong(song.id, formData);
        console.log("updateSong: ", res.data.data);
      } else {
        res = await addSong(formData);
        console.log("addSong: ", res);
      }

      onSuccess?.(res.data);

      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[1000] isolate">
      <div className="bg-zinc-900/90 border border-zinc-700 p-6 rounded-2xl w-[420px]">
        <h2 className="text-white text-xl mb-5">
          {isEdit ? "Sửa bài hát" : "Upload bài hát"}
        </h2>
        {/* title */}
        <div className="mb-3">
          <label className="text-gray-400 block mb-1">Tên bài hát</label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white"
          />
        </div>
        {/* artist */}
        <div className="mb-3">
          <label className="text-gray-400 block mb-1">Nghệ sĩ</label>

          <input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white"
          />
        </div>
        {/* duration */}
        <div className="mb-3">
          <label className="text-gray-400 block mb-1">Duration</label>

          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white"
          />
        </div>
        {/* // Ví dụ: import { Upload, Music, Image as ImageIcon } from "lucide-react"; */}
        {/* Phần hiển thị Input File tùy chỉnh */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          {/* Upload Ảnh */}
          <div>
            <label className="text-gray-400 text-sm block mb-1">Ảnh bìa</label>
            <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-green-500 transition bg-zinc-800">
              <span className="text-xs text-gray-500 text-center px-2">
                {image ? image.name : "Chọn ảnh"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>

          {/* Upload Nhạc */}
          <div>
            <label className="text-gray-400 text-sm block mb-1">
              File nhạc
            </label>
            <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-green-500 transition bg-zinc-800">
              <span className="text-xs text-gray-500 text-center px-2">
                {audio ? audio.name : "Chọn file nhạc"}
              </span>
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => setAudio(e.target.files[0])}
              />
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-zinc-700 rounded">
            Hủy
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 rounded"
          >
            {loading ? "Loading..." : isEdit ? "Save" : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
