import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";

export default async function Home() {
  const all = await getAllProducts();
  const featured = all.slice(0, 3);
  return (
    <div className="space-y-16 py-8">
      <Hero />
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">Featured</h2>
          <a href="/shop" className="text-sm text-black/60 hover:underline underline-offset-4">View all</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
