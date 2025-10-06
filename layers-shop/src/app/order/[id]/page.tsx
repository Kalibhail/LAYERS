import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function OrderConfirmation({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await db.order.findUnique({ where: { id }, include: { items: true } });
  if (!order) return notFound();
  // ...
}
