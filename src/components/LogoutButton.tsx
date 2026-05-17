"use client";

export function LogoutButton({ action }: { action: () => Promise<void> }) {
  return (
    <form action={action}>
      <button type="submit" className="skx-btn-ghost-light">
        ออกจากระบบ
      </button>
    </form>
  );
}
