"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBerita(formData: FormData) {
  const judul = formData.get("judul") as string;
  const slug = judul.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const excerpt = formData.get("excerpt") as string;
  const konten = formData.get("konten") as string;
  const image = formData.get("image") as string || null;
  const is_published = formData.get("is_published") === "on" ? 1 : 0;

  await query(
    "INSERT INTO berita (judul, slug, excerpt, konten, image, is_published) VALUES (?, ?, ?, ?, ?, ?)",
    [judul, slug, excerpt, konten, image, is_published]
  );

  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  redirect("/admin/berita");
}

export async function updateBerita(id: number, formData: FormData) {
  const judul = formData.get("judul") as string;
  const slug = judul.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const excerpt = formData.get("excerpt") as string;
  const konten = formData.get("konten") as string;
  const image = formData.get("image") as string || null;
  const is_published = formData.get("is_published") === "on" ? 1 : 0;

  await query(
    "UPDATE berita SET judul = ?, slug = ?, excerpt = ?, konten = ?, image = ?, is_published = ? WHERE id = ?",
    [judul, slug, excerpt, konten, image, is_published, id]
  );

  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  redirect("/admin/berita");
}

export async function deleteBerita(id: number) {
  await query("DELETE FROM berita WHERE id = ?", [id]);
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
}

export async function togglePublishBerita(id: number, currentStatus: number) {
  await query("UPDATE berita SET is_published = ? WHERE id = ?", [currentStatus === 1 ? 0 : 1, id]);
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
}
