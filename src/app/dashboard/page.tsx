import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">My App</h1>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            ออกจากระบบ
          </button>
        </form>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            ยินดีต้อนรับ
          </h2>
          <p className="text-sm text-gray-500 mb-6">เข้าสู่ระบบสำเร็จ</p>

          <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-700">
            <span className="font-medium">อีเมล: </span>
            {user.email}
          </div>
        </div>
      </div>
    </main>
  );
}
