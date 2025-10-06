"use client";

import { useState } from "react";
import { QuantityInput } from "@/components/QuantityInput";
import { useCart } from "@/providers/CartProvider";

type ProductCart = { id: string; slug: string; title: string; price: number; currency: string; image: string; };

export function AddToCartClient({ product }: { product: ProductCart }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  return (
    <div className="mt-8 flex items-center gap-4">
      <QuantityInput value={qty} onChange={setQty} />
      <button onClick={() => addItem(product, qty)} className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-white font-medium hover:bg-black/90">Add to cart</button>
    </div>
  );
}
