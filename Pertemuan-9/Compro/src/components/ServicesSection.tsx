/* ── Services static data (fallback / initial render) ── */
const SERVICES = [
  {
    icon: "🧠",
    title: "Integrasi AI",
    desc: "Implementasi kecerdasan buatan tingkat lanjut untuk mengotomatisasi kompleksitas dan meningkatkan efisiensi operasional bisnis Anda.",
  },
  {
    icon: "☁️",
    title: "Cloud Nexus",
    desc: "Arsitektur cloud masa depan yang skalabel, aman, dan dirancang khusus untuk performa tinggi tanpa batas.",
  },
  {
    icon: "🛡️",
    title: "Cyber Fortress",
    desc: "Sistem keamanan siber mutakhir dengan perlindungan proaktif yang menjaga aset digital Anda dari ancaman tercanggih.",
  },
  {
    icon: "💻",
    title: "Custom Software",
    desc: "Pengembangan aplikasi web dan mobile yang disesuaikan penuh dengan kebutuhan bisnis Anda — dari ideasi hingga production.",
  },
  {
    icon: "📊",
    title: "Data Analytics",
    desc: "Transformasi data mentah menjadi insight bisnis yang actionable melalui dashboard real-time dan predictive analytics.",
  },
  {
    icon: "⚙️",
    title: "DevOps & CI/CD",
    desc: "Automasi pipeline delivery, containerisasi, dan kultur DevOps yang mempercepat time-to-market hingga 10x lebih cepat.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="services">
      <h2 className="section-title">
        Inovasi <span className="text-gradient">Terdepan</span>
      </h2>
      <p className="section-subtitle">
        Kami menyediakan solusi teknologi end-to-end untuk transformasi digital bisnis Anda
      </p>
      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <div className="card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="card-icon">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="card-shine" />
          </div>
        ))}
      </div>
    </section>
  );
}
