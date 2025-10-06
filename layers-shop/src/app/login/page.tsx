"use client";

import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) {
      setError("Invalid credentials");
    } else {
      window.location.href = "/account";
    }
  }

  return (
    <div className="py-10 max-w-sm">
      <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full rounded-lg border border-black/10 px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input className="w-full rounded-lg border border-black/10 px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="w-full inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-white font-medium hover:bg-black/90">Sign in</button>
      </form>
      <p className="mt-4 text-sm text-black/60">No account? <Link href="/register" className="underline underline-offset-4">Create one</Link></p>
    </div>
  );
}
