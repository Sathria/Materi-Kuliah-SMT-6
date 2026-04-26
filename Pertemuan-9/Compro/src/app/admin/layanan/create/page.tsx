import { createLayanan } from "@/app/actions/layanan";
import Link from "next/link";

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

export default function CreateLayananPage() {
  return (
    <div style={{ maxWidth: "700px" }}>
      <div className="admin-page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link href="/admin/layanan" className="admin-btn admin-btn-icon"><BackIcon /></Link>
          <div>
            <div className="admin-page-title">Tambah Layanan Baru</div>
            <div className="admin-page-subtitle">Tambahkan layanan baru ke halaman company profile</div>
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ padding: "32px" }}>
        <form action={createLayanan}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="admin-form-label">Nama Layanan <span style={{ color: "#ef4444" }}>*</span></label>
              <input name="nama" required type="text" className="admin-form-input" placeholder="Contoh: Cloud Enterprise" />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Icon</label>
              <select name="icon" className="admin-form-input" style={{ cursor: "pointer" }}>
                {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
              </select>
              <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>Gunakan nama icon dari Lucide Icons</div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Urutan Tampil</label>
              <input name="urutan" type="number" className="admin-form-input" defaultValue="0" min="0" />
              <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>Angka kecil = tampil lebih awal</div>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Deskripsi <span style={{ color: "#ef4444" }}>*</span></label>
            <textarea name="deskripsi" required className="admin-form-textarea" style={{ minHeight: "120px" }}
              placeholder="Jelaskan layanan ini secara singkat dan menarik..." />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "8px", borderTop: "1px solid #f1f5f9" }}>
            <Link href="/admin/layanan" className="admin-btn admin-btn-secondary">Batal</Link>
            <button type="submit" className="admin-btn admin-btn-primary">
              <SaveIcon /> Simpan Layanan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
