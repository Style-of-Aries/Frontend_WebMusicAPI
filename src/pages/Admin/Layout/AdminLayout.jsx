import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({
  children,

  search,

  setSearch,
}) {
  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader search={search} setSearch={setSearch} />

        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>
    </div>
  );
}
