"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteKontak(id: number) {
  await query("DELETE FROM kontak WHERE id = ?", [id]);
  revalidatePath("/admin/kontak");
  revalidatePath("/admin");
}

export async function markAsRead(id: number) {
  await query("UPDATE kontak SET is_read = 1 WHERE id = ?", [id]);
  revalidatePath("/admin/kontak");
  revalidatePath("/admin");
}
