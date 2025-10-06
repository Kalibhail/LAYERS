import { db } from "@/lib/db";

export default async function AdminOrders() {
  const orders = await db.order.findMany({ orderBy: { createdAt: "desc" }, include: { items: true, user: true } });
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Orders</h2>
      <ul className="divide-y divide-black/10 border border-black/10 rounded-xl">
        {orders.map(o => (
          <li key={o.id} className="p-4">
            <div className="flex items-center justify-between text-sm">
              <div>
                <div className="font-medium">{o.email}</div>
                <div className="text-black/60">{new Date(o.createdAt).toLocaleString()} • {o.status}</div>
              </div>
              <div>{(o.total/100).toLocaleString(undefined, { style: 'currency', currency: o.currency })}</div>
            </div>
            <ul className="mt-2 text-sm text-black/80">
              {o.items.map(i => (
                <li key={i.id}>{i.title} × {i.quantity}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
