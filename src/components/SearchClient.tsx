"use client";

import { useState, useTransition, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import searchAyahs from "@/lib/searchAyahs";

interface SearchAyah {
  number: number;
  text: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
  numberInSurah: number;
}

const EDITIONS = [
  { value: "en.asad", label: "Asad (English)" },
  { value: "en.pickthall", label: "Pickthall (English)" },
  { value: "en.sahih", label: "Sahih International" },
  { value: "en.yusufali", label: "Yusuf Ali (English)" },
];

export default function SearchClient() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQ);
  const [surah, setSurah] = useState("all");
  const [edition, setEdition] = useState("en.asad");
  const [results, setResults] = useState<SearchAyah[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const { settings } = useSettings();

  const arabicFontClass =
    settings.arabicFont === "Amiri" ? "font-amiri" : "font-scheherazade";

  async function runSearch(keyword: string, surahVal: string, editionVal: string) {
    setError("");
    setSearched(false);
    try {
      const data = await searchAyahs(keyword, surahVal, editionVal);
      if (data.code !== 200) throw new Error(data.status);
      setResults(data.data?.matches ?? []);
    } catch (err) {
      setError("Search failed. Please try again.");
      setResults([]);
    }
    setSearched(true);
  }

  // Auto-search if navigated here with ?q=
  useEffect(() => {
    if (initialQ.trim()) {
      runSearch(initialQ.trim(), "all", "en.asad");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    startTransition(() => {
      runSearch(query.trim(), surah, edition);
    });
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 mb-6 transition-colors"
      >
        <ArrowLeft size={15} />
        All Surahs
      </Link>

      <h1 className="text-2xl font-semibold text-slate-900 mb-6">
        Search Ayahs
      </h1>

      {/* Search form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='e.g. "Abraham", "mercy", "paradise"'
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={surah}
            onChange={(e) => setSurah(e.target.value)}
            placeholder='Surah number or "all"'
            className="flex-1 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <select
            value={edition}
            onChange={(e) => setEdition(e.target.value)}
            className="flex-1 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            {EDITIONS.map((ed) => (
              <option key={ed.value} value={ed.value}>
                {ed.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isPending || !query.trim()}
          className="w-full py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isPending && <Loader2 size={14} className="animate-spin" />}
          Search
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {searched && !isPending && (
        <p className="text-sm text-slate-500 mb-4">
          {results.length === 0
            ? "No ayahs found."
            : `${results.length} ayah${results.length !== 1 ? "s" : ""} found`}
        </p>
      )}

      <div className="space-y-4">
        {results.map((ayah) => (
          <div
            key={ayah.number}
            className="border border-slate-100 rounded-xl p-5 bg-white hover:border-emerald-200 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <Link
                href={`/surah/${ayah.surah.number}`}
                className="text-xs font-medium text-emerald-700 hover:underline"
              >
                {ayah.surah.englishName} ({ayah.surah.number})
              </Link>
              <span className="text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-0.5">
                {ayah.surah.number}:{ayah.numberInSurah}
              </span>
            </div>

            <p
              className="text-slate-700 leading-relaxed"
              style={{ fontSize: settings.translationSize }}
            >
              {ayah.text}
            </p>

            <p
              className={`${arabicFontClass} text-slate-400 text-right mt-3`}
              style={{ fontSize: settings.arabicSize * 0.7 }}
            >
              {ayah.surah.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
