"use client";

import { useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import type { SurahDetail } from "@/types/quran";


 const BISMILLAH ="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
export default function AyahListClient({ surah }: { surah: SurahDetail }) {
  const { settings } = useSettings();
  const [query, setQuery] = useState("");

  const arabicFontClass =
    settings.arabicFont === "Amiri" ? "font-amiri" : "font-scheherazade";

  const filtered = query.trim()
    ? surah.ayahs.filter((a) =>
        a.translation?.toLowerCase().includes(query.toLowerCase())
      )
    : surah.ayahs;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 mb-6 transition-colors"
      >
        <ArrowLeft size={15} />
        All Surahs
      </Link>

      {/* Surah Header */}
      <div className="text-center mb-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
        <p className={`${arabicFontClass} text-4xl text-slate-900 mb-2`}>
          {surah.name}
        </p>
        <h1 className="text-xl font-semibold text-slate-800">
          {surah.englishName}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {surah.englishNameTranslation} &middot; {surah.numberOfAyahs} Ayahs &middot;{" "}
          {surah.revelationType}
        </p>

        {/* Bismillah — skip for Surah 9 (At-Tawbah) */}
        {surah.number !== 9 && (
          <p
            className={`${arabicFontClass} text-emerald-700 mt-4`}
            style={{ fontSize: settings.arabicSize }}
          >
            {BISMILLAH}
          </p>
        )}
      </div>

      {/* Search within surah */}
      <div className="relative mb-6">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search translation in this surah..."
          className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Ayah list */}
      <div className="space-y-4">
        {filtered.map((ayah) => (
          <div
            key={ayah.numberInSurah}
            className="border border-slate-100 rounded-xl p-5 bg-white hover:border-emerald-200 transition-colors"
          >
            {/* Ayah number badge */}
            <div className="flex justify-end mb-3">
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-0.5">
                {surah.number}:{ayah.numberInSurah}
              </span>
            </div>

            {/* Arabic text — RTL */}
            <p
              className={`${arabicFontClass} text-slate-900 text-right leading-loose mb-4`}
              style={{ fontSize: settings.arabicSize, direction: "rtl" }}
            >
              {ayah.text}
            </p>

            {/* Translation */}
            {ayah.translation && (
              <p
                className="text-slate-600 leading-relaxed border-t border-slate-50 pt-3"
                style={{ fontSize: settings.translationSize }}
              >
                {ayah.translation}
              </p>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-slate-400 text-sm py-8">
            No ayahs match your search.
          </p>
        )}
      </div>
    </div>
  );
}
