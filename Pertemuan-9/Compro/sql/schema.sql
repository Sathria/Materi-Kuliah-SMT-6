-- =============================================================
-- DigiTech Company Profile – MySQL Schema
-- Compatible: MySQL 8.0+
-- =============================================================

CREATE DATABASE IF NOT EXISTS dbcompro_2388010002 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dbcompro_2388010002;

-- -------------------------------------------------------------
-- Table: layanan (Services)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS layanan (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nama       VARCHAR(120)  NOT NULL,
  icon       VARCHAR(60)   NOT NULL DEFAULT 'code',
  deskripsi  TEXT          NOT NULL,
  urutan     TINYINT       NOT NULL DEFAULT 0,
  created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- Table: berita (News / Blog)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS berita (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  judul        VARCHAR(255)  NOT NULL,
  slug         VARCHAR(280)  NOT NULL UNIQUE,
  excerpt      VARCHAR(400)  NOT NULL,
  konten       LONGTEXT      NOT NULL,
  image        VARCHAR(512)  NULL,
  is_published TINYINT(1)    NOT NULL DEFAULT 1,
  created_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_published (is_published),
  INDEX idx_created   (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- Table: kontak (Contact Form Submissions)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS kontak (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nama       VARCHAR(120) NOT NULL,
  email      VARCHAR(200) NOT NULL,
  subjek     VARCHAR(200) NOT NULL DEFAULT '',
  pesan      TEXT         NOT NULL,
  is_read    TINYINT(1)   NOT NULL DEFAULT 0,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_read (is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- Seed: layanan
-- -------------------------------------------------------------
INSERT INTO layanan (nama, icon, deskripsi, urutan) VALUES
  ('Integrasi AI',    'brain',   'Implementasi kecerdasan buatan tingkat lanjut untuk mengotomatisasi kompleksitas dan meningkatkan efisiensi operasional bisnis Anda dengan teknologi machine learning terkini.',          1),
  ('Cloud Nexus',     'cloud',   'Arsitektur cloud masa depan yang skalabel, aman, dan dirancang khusus untuk performa tinggi tanpa batas. Migrasi, optimasi, dan manajemen infrastruktur cloud enterprise.',               2),
  ('Cyber Fortress',  'shield',  'Sistem keamanan siber mutakhir dengan perlindungan proaktif 24/7 yang menjaga aset digital Anda dari ancaman tercanggih menggunakan AI-driven threat intelligence.',                      3),
  ('Custom Software', 'layers',  'Pengembangan aplikasi web dan mobile yang disesuaikan penuh dengan kebutuhan bisnis Anda — dari ideasi hingga deployment production.',                                                      4),
  ('Data Analytics',  'bar-chart','Transformasi data mentah menjadi insight bisnis yang actionable melalui dashboard real-time, predictive analytics, dan laporan interaktif berbasis BI tools modern.',                    5),
  ('DevOps & CI/CD',  'git-merge','Automasi pipeline delivery, containerisasi (Docker/Kubernetes), dan kultur DevOps yang mempercepat time-to-market hingga 10x lebih cepat.',                                              6)
ON DUPLICATE KEY UPDATE nama = VALUES(nama);

-- -------------------------------------------------------------
-- Seed: berita
-- -------------------------------------------------------------
INSERT INTO berita (judul, slug, excerpt, konten, image) VALUES
  (
    'DigiTech Raih Penghargaan Best Tech Company 2026',
    'digitech-raih-penghargaan-best-tech-company-2026',
    'DigiTech berhasil meraih penghargaan bergengsi sebagai Best Tech Company 2026 dari Asia Pacific Innovation Awards atas kontribusinya dalam transformasi digital di kawasan ASEAN.',
    '<p>DigiTech dengan bangga mengumumkan bahwa perusahaan telah berhasil meraih penghargaan bergengsi <strong>Best Tech Company 2026</strong> dari Asia Pacific Innovation Awards. Penghargaan ini diberikan atas kontribusi luar biasa DigiTech dalam memimpin transformasi digital di kawasan ASEAN.</p><p>Dalam acara yang dihadiri lebih dari 500 pemimpin industri teknologi dari 15 negara, DigiTech diakui atas inovasi produk-produknya yang revolusioner, dampak sosial yang signifikan, dan pertumbuhan bisnis yang konsisten selama tiga tahun berturut-turut.</p><p>"Penghargaan ini bukan hanya milik tim DigiTech, tapi juga milik seluruh klien dan mitra yang telah mempercayai kami," ujar CEO DigiTech, Moh Firdaus.</p>',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'
  ),
  (
    'Peluncuran Platform AI Generatif DigiMind v2.0',
    'peluncuran-platform-ai-generatif-digimind-v2',
    'DigiTech memperkenalkan DigiMind v2.0, platform AI generatif berbahasa Indonesia pertama yang mampu memahami konteks bisnis lokal dan menghasilkan konten berkualitas tinggi secara otomatis.',
    '<p>Setelah 18 bulan riset dan pengembangan, DigiTech secara resmi meluncurkan <strong>DigiMind v2.0</strong> — platform kecerdasan buatan generatif yang dirancang khusus untuk ekosistem bisnis Indonesia.</p><p>DigiMind v2.0 hadir dengan kemampuan pemahaman bahasa Indonesia yang jauh lebih akurat, dukungan untuk lebih dari 20 dialek regional, dan integrasi langsung dengan sistem ERP, CRM, serta e-commerce platform populer di Indonesia.</p><p>Platform ini telah diuji coba oleh 50+ perusahaan selama fase beta, dengan rata-rata peningkatan produktivitas sebesar <strong>340%</strong> dalam pengelolaan dokumen dan komunikasi bisnis.</p>',
    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80'
  ),
  (
    'Kemitraan Strategis dengan AWS untuk Solusi Cloud Enterprise',
    'kemitraan-strategis-aws-cloud-enterprise',
    'DigiTech menandatangani perjanjian kemitraan strategis dengan Amazon Web Services (AWS) untuk menghadirkan solusi cloud enterprise kelas dunia bagi bisnis skala menengah dan besar di Indonesia.',
    '<p>DigiTech dan <strong>Amazon Web Services (AWS)</strong> resmi menandatangani perjanjian kemitraan strategis yang akan memperkuat layanan cloud computing DigiTech di seluruh Indonesia.</p><p>Melalui kemitraan ini, DigiTech menjadi <em>AWS Advanced Consulting Partner</em> pertama yang berbasis di Indonesia Timur, membuka akses ke teknologi cloud AWS terdepan termasuk layanan AI/ML, IoT, dan keamanan siber untuk klien-klien enterprise.</p><p>Program kemitraan ini juga mencakup pelatihan sertifikasi AWS untuk 200 engineer DigiTech sepanjang tahun 2026, memastikan standar layanan tertinggi bagi seluruh klien.</p>',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
  ),
  (
    'Workshop DevOps & Kubernetes Gratis untuk Startup Indonesia',
    'workshop-devops-kubernetes-gratis-startup-indonesia',
    'DigiTech membuka program workshop DevOps & Kubernetes gratis untuk 100 startup Indonesia terpilih sebagai bentuk komitmen mendukung ekosistem teknologi nasional.',
    '<p>Sebagai bagian dari program <strong>DigiTech for Startups</strong>, kami dengan bangga mengumumkan program workshop DevOps & Kubernetes gratis untuk 100 startup Indonesia terpilih.</p><p>Workshop 3 hari intensif ini akan mencakup materi containerisasi dengan Docker, orkestrasi dengan Kubernetes, implementasi CI/CD pipeline, monitoring & observability, serta best practices keamanan cloud-native.</p><p>Peserta terpilih akan mendapatkan akses ke platform cloud DigiTech senilai Rp 5 juta selama 3 bulan, mentoring langsung dari senior engineer DigiTech, dan sertifikasi resmi yang diakui industri.</p>',
    'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80'
  ),
  (
    'Laporan Riset: Tren Keamanan Siber Indonesia 2026',
    'laporan-riset-tren-keamanan-siber-indonesia-2026',
    'Tim riset DigiTech menerbitkan laporan komprehensif tentang lanskap keamanan siber Indonesia 2026, mengungkap tren ancaman terbaru dan rekomendasi mitigasi untuk perusahaan Indonesia.',
    '<p>Tim riset DigiTech Cyber Intelligence merilis laporan tahunan <strong>"Indonesia Cybersecurity Landscape 2026"</strong> yang menjadi referensi utama bagi lebih dari 500 CISO dan pemimpin keamanan siber di Indonesia.</p><p>Laporan setebal 120 halaman ini menganalisis lebih dari 2 juta insiden keamanan yang terjadi sepanjang 2025, mengidentifikasi pola serangan baru, dan memberikan rekomendasi praktis untuk memperkuat postur keamanan organisasi di era AI.</p><p>Temuan kunci: serangan ransomware meningkat 280% YoY, phishing via AI-generated content menjadi ancaman terbesar, dan 73% perusahaan Indonesia belum memiliki incident response plan yang memadai.</p>',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80'
  )
ON DUPLICATE KEY UPDATE judul = VALUES(judul);

-- -------------------------------------------------------------
-- Table: users (Admin Login)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username   VARCHAR(100) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  role       VARCHAR(50)  NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -------------------------------------------------------------
-- Seed: users
-- -------------------------------------------------------------
-- Note: Password di bawah adalah hash bcrypt dari "admin123"
INSERT INTO users (username, password, role) VALUES
  ('admin', '$2b$10$AYEh3JcdZRr76lMBa3jyVOp7ljwlJRiS205Hs.3vNVKXqsxCrlUrq', 'admin')
ON DUPLICATE KEY UPDATE password = VALUES(password);
