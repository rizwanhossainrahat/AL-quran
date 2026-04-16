import Link from "next/link";
import type { Surah } from "@/types/quran";

export default function SurahCard({ surah }: { surah: Surah }) {
  return (
    <Link href={`/surah/${surah.number}`}>
      <div className="group border border-slate-100 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md transition-all bg-white cursor-pointer">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-700 font-semibold text-sm shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              {surah.number}
            </span>
            <div>
              <p className="font-medium text-slate-900 text-sm">
                {surah.englishName}
              </p>
              <p className="text-xs text-slate-500">
                {surah.englishNameTranslation}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-amiri text-xl text-slate-800">{surah.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {surah.numberOfAyahs} Ayahs
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
