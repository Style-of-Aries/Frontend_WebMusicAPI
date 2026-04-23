import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import { PlayerProvider } from "./context/PlayerContext"; // ✅ thêm

ReactDOM.createRoot(document.getElementById('root')).render(
  <PlayerProvider>   {/* ✅ bọc ở đây */}
    <App />
  </PlayerProvider>
)