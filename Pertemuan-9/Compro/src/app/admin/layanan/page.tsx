import { query } from "@/lib/db";
import Link from "next/link";
import { deleteLayanan } from "@/app/actions/layanan";
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

export default async function LayananAdminPage() {
  const layanan = await query<any>("SELECT id, nama, icon, deskripsi, urutan FROM layanan ORDER BY urutan ASC");

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Manajemen Layanan</div>
          <div className="admin-page-subtitle">Kelola layanan dan produk perusahaan ({layanan.length} layanan aktif)</div>
        </div>
        <Link href="/admin/layanan/create" className="admin-btn admin-btn-primary">
          <PlusIcon /> Tambah Layanan
        </Link>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "60px" }}>Urutan</th>
              <th>Nama Layanan</th>
              <th className="admin-col-hide-mobile">Deskripsi</th>
              <th style={{ width: "80px" }}>Icon</th>
              <th style={{ textAlign: "right", width: "96px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {layanan.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
                  Belum ada layanan. Klik &quot;Tambah Layanan&quot; untuk memulai.
                </td>
              </tr>
            ) : layanan.map((item: any) => (
              <tr key={item.id}>
                <td>
                  <span className="admin-badge admin-badge-blue">#{item.urutan}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "#1e293b" }}>{item.nama}</div>
                </td>
                <td className="admin-col-hide-mobile">
                  <div style={{ fontSize: "13px", color: "#64748b" }}>
                    {item.deskripsi}
                  </div>
                </td>
                <td>
                  <code style={{ fontSize: "12px", background: "#f1f5f9", padding: "3px 8px", borderRadius: "6px", color: "#475569" }}>
                    {item.icon}
                  </code>
                </td>
                <td>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    <Link href={`/admin/layanan/${item.id}/edit`} className="admin-btn admin-btn-icon" title="Edit">
                      <EditIcon />
                    </Link>
                    <DeleteButton
                      message="Hapus layanan ini?"
                      action={async () => {
                        "use server";
                        await deleteLayanan(item.id);
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
