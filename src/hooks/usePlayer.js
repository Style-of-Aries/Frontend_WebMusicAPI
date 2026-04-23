import { useRef, useState, useEffect } from "react";

export default function usePlayer(songs) {
  const audioRef = useRef(null);

  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  const playSong = (song, index) => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentSong(song);
    setCurrentIndex(index);

    audio.src = song.fileSong;
    audio.play();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    let next = currentIndex + 1;
    if (next >= songs.length) next = 0;
    playSong(songs[next], next);
  };

  const prevSong = () => {
    let prev = currentIndex - 1;
    if (prev < 0) prev = songs.length - 1;
    playSong(songs[prev], prev);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
    audio.onloadedmetadata = () => setDuration(audio.duration);

    audio.onended = () => {
      if (isRepeating) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextSong();
      }
    };
  }, [currentIndex, isRepeating]);

  return {
    audioRef,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    playSong,
    togglePlay,
    nextSong,
    prevSong,
    setCurrentTime,
    isShuffle,
    setIsShuffle,
    isRepeating,
    setIsRepeating,
  };
}