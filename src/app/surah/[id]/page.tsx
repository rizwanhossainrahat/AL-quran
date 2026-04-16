"use client";

import { use, useEffect, useState } from "react";
import AyahListClient from "@/components/AyahListClient";
import type { SurahDetail } from "@/types/quran";

const SURAH_API = "https://api.alquran.cloud/v1/surah";

export default function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`${SURAH_API}/${id}`).then((r) => r.json()),
      fetch(`${SURAH_API}/${id}/en.asad`).then((r) => r.json()),
    ])
      .then(([arabicData, translationData]) => {
        const s = arabicData.data;
        const tAyahs: { numberInSurah: number; text: string }[] =
          translationData.data.ayahs;
        setSurah({
          number: s.number,
          name: s.name,
          englishName: s.englishName,
          englishNameTranslation: s.englishNameTranslation,
          numberOfAyahs: s.numberOfAyahs,
          revelationType: s.revelationType,
          ayahs: s.ayahs.map(
            (a: { number: number; numberInSurah: number; text: string }) => ({
              number: a.number,
              numberInSurah: a.numberInSurah,
              text: a.text,
              translation:
                tAyahs.find((t) => t.numberInSurah === a.numberInSurah)
                  ?.text ?? "",
            })
          ),
        });
      })
      .catch(() => setError("Failed to load surah. Please try again."));
  }, [id]);

  if (error)
    return (
      <div className="container mx-auto px-4 py-16 text-center text-red-500">
        {error}
      </div>
    );

  if (!surah)
    return (
      <div className="container mx-auto px-4 py-16 text-center text-slate-400">
        Loading...
      </div>
    );

  return <AyahListClient surah={surah} />;
}
