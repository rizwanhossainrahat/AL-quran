import AyahListClient from "@/components/AyahListClient";
import { fetchSurahDetail } from "@/lib/fetchSurah";

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({ id: String(i + 1) }));
}

export default async function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surah = await fetchSurahDetail(id);
  return <AyahListClient surah={surah} />;
}
