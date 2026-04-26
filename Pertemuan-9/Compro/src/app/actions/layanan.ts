"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createLayanan(formData: FormData) {
  const nama = formData.get("nama") as string;
  const icon = formData.get("icon") as string || "code";
  const deskripsi = formData.get("deskripsi") as string;
  const urutan = Number(formData.get("urutan")) || 0;

  await query(
    "INSERT INTO layanan (nama, icon, deskripsi, urutan) VALUES (?, ?, ?, ?)",
    [nama, icon, deskripsi, urutan]
  );

  revalidatePath("/admin/layanan");
  revalidatePath("/");
  redirect("/admin/layanan");
}

export async function updateLayanan(id: number, formData: FormData) {
  const nama = formData.get("nama") as string;
  const icon = formData.get("icon") as string || "code";
  const deskripsi = formData.get("deskripsi") as string;
  const urutan = Number(formData.get("urutan")) || 0;

  await query(
    "UPDATE layanan SET nama = ?, icon = ?, deskripsi = ?, urutan = ? WHERE id = ?",
    [nama, icon, deskripsi, urutan, id]
  );

  revalidatePath("/admin/layanan");
  revalidatePath("/");
  redirect("/admin/layanan");
}

export async function deleteLayanan(id: number) {
  await query("DELETE FROM layanan WHERE id = ?", [id]);
  revalidatePath("/admin/layanan");
  revalidatePath("/");
}
