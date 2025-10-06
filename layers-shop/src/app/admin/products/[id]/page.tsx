import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { updateProduct, deleteProduct } from "./server";

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await db.product.findUnique({ where: { id } });
  if (!p) return notFound();
  // ...
}
