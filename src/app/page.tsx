"use client";

import { useEffect, useState, Suspense } from "react";
import type { Surah } from "@/types/quran";
import SurahListClient from "@/components/SurahListClient";

export default function HomePage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SURAH!)
      .then((r) => r.json())
      .then((data) => setSurahs(data.data))
      .catch(() => setError("Failed to load surahs. Please try again."));
  }, []);

  if (error)
    return (
      <div className="container mx-auto px-4 py-16 text-center text-red-500">
        {error}
      </div>
    );

  if (surahs.length === 0)
    return (
      <div className="container mx-auto px-4 py-16 text-center text-slate-400">
        Loading...
      </div>
    );

  return (
    <Suspense>
      <SurahListClient surahs={surahs} />
    </Suspense>
  );
}
