"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BeritaItem {
  id: number;
  judul: string;
  slug: string;
  excerpt: string;
  image: string | null;
  created_at: string;
}

export default function BeritaSection() {
  const [berita, setBerita] = useState<BeritaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/berita?limit=4")
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "ok") setBerita(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="berita" className="berita-section">
      <h2 className="section-title">
        Berita <span className="text-gradient">Terbaru</span>
      </h2>
      <p className="section-subtitle">
        Update terkini dari dunia teknologi dan inovasi DigiTech
      </p>

      {loading ? (
        <div className="berita-grid">
          {[1, 2, 3, 4].map((i) => (
            <div className="card card--skeleton" key={i}>
              <div className="skeleton skeleton--img" />
              <div className="skeleton skeleton--title" />
              <div className="skeleton skeleton--text" />
            </div>
          ))}
        </div>
      ) : berita.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--text-dim)" }}>
          Belum ada berita tersedia.
        </p>
      ) : (
        <div className="berita-grid">
          {berita.map((item, i) => (
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
      )}

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <Link href="/berita" className="cta-button">
          LIHAT SEMUA BERITA
        </Link>
      </div>
    </section>
  );
}
