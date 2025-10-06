"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProduct(formData: FormData) {
  const id = String(formData.get('id') || '');
  const title = String(formData.get('title') || '');
  const slug = String(formData.get('slug') || '');
  const price = Number(formData.get('price') || 0);
  const currency = String(formData.get('currency') || 'USD');
  const image = String(formData.get('image') || '');
  const description = String(formData.get('description') || '');
  await db.product.update({ where: { id }, data: { title, slug, price, currency, image, description } });
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function deleteProduct(formData: FormData) {
  const id = String(formData.get('id') || '');
  await db.product.delete({ where: { id } });
  revalidatePath('/admin/products');
  redirect('/admin/products');
}
