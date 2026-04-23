import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";


export default function usePlayerContext() {
  return useContext(PlayerContext);
}