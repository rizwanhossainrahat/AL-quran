export const dynamic = "force-static";

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({ id: String(i + 1) }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { fetchSurahDetail } = await import("@/lib/fetchSurah");
    const surah = await fetchSurahDetail(id);
    return Response.json(surah);
  } catch (err) {
    return Response.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
