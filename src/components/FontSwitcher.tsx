"use client";

import { useState, useEffect } from "react";

type ArabicFont = "amiri" | "scheherazade";

const STORAGE_KEY = "quran_arabic_font";

const SAMPLE =
  "\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064e\u0647\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650";

export default function FontSwitcher() {
  const [font, setFont] = useState<ArabicFont>("amiri");

  // Load persisted preference on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ArabicFont | null;
    if (saved === "amiri" || saved === "scheherazade") setFont(saved);
  }, []);

  function handleChange(value: ArabicFont) {
    setFont(value);
    localStorage.setItem(STORAGE_KEY, value);
  }

  const fontClass = font === "amiri" ? "font-amiri" : "font-scheherazade";

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">
        Arabic Font
      </label>

      <select
        value={font}
        onChange={(e) => handleChange(e.target.value as ArabicFont)}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
      >
        <option value="amiri">Amiri</option>
        <option value="scheherazade">Scheherazade New</option>
      </select>

      {/* Live preview */}
      <p
        className={`${fontClass} text-right text-3xl text-slate-800 leading-loose`}
        dir="rtl"
      >
        {SAMPLE}
      </p>
    </div>
  );
}
