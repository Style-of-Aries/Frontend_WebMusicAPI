import useAuth from "../../../hooks/useAuth";

export default function AdminHeader({
  search,

  setSearch,
}) {
  const { user } = useAuth();

  return (
    <div className="h-20 border-b border-zinc-800 flex items-center px-6">
      <div className="flex-1 flex justify-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-[450px]

bg-zinc-900

rounded-xl

px-4

py-3"
        />
      </div>

      <div>
        <div className="font-semibold">{user?.fullName}</div>

        <div className="text-sm text-zinc-400">{user?.role}</div>
      </div>
    </div>
  );
}
