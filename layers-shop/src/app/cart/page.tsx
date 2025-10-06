"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/providers/CartProvider";

export default function CartPage() {
  const { lines, updateQuantity, removeItem, subtotalCents, totalQuantity, clear } = useCart();
  const formattedSubtotal = new Intl.NumberFormat("en-US", { style: "currency", currency: lines[0]?.currency || "USD" }).format(subtotalCents / 100);

  if (lines.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Your cart is empty</h1>
        <p className="mt-2 text-black/60">Browse the collection to add items.</p>
        <Link href="/shop" className="mt-6 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-white font-medium hover:bg-black/90">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="py-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
      <div className="space-y-6">
        {lines.map(line => (
          <div key={line.slug} className="flex items-center gap-4 border border-black/10 rounded-xl p-3">
            <div className="relative h-24 w-20 overflow-hidden rounded-lg bg-white">
              <Image src={line.image} alt={line.title} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-medium truncate">{line.title}</h3>
                <button onClick={() => removeItem(line.slug)} className="text-sm text-black/60 hover:underline underline-offset-4">Remove</button>
              </div>
              <div className="mt-2 flex items-center gap-4">
                <div className="inline-flex items-center rounded-lg border border-black/10 overflow-hidden">
                  <button className="px-3 py-2" onClick={() => updateQuantity(line.slug, line.quantity - 1)}>–</button>
                  <div className="w-10 text-center">{line.quantity}</div>
                  <button className="px-3 py-2" onClick={() => updateQuantity(line.slug, line.quantity + 1)}>+</button>
                </div>
                <div className="ml-auto text-sm text-black/60">
                  {(line.price * line.quantity / 100).toLocaleString(undefined, { style: "currency", currency: line.currency })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <aside className="border border-black/10 rounded-xl p-6 h-max sticky top-24">
        <h2 className="text-lg font-semibold tracking-tight">Summary</h2>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span>Items</span>
          <span>{totalQuantity}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span>Subtotal</span>
          <span>{formattedSubtotal}</span>
        </div>
        <button onClick={() => { clear(); alert("Order placed. This is a demo checkout."); }} className="mt-6 w-full inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-white font-medium hover:bg-black/90">Checkout</button>
        <p className="mt-2 text-xs text-black/60">Checkout is simulated for demo purposes.</p>
      </aside>
    </div>
  );
}
