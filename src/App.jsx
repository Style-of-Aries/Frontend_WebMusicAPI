import { useState } from "react";
import Home from "./pages/Home";
import LoginModal from "./components/LoginModal";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Home openLogin={() => setShowLogin(true)} />

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
    </>
  );
}