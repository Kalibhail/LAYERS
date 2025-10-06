import { db } from "@/lib/db";
import Link from "next/link";

export default async function AdminProducts() {
  const products = await db.product.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Products</h2>
        <Link href="/admin/products/new" className="text-sm underline underline-offset-4">New product</Link>
      </div>
      <ul className="divide-y divide-black/10 border border-black/10 rounded-xl">
        {products.map(p => (
          <li key={p.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-black/60">{p.slug}</div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link href={`/admin/products/${p.id}`} className="underline underline-offset-4">Edit</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
