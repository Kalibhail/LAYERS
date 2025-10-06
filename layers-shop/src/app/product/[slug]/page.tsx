"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/providers/CartProvider";
import { useMemo, useState } from "react";
import { QuantityInput } from "@/components/QuantityInput";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = useMemo(() => products.find(p => p.slug === params.slug), [params.slug]);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return notFound();
  const price = new Intl.NumberFormat("en-US", { style: "currency", currency: product.currency }).format(product.price / 100);

  return (
    <div className="py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-black/10 bg-white">
          <Image src={product.image} alt={product.title} fill className="object-cover" />
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{product.title}</h1>
        <p className="mt-2 text-black/60">{price}</p>
        <p className="mt-6 text-black/80 max-w-prose">{product.description}</p>
        <div className="mt-8 flex items-center gap-4">
          <QuantityInput value={qty} onChange={setQty} />
          <button onClick={() => addItem(product, qty)} className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-white font-medium hover:bg-black/90">Add to cart</button>
        </div>
      </div>
    </div>
  );
}
