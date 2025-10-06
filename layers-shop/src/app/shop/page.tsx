export const dynamic = 'force-dynamic';
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";

export default async function ShopPage() {
  const products = await getAllProducts();
  return (
    <div className="py-10">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <ProductCard key={p.id} product={{ id: p.id, slug: p.slug, title: p.title, price: p.price, currency: p.currency, image: p.image }} />
        ))}
      </div>
    </div>
  );
}
