const SEARCH_API = "https://api.alquran.cloud/v1/search";

const searchAyahs = async (keyword: string, surah: string, edition: string) => {
  const url = `${SEARCH_API}/${keyword}/${surah}/${edition}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export default searchAyahs;
