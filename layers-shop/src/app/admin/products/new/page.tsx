import { createProduct } from "./server";

export default function NewProductPage() {
  return (
    <form action={createProduct} className="max-w-md space-y-4">
      <h2 className="text-lg font-semibold">New product</h2>
      <div>
        <label className="block text-sm mb-1">Title</label>
        <input name="title" className="w-full rounded-lg border border-black/10 px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm mb-1">Slug</label>
        <input name="slug" className="w-full rounded-lg border border-black/10 px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm mb-1">Price (cents)</label>
        <input name="price" type="number" className="w-full rounded-lg border border-black/10 px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm mb-1">Currency</label>
        <input name="currency" defaultValue="USD" className="w-full rounded-lg border border-black/10 px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm mb-1">Image URL</label>
        <input name="image" defaultValue="/products/layer-tee.svg" className="w-full rounded-lg border border-black/10 px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm mb-1">Description</label>
        <textarea name="description" className="w-full rounded-lg border border-black/10 px-3 py-2" required />
      </div>
      <button className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-white font-medium hover:bg-black/90">Create</button>
    </form>
  );
}
