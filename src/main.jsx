import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PlayerProvider } from "./context/PlayerProvider.jsx"; // ✅ thêm
import { AuthProvider } from "./context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <PlayerProvider>
      {" "}
      {/* ✅ bọc ở đây */}
      <App />
    </PlayerProvider>
  </AuthProvider>,
);
