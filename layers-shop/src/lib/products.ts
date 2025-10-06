import { db } from "@/lib/db";

export async function getAllProducts() {
  return db.product.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } });
}

export async function getProductBySlug(slug: string) {
  return db.product.findUnique({ where: { slug } });
}
