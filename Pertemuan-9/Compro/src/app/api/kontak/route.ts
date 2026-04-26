import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, email, subjek, pesan } = body;

    if (!nama || !email || !pesan) {
      return NextResponse.json(
        { status: "error", message: "Nama, email, dan pesan wajib diisi" },
        { status: 400 }
      );
    }

    await query(
      "INSERT INTO kontak (nama, email, subjek, pesan) VALUES (?, ?, ?, ?)",
      [nama, email, subjek || "", pesan]
    );

    return NextResponse.json({ status: "ok", message: "Pesan berhasil dikirim" });
  } catch (error) {
    console.error("API /kontak error:", error);
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
