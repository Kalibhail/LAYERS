"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function AuthButtons() {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session?.user) {
    return (
      <button onClick={() => router.push('/login')} className="text-sm hover:underline underline-offset-4">Sign in</button>
    );
  }
  return (
    <button onClick={() => router.push('/account')} className="text-sm hover:underline underline-offset-4">Account</button>
  );
}
