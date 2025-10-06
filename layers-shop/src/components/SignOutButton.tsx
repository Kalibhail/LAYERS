"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: '/' })} className="text-sm hover:underline underline-offset-4">
      Sign out
    </button>
  );
}
