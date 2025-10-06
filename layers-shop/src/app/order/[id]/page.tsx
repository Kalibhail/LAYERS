import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function OrderConfirmation({ params }: { params: { id: string } }) {
  const order = await db.order.findUnique({ where: { id: params.id }, include: { items: true } });
  if (!order) return notFound();
  return (
    <div className="py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Order confirmed</h1>
      <p className="mt-2 text-black/60">Your order ID is {order.id}.</p>
      <div className="mt-6 rounded-xl border border-black/10 p-4">
        <div className="flex items-center justify-between text-sm">
          <div>
            <div>{order.shippingName}</div>
            <div className="text-black/60">{order.email}</div>
          </div>
          <div>{(order.total/100).toLocaleString(undefined, { style: 'currency', currency: order.currency })}</div>
        </div>
        <ul className="mt-4 space-y-2">
          {order.items.map(i => (
            <li key={i.id} className="flex items-center justify-between text-sm">
              <div>{i.title} × {i.quantity}</div>
              <div>{((i.price * i.quantity)/100).toLocaleString(undefined, { style: 'currency', currency: order.currency })}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
