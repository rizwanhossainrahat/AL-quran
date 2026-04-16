"use client";

import { use, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Surah } from "@/types/quran";
import SurahCard from "./SurahCard";

export default function SurahListClient({ surahs }: { surahs: Surah[] }) {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);

  const filtered = query.trim()
    ? surahs.filter(
        (s) =>
          s.englishName.toLowerCase().includes(query.toLowerCase()) ||
          s.englishNameTranslation.toLowerCase().includes(query.toLowerCase()) ||
          String(s.number).includes(query)
      )
    : surahs;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 mb-1">
          The Holy Quran
        </h1>
        <p className="text-slate-500 text-sm">114 Surahs</p>
      </div>

      {/* Inline search for surah names */}
      <div className="mb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter surahs by name..."
          className="w-full max-w-sm border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-400 text-sm">No surahs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((surah) => (
            <SurahCard key={surah.number} surah={surah} />
          ))}
        </div>
      )}
    </div>
  );
}
