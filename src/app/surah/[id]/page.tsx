import type { SurahDetail } from "@/types/quran";
import AyahListClient from "@/components/AyahListClient";

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({ id: String(i + 1) }));
}

async function getSurahDetail(id: string): Promise<SurahDetail> {
  const [arabicRes, translationRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_SURAH}/${id}`),
    fetch(`${process.env.NEXT_PUBLIC_SURAH}/${id}/en.asad`),
  ]);
  const [arabicData, translationData] = await Promise.all([
    arabicRes.json(),
    translationRes.json(),
  ]);

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

export default async function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surah = await getSurahDetail(id);
  return <AyahListClient surah={surah} />;
}
