import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Link href="/admin/products" className="rounded-xl border border-black/10 p-6 hover:bg-black/[.02]">Manage Products →</Link>
      <Link href="/admin/orders" className="rounded-xl border border-black/10 p-6 hover:bg-black/[.02]">Manage Orders →</Link>
    </div>
  );
}
