import { useState } from "react";

import AdminLayout from "../../components/Admin/Layout/AdminLayout";

import SongTable from "../../components/Admin/Song/SongTable";

import UserTable from "../../components/Admin/User/UserTable";

export default function Dashboard() {
  const [tab, setTab] = useState("songs");

  const [search, setSearch] = useState("");

  return (
    <AdminLayout search={search} setSearch={setSearch}>
      {tab === "songs" ? <SongTable /> : <UserTable />}
    </AdminLayout>
  );
}
