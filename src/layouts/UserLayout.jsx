// src/layouts/UserLayout.jsx
import Sidebar from "../components/Sidebar"; // Sidebar bạn đã có
import Navbar from "../components/Navbar"; // Sidebar bạn đã có
import PlayerBar from "../components/Player/Player"; // Sẽ tạo ở dưới
import MiniPlayer from "../components/Player/MiniPlayer"; // Sẽ tạo ở dưới

export default function UserLayout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* <Sidebar isOpen={true} />  */}
        <main className="flex-1 overflow-y-auto pb-24 p-6">{children}</main>
      </div>
      <PlayerBar />
      <MiniPlayer />
    </div>
  );
}
