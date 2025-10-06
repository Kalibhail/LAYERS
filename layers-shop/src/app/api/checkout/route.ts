import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const schema = z.object({
  email: z.string().email(),
  shippingName: z.string().min(1),
  shippingAddress1: z.string().min(1),
  shippingAddress2: z.string().optional().nullable(),
  shippingCity: z.string().min(1),
  shippingRegion: z.string().optional().nullable(),
  shippingPostalCode: z.string().min(1),
  shippingCountry: z.string().min(1),
  lines: z.array(z.object({ slug: z.string(), quantity: z.number().int().min(1) }))
});

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = schema.safeParse(json);
  if (!parsed.success) return new NextResponse("Invalid input", { status: 400 });

  const session: any = await getServerSession(authOptions as any);
  const data = parsed.data;

  const products = await db.product.findMany({ where: { slug: { in: data.lines.map(l => l.slug) } } });
  if (products.length !== data.lines.length) return new NextResponse("Invalid cart items", { status: 400 });

  let subtotal = 0;
  const items = data.lines.map((line) => {
    const product = products.find(p => p.slug === line.slug)!;
    subtotal += product.price * line.quantity;
    return {
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity: line.quantity,
      image: product.image,
    };
  });

  const order = await db.order.create({
    data: {
      userId: session?.user?.id ?? null,
      status: "PAID",
      subtotal,
      total: subtotal,
      currency: products[0].currency,
      email: data.email,
      shippingName: data.shippingName,
      shippingAddress1: data.shippingAddress1,
      shippingAddress2: data.shippingAddress2 || null,
      shippingCity: data.shippingCity,
      shippingRegion: data.shippingRegion || null,
      shippingPostalCode: data.shippingPostalCode,
      shippingCountry: data.shippingCountry,
      items: { create: items },
    },
  });

  return NextResponse.json({ id: order.id });
}
