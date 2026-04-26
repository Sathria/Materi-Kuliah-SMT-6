export const dynamic = "force-dynamic";

import Link from "next/link";
import { query } from "@/lib/db";

interface BeritaRow {
  id: number;
  judul: string;
  slug: string;
  excerpt: string;
  image: string | null;
  created_at: string;
}

export default async function BeritaIndexPage() {
  const rows = await query<BeritaRow>(
    "SELECT id, judul, slug, excerpt, image, created_at FROM berita WHERE is_published = 1 ORDER BY created_at DESC"
  );

  return (
    <section>
      <div style={{ paddingBottom: "2rem", textAlign: "center" }}>
        <h1 className="section-title">
          Ruang <span className="text-gradient">Berita</span>
        </h1>
        <p className="section-subtitle">
          Informasi, pembaruan, dan wawasan terkini dari DigiTech
        </p>
      </div>

      <div className="berita-grid" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {rows.length === 0 && (
          <p style={{ textAlign: "center", gridColumn: "1/-1" }}>Tidak ada berita saat ini.</p>
        )}
        
        {rows.map((item, i) => (
          <Link
            href={`/berita/${item.slug}`}
            key={item.id}
            className="card berita-card"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {item.image && (
              <div className="berita-card__img">
                <img src={item.image} alt={item.judul} loading="lazy" />
              </div>
            )}
            <div className="berita-card__body">
              <span className="berita-card__date">
                {new Date(item.created_at).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <h3>{item.judul}</h3>
              <p>{item.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
