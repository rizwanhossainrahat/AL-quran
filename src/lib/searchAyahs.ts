const searchAyahs = async (keyword: string, surah: string, edition: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_SEARCH_AYAHS;
  const url = `${baseUrl}/${keyword}/${surah}/${edition}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export default searchAyahs;
