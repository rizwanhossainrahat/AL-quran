export const dynamic = "force-static";

export async function generateStaticParams() {
  const ids = Array.from({ length: 114 }, (_, i) => ({ id: String(i + 1) }));
  return ids;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Fetch Arabic text and English translation in parallel
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

  // Merge Arabic + translation
  const ayahs = surah.ayahs.map(
    (a: { number: number; numberInSurah: number; text: string }) => ({
      number: a.number,
      numberInSurah: a.numberInSurah,
      text: a.text,
      translation:
        translationAyahs.find((t) => t.numberInSurah === a.numberInSurah)
          ?.text ?? "",
    })
  );

  return Response.json({
    number: surah.number,
    name: surah.name,
    englishName: surah.englishName,
    englishNameTranslation: surah.englishNameTranslation,
    numberOfAyahs: surah.numberOfAyahs,
    revelationType: surah.revelationType,
    ayahs,
  });
}
