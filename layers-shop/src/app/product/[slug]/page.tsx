import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { AddToCartClient } from "./client";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
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
        <AddToCartClient product={product} />
      </div>
    </div>
  );
}
