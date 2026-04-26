import { updateBerita } from "@/app/actions/berita";
import { query } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const SaveIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </svg>
);

export default async function EditBeritaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await query<any>("SELECT * FROM berita WHERE id = ?", [id]);
  if (!rows || rows.length === 0) notFound();
  const berita = rows[0];

  return (
    <div style={{ maxWidth: "800px" }}>
      <div className="admin-page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/admin/berita" className="admin-btn admin-btn-icon">
            <BackIcon />
          </Link>
          <div>
            <div className="admin-page-title">Edit Berita</div>
            <div className="admin-page-subtitle">ID #{id} — Perbarui artikel yang sudah ada</div>
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ padding: "32px" }}>
        <form action={async (formData) => {
          "use server";
          await updateBerita(Number(id), formData);
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 20px", background: "#f8fafc", borderRadius: "12px",
            border: "1px solid #e2e8f0", marginBottom: "24px",
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: "14px", color: "#1e293b" }}>Status Publikasi</div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>Aktifkan agar berita tampil ke publik</div>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <input type="checkbox" name="is_published" defaultChecked={berita.is_published === 1}
                style={{ width: "18px", height: "18px", accentColor: "#2563eb", cursor: "pointer" }} />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>Published</span>
            </label>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Judul Berita <span style={{ color: "#ef4444" }}>*</span></label>
            <input name="judul" required type="text" className="admin-form-input" defaultValue={berita.judul} />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">URL Gambar Thumbnail</label>
            <input name="image" type="text" className="admin-form-input" defaultValue={berita.image || ""} placeholder="https://..." />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Kutipan / Excerpt <span style={{ color: "#ef4444" }}>*</span></label>
            <textarea name="excerpt" required className="admin-form-textarea" style={{ minHeight: "80px" }}
              defaultValue={berita.excerpt} />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Konten Artikel (HTML) <span style={{ color: "#ef4444" }}>*</span></label>
            <textarea name="konten" required className="admin-form-textarea" style={{ minHeight: "260px", fontFamily: "monospace", fontSize: "13px" }}
              defaultValue={berita.konten} />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "8px", borderTop: "1px solid #f1f5f9" }}>
            <Link href="/admin/berita" className="admin-btn admin-btn-secondary">Batal</Link>
            <button type="submit" className="admin-btn admin-btn-primary">
              <SaveIcon /> Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
