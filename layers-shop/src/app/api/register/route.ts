import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return new NextResponse("Invalid input", { status: 400 });
  }
  const { name, email, password } = parsed.data;
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return new NextResponse("Email already in use", { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({ data: { name, email, hashedPassword, role: "USER" } });
  return NextResponse.json({ ok: true });
}
