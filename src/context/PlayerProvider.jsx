import { useRef, useState, useEffect } from "react";
import { getSongs, deleteSong } from "../api";
import { PlayerContext } from "../context/PlayerContext";


export function PlayerProvider({ children }) {
  const audioRef = useRef(null);

  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");

  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState(1);
  const [oldVolume, setOldVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [deletingId, setDeletingId] = useState(null);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const formatTime = (t) => {
    if (!t) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSelectSong = (song, index) => {
    const audio = audioRef.current;
    if (!audio) return;

    setCurrentSong(song);
    setCurrentIndex(index);

    audio.src = song.fileSong;
    audio.volume = volume;
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

  const toggleRepeat = () => setIsRepeating(!isRepeating);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = oldVolume;
      setVolume(oldVolume);
      setIsMuted(false);
    } else {
      setOldVolume(volume);
      audio.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolume = (value) => {
    const audio = audioRef.current;
    if (!audio) return;

    setVolume(value);
    audio.volume = value;

    if (value === 0) setIsMuted(true);
    else {
      setIsMuted(false);
      setOldVolume(value);
    }
  };

  const getRandomIndex = () => {
    let rand;
    do {
      rand = Math.floor(Math.random() * songs.length);
    } while (rand === currentIndex);
    return rand;
  };

  const nextSong = () => {
    if (isShuffle) {
      const i = getRandomIndex();
      handleSelectSong(songs[i], i);
      return;
    }
    let next = currentIndex + 1;
    if (next >= songs.length) next = 0;
    handleSelectSong(songs[next], next);
  };

  const prevSong = () => {
    if (isShuffle) {
      const i = getRandomIndex();
      handleSelectSong(songs[i], i);
      return;
    }
    let prev = currentIndex - 1;
    if (prev < 0) prev = songs.length - 1;
    handleSelectSong(songs[prev], prev);
  };

  const seek = (time) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
  };

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Bạn có chắc muốn xóa bài hát này không?");
    if (!isConfirm) return;
    try {
      console.log("id: ",id);
      setDeletingId(id);
      await deleteSong(id);
      setSongs((prev) => prev.filter((song) => song.id !== id));
      if (currentSong?.id === id) {
        nextSong(); // hoặc stop
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  // Trong PlayerProvider.jsx
  const handleReloadSongs = async () => {
    // Nếu đã có danh sách nhạc rồi thì không cần fetch lại nữa
    // if (songs.length > 0) return;

    setIsLoading(true);
    try {
      // Xử lý dữ liệu như bạn đã làm...
      const res = await getSongs();
      console.log("Loaded songs:", res.data);
      const songsWithUrls = res.data.data.map((song) => ({
        ...song,
        fileSong: `${BASE_URL}${song.fileSong}`,
        fileImage: `${BASE_URL}${song.fileImage}`,
      }));

      setSongs(songsWithUrls);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   const loadSongs = async () => {
  //     setIsLoading(true);
  //     try {
  //       const res = await getSongs();
  //       console.log("Loaded songs:", res.data);
  //       const songsWithUrls = res.data.data.map((song) => ({
  //         ...song,
  //         fileSong: `${BASE_URL}${song.fileSong}`,
  //         fileImage: `${BASE_URL}${song.fileImage}`,
  //       }));

  //       setSongs(songsWithUrls);
  //     } catch (err) {
  //       console.error("Lỗi load songs:", err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   loadSongs();
  // }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    console.log("currentIndex: " + currentIndex);
    console.log("Bài hát: " + songs[currentIndex]?.title);
    audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
    audio.onloadedmetadata = () => setDuration(audio.duration);

    audio.onended = () => {
      if (isRepeating) {
        audio.currentTime = 0;
        audio.play();
      } else {
        // console.log("file_path: " + songs.file_path);
        // console.log("currentIndex: " + currentIndex);
        nextSong();
      }
    };
  }, [songs, currentIndex, isRepeating, isShuffle]);

  return (
    <PlayerContext.Provider
      value={{
        // state
        songs,
        search,
        setSearch,
        currentSong,
        currentTime,
        duration,
        isPlaying,
        isMuted,
        volume,
        isRepeating,
        isShuffle,
        deletingId,
        isLoading,

        // actions
        handleSelectSong,
        togglePlay,
        nextSong,
        prevSong,
        toggleMute,
        handleVolume,
        toggleRepeat,
        setIsShuffle,
        seek,
        formatTime,
        handleReloadSongs,
        handleDelete,
        audioRef,
      }}
    >
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
}