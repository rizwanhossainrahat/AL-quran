import type { SurahDetail } from "@/types/quran";

const BASE = process.env.NEXT_PUBLIC_SURAH!;

// Fetch with retry + exponential backoff to handle rate limits
async function fetchWithRetry(url: string, retries = 5): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url);
    if (res.status === 429 || res.status >= 500) {
      const wait = 500 * 2 ** i; // 500ms, 1s, 2s, 4s, 8s
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }
    return res;
  }
  throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}

export async function fetchSurahDetail(id: string): Promise<SurahDetail> {
  const [arabicRes, translationRes] = await Promise.all([
    fetchWithRetry(`${BASE}/${id}`),
    fetchWithRetry(`${BASE}/${id}/en.asad`),
  ]);

  if (!arabicRes.ok) throw new Error(`Arabic fetch failed for surah ${id}: ${arabicRes.status}`);
  if (!translationRes.ok) throw new Error(`Translation fetch failed for surah ${id}: ${translationRes.status}`);

  const [arabicData, translationData] = await Promise.all([
    arabicRes.json(),
    translationRes.json(),
  ]);

  if (!arabicData?.data?.ayahs) throw new Error(`No ayahs in Arabic data for surah ${id}`);
  if (!translationData?.data?.ayahs) throw new Error(`No ayahs in translation data for surah ${id}`);

  const surah = arabicData.data;
  const translationAyahs: { numberInSurah: number; text: string }[] =
    translationData.data.ayahs;

  return {
    number: surah.number,
    name: surah.name,
    englishName: surah.englishName,
    englishNameTranslation: surah.englishNameTranslation,
    numberOfAyahs: surah.numberOfAyahs,
    revelationType: surah.revelationType,
    ayahs: surah.ayahs.map(
      (a: { number: number; numberInSurah: number; text: string }) => ({
        number: a.number,
        numberInSurah: a.numberInSurah,
        text: a.text,
        translation:
          translationAyahs.find((t) => t.numberInSurah === a.numberInSurah)
            ?.text ?? "",
      })
    ),
  };
}
