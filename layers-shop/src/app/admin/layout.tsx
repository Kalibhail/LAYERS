import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = (await getServerSession(authOptions as any)) as any;
  const role = (session?.user as { role?: 'USER' | 'ADMIN' } | undefined)?.role;
  if (!session?.user || role !== 'ADMIN') {
    redirect('/login');
  }
  return (
    <div className="py-10">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">Admin</h1>
      {children}
    </div>
  );
}
