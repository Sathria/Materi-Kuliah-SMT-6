import { query } from "@/lib/db";
import Link from "next/link";
import { deleteBerita, togglePublishBerita } from "@/app/actions/berita";
import DeleteButton from "@/components/DeleteButton";

export const dynamic = "force-dynamic";

const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

export default async function BeritaAdminPage() {
  const berita = await query<any>(
    "SELECT id, judul, slug, created_at, is_published FROM berita ORDER BY created_at DESC"
  );

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Manajemen Berita</div>
          <div className="admin-page-subtitle">Kelola artikel dan berita perusahaan ({berita.length} total)</div>
        </div>
        <Link href="/admin/berita/create" className="admin-btn admin-btn-primary">
          <PlusIcon /> Tulis Berita Baru
        </Link>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "40px" }}>#</th>
              <th>Judul Berita</th>
              <th className="admin-col-hide-mobile">Tanggal</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "right", width: "96px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {berita.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
                  Belum ada berita. Klik &quot;Tulis Berita Baru&quot; untuk memulai.
                </td>
              </tr>
            ) : berita.map((item: any) => (
              <tr key={item.id}>
                <td style={{ color: "#94a3b8", fontWeight: 500, width: "40px" }}>{item.id}</td>
                <td>
                  <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "13px" }}>
                    {item.judul}
                  </div>
                </td>
                <td className="admin-col-hide-mobile" style={{ color: "#64748b", fontSize: "13px", whiteSpace: "nowrap" }}>
                  {new Date(item.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                </td>
                <td style={{ textAlign: "center" }}>
                  <form action={async () => {
                    "use server";
                    await togglePublishBerita(item.id, item.is_published);
                  }}>
                    <button type="submit" className={`admin-badge ${item.is_published ? "admin-badge-green" : "admin-badge-gray"}`}
                      style={{ cursor: "pointer", border: "none", fontFamily: "inherit" }}>
                      {item.is_published ? "● Published" : "○ Draft"}
                    </button>
                  </form>
                </td>
                <td>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <Link href={`/admin/berita/${item.id}/edit`} className="admin-btn admin-btn-icon" title="Edit">
                      <EditIcon />
                    </Link>
                    <DeleteButton
                      message="Hapus berita ini?"
                      action={async () => {
                        "use server";
                        await deleteBerita(item.id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
