"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogoMark } from "@/components/LogoMark";
import { ErrorAlert } from "@/components/ErrorAlert";

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
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-1)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <LogoMark />

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

            {error && <ErrorAlert message={error} />}

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
