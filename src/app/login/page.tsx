"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main
      style={{ minHeight: "100vh", background: "var(--bg-1)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, justifyContent: "center" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "var(--r-8)",
            background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="var(--cyan)" strokeWidth="2.5" fill="none"/>
              <circle cx="10" cy="10" r="3" fill="var(--cyan)"/>
            </svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", letterSpacing: "-0.3px" }}>myapp</span>
        </div>

        {/* Card */}
        <div style={{
          background: "var(--bg-0)", border: "1px solid var(--b-subtle)",
          borderRadius: "var(--r-12)", padding: "32px 28px",
          boxShadow: "var(--sh-md)",
        }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--t-primary)", marginBottom: 4 }}>เข้าสู่ระบบ</h1>
          <p style={{ fontSize: 13, color: "var(--t-muted)", marginBottom: 24 }}>ยินดีต้อนรับกลับมา</p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label className="skx-label">อีเมล</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="skx-input"
              />
            </div>

            <div>
              <label className="skx-label">รหัสผ่าน</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="skx-input"
              />
            </div>

            {error && (
              <div className="skx-alert-danger">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0, marginTop: 1 }}>
                  <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 4.5zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button type="submit" disabled={loading} className="skx-btn skx-btn-primary" style={{ marginTop: 4 }}>
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>

          <p style={{ marginTop: 20, textAlign: "center", fontSize: 13, color: "var(--t-muted)" }}>
            ยังไม่มีบัญชี?{" "}
            <a href="/register" style={{ color: "var(--cyan-dark)", fontWeight: 600, textDecoration: "none" }}>
              สมัครสมาชิก
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
