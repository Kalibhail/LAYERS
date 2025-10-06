"use client";

import Link from "next/link";
import { CartBadge } from "./CartBadge";
import { AuthButtons } from "./AuthButtons";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight">Layers</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/shop" className="hover:underline underline-offset-4">Shop</Link>
          <Link href="/about" className="hover:underline underline-offset-4">About</Link>
          <Link href="/faq" className="hover:underline underline-offset-4">FAQ</Link>
        </nav>
        <div className="flex items-center gap-4">
          <AuthButtons />
          <Link href="/admin" className="text-sm hover:underline underline-offset-4 hidden md:inline">Admin</Link>
          <Link href="/cart" className="relative inline-flex items-center gap-2">
            <span>Cart</span>
            <CartBadge />
          </Link>
        </div>
      </div>
    </header>
  );
}
