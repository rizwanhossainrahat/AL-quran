import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8 text-slate-400 text-sm">
          Loading...
        </div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
