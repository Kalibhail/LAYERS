import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-black/10">
      <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-black/60">
        <p>© {new Date().getFullYear()} Layers. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="mailto:hello@example.com" className="hover:underline underline-offset-4">Contact</a>
          <Link href="/faq" className="hover:underline underline-offset-4">FAQ</Link>
          <Link href="/returns" className="hover:underline underline-offset-4">Return Policy</Link>
        </div>
      </div>
    </footer>
  );
}
