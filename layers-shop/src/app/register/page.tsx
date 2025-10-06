"use client";

import { useState, FormEvent } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ name, email, password });
    if (!parsed.success) {
      setError("Please fill all fields correctly.");
      return;
    }
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    if (!res.ok) {
      const msg = await res.text();
      setError(msg || "Registration failed");
      return;
    }
    router.push("/login");
  }

  return (
    <div className="py-10 max-w-sm">
      <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input className="w-full rounded-lg border border-black/10 px-3 py-2" value={name} onChange={e=>setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input className="w-full rounded-lg border border-black/10 px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input className="w-full rounded-lg border border-black/10 px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="w-full inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-white font-medium hover:bg-black/90">Create account</button>
      </form>
    </div>
  );
}
