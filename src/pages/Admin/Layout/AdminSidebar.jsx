import { Music, Users, LogOut } from "lucide-react";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin</h1>
      </div>

      <nav className="flex-1">
        <button className="w-full px-6 py-4 flex gap-3 hover:bg-zinc-800">
          <Music size={18} />
          Quản lý bài hát
        </button>

        <button className="w-full px-6 py-4 flex gap-3 hover:bg-zinc-800">
          <Users size={18} />
          Quản lý người dùng
        </button>
      </nav>

      <div className="p-4">
        <button className="w-full flex gap-2 items-center justify-center bg-red-500 py-3 rounded-xl">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
