export function LogoMark() {
  return (
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
  );
}
