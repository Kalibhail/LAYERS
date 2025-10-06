// next-auth v5 types are inferred via satisfies; avoid named type import
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authConfig = {
  adapter: PrismaAdapter(db) as any,
  session: { strategy: "jwt" as const },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (raw) => {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        const user = await db.user.findUnique({ where: { email } });
        if (!user || !user.hashedPassword) return null;
        const ok = await bcrypt.compare(password, user.hashedPassword);
        if (!ok) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role } as any;
      },
    }) as any,
  ] as any,
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.role = (user as any).role ?? "USER";
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
        (session.user as any).role = (token as any).role ?? "USER";
      }
      return session;
    },
  } as any,
  secret: process.env.AUTH_SECRET,
} as any;
