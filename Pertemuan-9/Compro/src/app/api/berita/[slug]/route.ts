import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface BeritaDetail {
  id: number;
  judul: string;
  slug: string;
  excerpt: string;
  konten: string;
  image: string | null;
  created_at: string;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const rows = await query<BeritaDetail>(
      "SELECT id, judul, slug, excerpt, konten, image, created_at FROM berita WHERE slug = ? AND is_published = 1 LIMIT 1",
      [slug]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { status: "error", message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: "ok", data: rows[0] });
  } catch (error) {
    console.error("API /berita/[slug] error:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
