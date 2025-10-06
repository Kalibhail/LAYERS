"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const title = String(formData.get('title') || '');
  const slug = String(formData.get('slug') || '');
  const price = Number(formData.get('price') || 0);
  const currency = String(formData.get('currency') || 'USD');
  const image = String(formData.get('image') || '');
  const description = String(formData.get('description') || '');
  await db.product.create({ data: { title, slug, price, currency, image, description, active: true, stock: 100 } });
  revalidatePath('/admin/products');
  redirect('/admin/products');
}
