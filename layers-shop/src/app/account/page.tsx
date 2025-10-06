import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SignOutButton } from "@/components/SignOutButton";
import Link from "next/link";
import { db } from "@/lib/db";

export default async function AccountPage() {
  const session = (await getServerSession(authOptions as any)) as any;
  if (!session?.user?.id) {
    return (
      <div className="py-10">
        <h1 className="text-2xl font-semibold tracking-tight">Account</h1>
        <p className="mt-2 text-black/60">You must be signed in to view this page.</p>
        <Link href="/login" className="mt-4 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-white font-medium hover:bg-black/90">Sign in</Link>
      </div>
    );
  }

  const orders = await db.order.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" }, include: { items: true } });

  return (
    <div className="py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Account</h1>
        <SignOutButton />
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-medium">Orders</h2>
        {orders.length === 0 ? (
          <p className="mt-2 text-black/60">No orders yet.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {orders.map(o => (
              <li key={o.id} className="rounded-xl border border-black/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-black/60">{o.status}</div>
                    <div className="text-sm">{new Date(o.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-sm">{(o.total/100).toLocaleString(undefined, { style: 'currency', currency: o.currency })}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
