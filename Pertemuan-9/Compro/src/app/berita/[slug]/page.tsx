import { notFound } from "next/navigation";
import Link from "next/link";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface BeritaDetail {
  id: number;
  judul: string;
  slug: string;
  konten: string;
  image: string | null;
  created_at: string;
}

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const rows = await query<BeritaDetail>(
    "SELECT * FROM berita WHERE slug = ? AND is_published = 1 LIMIT 1",
    [slug]
  );

  if (rows.length === 0) {
    notFound();
  }

  const article = rows[0];

  return (
    <article style={{ paddingTop: "12rem", paddingBottom: "5rem", minHeight: "100vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 5%" }}>
        <Link href="/berita" style={{ color: "var(--accent-blue)", textDecoration: "none", marginBottom: "2rem", display: "inline-block" }}>
          &larr; Kembali ke Berita
        </Link>
        
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "1rem", lineHeight: 1.2 }}>
          {article.judul}
        </h1>
        
        <div style={{ color: "var(--accent-purple)", marginBottom: "2rem", fontWeight: 600 }}>
          {new Date(article.created_at).toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        {article.image && (
          <div style={{ borderRadius: "16px", overflow: "hidden", marginBottom: "3rem" }}>
            <img 
              src={article.image} 
              alt={article.judul} 
              style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }} 
            />
          </div>
        )}

        <div 
          className="prose prose-invert"
          style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#ddd" }}
          dangerouslySetInnerHTML={{ __html: article.konten }} 
        />
      </div>
    </article>
  );
}
