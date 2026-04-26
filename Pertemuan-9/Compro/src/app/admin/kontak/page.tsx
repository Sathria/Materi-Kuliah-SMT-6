import { query } from "@/lib/db";
import { deleteKontak, markAsRead } from "@/app/actions/kontak";
import DeleteButton from "@/components/DeleteButton";
import MarkReadButton from "@/components/MarkReadButton";

export const dynamic = "force-dynamic";

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

export default async function KontakAdminPage() {
  const kontak = await query<any>("SELECT * FROM kontak ORDER BY created_at DESC");
  const unread = kontak.filter((k: any) => !k.is_read).length;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Pesan Masuk</div>
          <div className="admin-page-subtitle">
            {unread > 0
              ? <span><strong style={{ color: "#2563eb" }}>{unread} pesan baru</strong> belum dibaca dari {kontak.length} total pesan</span>
              : `${kontak.length} pesan — semua sudah dibaca`
            }
          </div>
        </div>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "12px" }}></th>
              <th>Pengirim</th>
              <th>Pesan</th>
              <th className="admin-col-hide-mobile" style={{ whiteSpace: "nowrap" }}>Tanggal</th>
              <th style={{ textAlign: "right", width: "96px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kontak.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "48px", color: "#94a3b8" }}>
                  Belum ada pesan masuk.
                </td>
              </tr>
            ) : kontak.map((item: any) => (
              <tr key={item.id} style={{ background: item.is_read ? "transparent" : "rgba(239,246,255,0.5)" }}>
                <td style={{ verticalAlign: "middle" }}>
                  {!item.is_read && (
                    <span style={{ display: "block", width: "8px", height: "8px", borderRadius: "50%", background: "#3b82f6" }} />
                  )}
                </td>
                <td style={{ verticalAlign: "top" }}>
                  <div style={{ fontWeight: item.is_read ? 500 : 700, fontSize: "13px", color: "#1e293b" }}>{item.nama}</div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>{item.email}</div>
                </td>
                <td style={{ verticalAlign: "top" }}>
                  {item.subjek && (
                    <div style={{ fontWeight: 600, fontSize: "13px", color: "#374151", marginBottom: "4px" }}>{item.subjek}</div>
                  )}
                  <div style={{ fontSize: "13px", color: "#64748b", maxWidth: "400px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                    {item.pesan}
                  </div>
                </td>
                <td style={{ verticalAlign: "top", fontSize: "12px", color: "#94a3b8", whiteSpace: "nowrap" }} className="admin-col-hide-mobile">
                  {new Date(item.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                </td>
                <td style={{ verticalAlign: "top" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                    {!item.is_read && (
                      <MarkReadButton
                        action={async () => {
                          "use server";
                          await markAsRead(item.id);
                        }}
                      />
                    )}
                    <DeleteButton
                      message="Hapus pesan ini?"
                      action={async () => {
                        "use server";
                        await deleteKontak(item.id);
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
