import Image from "next/image";
import Link from "next/link";

type ProductPreview = {
  id: string;
  slug: string;
  title: string;
  price: number;
  currency: string;
  image: string;
};

export function ProductCard({ product }: { product: ProductPreview }) {
  const price = new Intl.NumberFormat("en-US", { style: "currency", currency: product.currency }).format(product.price / 100);
  return (
    <Link href={`/product/${product.slug}`} className="group block overflow-hidden rounded-xl border border-black/10 bg-white">
      <div className="relative aspect-[4/5]">
        <Image src={product.image} alt={product.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-medium tracking-tight">{product.title}</h3>
          <span className="text-sm text-black/60">{price}</span>
        </div>
      </div>
    </Link>
  );
}
