import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
      <button onClick={toggleSidebar} className="p-2 bg-gray-200 rounded">☰</button>
      
      {/* Search Input ở giữa */}
      <div className="flex-1 flex justify-center">
        <input 
          type="text" 
          placeholder="Tìm kiếm..." 
          className="w-1/2 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      
      {/* Name User */}
      <div className="font-medium text-gray-700">Admin User</div>
    </header>
  );
};

export default Header;