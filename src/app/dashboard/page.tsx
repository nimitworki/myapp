import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  async function logout() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-1)" }}>
      <nav style={{
        background: "var(--navy)", borderBottom: "1px solid var(--navy-mid)",
        padding: "0 24px", height: 52,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "var(--r-6)",
            background: "rgba(40,195,227,0.15)", border: "1px solid rgba(40,195,227,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="var(--cyan)" strokeWidth="2.5" fill="none"/>
              <circle cx="10" cy="10" r="3" fill="var(--cyan)"/>
            </svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#fff", letterSpacing: "-0.2px" }}>myapp</span>
        </div>

        <LogoutButton action={logout} />
      </nav>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{
          background: "var(--bg-0)", border: "1px solid var(--b-subtle)",
          borderRadius: "var(--r-12)", padding: "28px 28px 24px",
          boxShadow: "var(--sh-sm)", marginBottom: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "var(--cyan-light)", border: "2px solid var(--cyan-mid)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cyan-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--t-primary)", marginBottom: 2 }}>ยินดีต้อนรับ</h2>
              <p style={{ fontSize: 12, color: "var(--t-muted)" }}>เข้าสู่ระบบสำเร็จ</p>
            </div>
          </div>

          <div style={{
            background: "var(--bg-1)", border: "1px solid var(--b-subtle)",
            borderRadius: "var(--r-8)", padding: "12px 16px",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 12, color: "var(--t-muted)", fontWeight: 500 }}>อีเมล</span>
            <span style={{ width: 1, height: 12, background: "var(--b-default)", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "var(--t-primary)", fontWeight: 500 }}>{user.email}</span>
          </div>
        </div>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "6px 12px", borderRadius: "var(--r-6)",
          background: "var(--s-success-bg)", border: "1px solid var(--s-success-border)",
          fontSize: 12, color: "var(--s-success)", fontWeight: 500,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--s-success)", flexShrink: 0 }} />
          Session active
        </div>
      </div>
    </main>
  );
}
