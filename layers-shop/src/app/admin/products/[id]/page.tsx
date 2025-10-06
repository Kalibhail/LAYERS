import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { updateProduct, deleteProduct } from "./server";

export default async function EditProduct({ params }: { params: { id: string } }) {
  const p = await db.product.findUnique({ where: { id: params.id } });
  if (!p) return notFound();
  return (
    <form action={updateProduct} className="max-w-md space-y-4">
      <input type="hidden" name="id" value={p.id} />
      <h2 className="text-lg font-semibold">Edit product</h2>
      <div>
        <label className="block text-sm mb-1">Title</label>
        <input name="title" defaultValue={p.title} className="w-full rounded-lg border border-black/10 px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm mb-1">Slug</label>
        <input name="slug" defaultValue={p.slug} className="w-full rounded-lg border border-black/10 px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm mb-1">Price (cents)</label>
        <input name="price" type="number" defaultValue={p.price} className="w-full rounded-lg border border-black/10 px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm mb-1">Currency</label>
        <input name="currency" defaultValue={p.currency} className="w-full rounded-lg border border-black/10 px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm mb-1">Image URL</label>
        <input name="image" defaultValue={p.image} className="w-full rounded-lg border border-black/10 px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm mb-1">Description</label>
        <textarea name="description" defaultValue={p.description} className="w-full rounded-lg border border-black/10 px-3 py-2" required />
      </div>
      <div className="flex gap-3">
        <button className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-white font-medium hover:bg-black/90">Save</button>
        <button formAction={deleteProduct} className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-white font-medium hover:bg-red-700">Delete</button>
      </div>
    </form>
  );
}
