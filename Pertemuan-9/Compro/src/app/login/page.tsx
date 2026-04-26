"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusUser, setFocusUser] = useState(false);
  const [focusPass, setFocusPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { redirect: false, username, password });
    if (res?.error) {
      setError("Username atau password salah.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(ellipse at 20% 50%, rgba(30,64,175,0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.25) 0%, transparent 50%), #050510",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Animated floating orbs */}
      <div style={{
        position: "absolute", top: "10%", left: "15%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
        borderRadius: "50%", animation: "float1 8s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "10%",
        width: "350px", height: "350px",
        background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
        borderRadius: "50%", animation: "float2 10s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-30px) scale(1.05)} }
        @keyframes float2 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(20px) scale(0.95)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        .login-btn:hover { background: linear-gradient(135deg, #2563eb, #0ea5e9) !important; transform: translateY(-2px) !important; box-shadow: 0 20px 40px rgba(59,130,246,0.4) !important; }
        .login-btn:active { transform: translateY(0) !important; }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none !important; }
      `}</style>

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: "440px",
        margin: "20px",
        animation: "fadeUp 0.6s ease forwards",
        position: "relative", zIndex: 10,
      }}>
        <div style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "24px",
          padding: "48px 44px",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05) inset",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Top glow bar */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "3px",
            background: "linear-gradient(90deg, transparent, #3b82f6, #06b6d4, transparent)",
          }} />
          {/* Shimmer overlay */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "24px",
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)",
            pointerEvents: "none",
          }} />

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            {/* Logo icon */}
            <div style={{
              width: "72px", height: "72px",
              background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.1))",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: "20px",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
              boxShadow: "0 0 30px rgba(59,130,246,0.2)",
            }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>

            <h1 style={{
              fontSize: "28px", fontWeight: 800, margin: "0 0 8px",
              background: "linear-gradient(135deg, #fff 0%, #94a3b8 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", letterSpacing: "-0.5px",
            }}>
              Digi<span style={{ WebkitTextFillColor: "#60a5fa", backgroundImage: "none" }}>Tech</span>
            </h1>
            <p style={{ color: "#64748b", fontSize: "14px", margin: 0, letterSpacing: "0.3px" }}>
              Secure Admin Area
            </p>
          </div>

          {/* Error box */}
          {error && (
            <div style={{
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "12px", padding: "12px 16px",
              color: "#fca5a5", fontSize: "13px", textAlign: "center",
              marginBottom: "24px",
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block", fontSize: "11px", fontWeight: 600,
                color: "#475569", textTransform: "uppercase", letterSpacing: "1px",
                marginBottom: "8px",
              }}>Username</label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                  color: focusUser ? "#60a5fa" : "#475569", transition: "color 0.2s",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text" required value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusUser(true)}
                  onBlur={() => setFocusUser(false)}
                  placeholder="Masukkan username"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: "rgba(0,0,0,0.3)",
                    border: `1px solid ${focusUser ? "rgba(59,130,246,0.6)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: "12px",
                    padding: "14px 16px 14px 44px",
                    color: "#e2e8f0", fontSize: "14px",
                    outline: "none",
                    boxShadow: focusUser ? "0 0 0 3px rgba(59,130,246,0.15)" : "none",
                    transition: "all 0.2s",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "32px" }}>
              <label style={{
                display: "block", fontSize: "11px", fontWeight: 600,
                color: "#475569", textTransform: "uppercase", letterSpacing: "1px",
                marginBottom: "8px",
              }}>Password</label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                  color: focusPass ? "#60a5fa" : "#475569", transition: "color 0.2s",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"} required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusPass(true)}
                  onBlur={() => setFocusPass(false)}
                  placeholder="Masukkan password"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: "rgba(0,0,0,0.3)",
                    border: `1px solid ${focusPass ? "rgba(59,130,246,0.6)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: "12px",
                    padding: "14px 48px 14px 44px",
                    color: "#e2e8f0", fontSize: "14px",
                    outline: "none",
                    boxShadow: focusPass ? "0 0 0 3px rgba(59,130,246,0.15)" : "none",
                    transition: "all 0.2s",
                  }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#475569", padding: "4px",
                  display: "flex", alignItems: "center",
                }}>
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} className="login-btn" style={{
              width: "100%", padding: "15px",
              background: "linear-gradient(135deg, #2563eb 0%, #0284c7 100%)",
              border: "none", borderRadius: "12px",
              color: "#fff", fontSize: "15px", fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              boxShadow: "0 8px 24px rgba(37,99,235,0.35)",
              transition: "all 0.2s ease",
              letterSpacing: "0.3px",
            }}>
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  Masuk ke Dashboard
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "24px", color: "#334155", fontSize: "12px" }}>
            © 2026 DigiTech • Secure Control Panel
          </p>
        </div>
      </div>
    </div>
  );
}
