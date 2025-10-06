"use client";

import { useCart } from "@/providers/CartProvider";

export function CartBadge() {
  const { totalQuantity } = useCart();
  if (totalQuantity <= 0) return null;
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-xs font-medium text-white">
      {totalQuantity}
    </span>
  );
}
