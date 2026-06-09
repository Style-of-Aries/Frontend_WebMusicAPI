
export const getSongs = async () => {
  const res = await fetch("http://localhost:5200/api/song");
  return res.json();
};