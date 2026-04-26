import { updateLayanan } from "@/app/actions/layanan";
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

const ICONS = ["code", "brain", "cloud", "shield", "layers", "bar-chart", "git-merge", "database", "globe", "zap", "cpu", "lock"];

export default async function EditLayananPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await query<any>("SELECT * FROM layanan WHERE id = ?", [id]);
  if (!rows || rows.length === 0) notFound();
  const layanan = rows[0];

  return (
    <div style={{ maxWidth: "700px" }}>
      <div className="admin-page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/admin/layanan" className="admin-btn admin-btn-icon"><BackIcon /></Link>
          <div>
            <div className="admin-page-title">Edit Layanan</div>
            <div className="admin-page-subtitle">ID #{id} — Perbarui informasi layanan</div>
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ padding: "32px" }}>
        <form action={async (formData) => {
          "use server";
          await updateLayanan(Number(id), formData);
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="admin-form-label">Nama Layanan <span style={{ color: "#ef4444" }}>*</span></label>
              <input name="nama" required type="text" className="admin-form-input" defaultValue={layanan.nama} />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Icon</label>
              <select name="icon" className="admin-form-input" style={{ cursor: "pointer" }} defaultValue={layanan.icon}>
                {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Urutan Tampil</label>
              <input name="urutan" type="number" className="admin-form-input" defaultValue={layanan.urutan} min="0" />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Deskripsi <span style={{ color: "#ef4444" }}>*</span></label>
            <textarea name="deskripsi" required className="admin-form-textarea" style={{ minHeight: "120px" }}
              defaultValue={layanan.deskripsi} />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "8px", borderTop: "1px solid #f1f5f9" }}>
            <Link href="/admin/layanan" className="admin-btn admin-btn-secondary">Batal</Link>
            <button type="submit" className="admin-btn admin-btn-primary">
              <SaveIcon /> Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
