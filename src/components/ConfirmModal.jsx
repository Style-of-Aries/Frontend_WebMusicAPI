export default function ConfirmModal({ onClose, onConfirm, title, message }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-2xl w-full max-w-xs border border-zinc-800 text-center">
        <h3 className="text-white text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700">Hủy</button>
          <button onClick={onConfirm} className="flex-1 py-2 bg-red-500 rounded-lg hover:bg-red-400">Đăng xuất</button>
        </div>
      </div>
    </div>
  );
}