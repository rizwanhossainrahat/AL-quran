export const dynamic = "force-static";

export async function GET() {
  const res = await fetch(process.env.NEXT_PUBLIC_SURAH!);
  const data = await res.json();
  return Response.json(data.data);
}
