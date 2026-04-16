"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center gap-4">
        <Link
          href="/"
          className="font-semibold text-emerald-600 text-lg shrink-0"
        >
          Al-Quran
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search ayahs..."
              className="w-full pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </form>

        <nav className="flex items-center gap-2 ml-auto">
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-emerald-600 transition-colors"
          >
            Home
          </Link>
          <Sidebar />
        </nav>
      </div>
    </header>
  );
}
