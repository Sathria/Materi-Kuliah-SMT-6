module.exports = {
  apps: [
    {
      name: "digitech-web",
      script: "server.js",
      cwd: "./.next/standalone",
      instances: "max", // Atau jumlah core yang diinginkan, misal: 2
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        // (Isi dengan env variabel lain pada saat manual run atau diatur di file .env tersendiri)
      },
    },
  ],
};
