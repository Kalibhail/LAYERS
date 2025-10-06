import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function ShopPage() {
  return (
    <div className="py-10">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
