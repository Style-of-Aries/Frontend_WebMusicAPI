
export const getSongs = async () => {
  const res = await fetch("http://musicapi.test/api/songs");
  return res.json();
};