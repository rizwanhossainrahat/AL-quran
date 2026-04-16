import { Suspense } from "react";
import type { Surah } from "@/types/quran";
import SurahListClient from "@/components/SurahListClient";

async function getSurahs(): Promise<Surah[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_SURAH!);
  const data = await res.json();
  return data.data;
}

export default async function HomePage() {
  const surahs = await getSurahs();
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 text-slate-400">Loading...</div>}>
      <SurahListClient surahs={surahs} />
    </Suspense>
  );
}
