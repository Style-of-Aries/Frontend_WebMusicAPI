import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MiniPlayer from '../components/Player/MiniPlayer';
import { Outlet } from "react-router-dom";


const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} />
      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <Header toggleSidebar={() => setIsOpen(!isOpen)} />
        <main className="p-8"><Outlet />{children}</main>
      </div>
      
      <MiniPlayer />
    </div>
  );
};

export default AdminLayout;