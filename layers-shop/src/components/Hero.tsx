"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onScroll = () => {
      const y = window.scrollY;
      const translate = Math.min(40, y / 20);
      node.style.setProperty("--hero-translate", `${translate}px`);
      const blur = Math.min(8, y / 80);
      node.style.setProperty("--hero-blur", `${blur}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden rounded-2xl border border-black/10 bg-black text-white">
      <div className="absolute inset-0 [filter:blur(var(--hero-blur,0))]">
        <Image src="/products/layer-hoodie.svg" alt="Hero background" fill priority className="object-cover opacity-80" />
      </div>
      <div className="relative z-10 grid min-h-[60vh] place-items-center py-24" style={{ transform: "translateY(var(--hero-translate,0))" }}>
        <div className="text-center max-w-2xl px-6">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">Build your look in Layers</h1>
          <p className="mt-4 text-white/80">Minimal staples with meticulous details. Designed for everyday versatility.</p>
          <a href="/shop" className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-black font-medium hover:bg-white/90">Shop the drop</a>
        </div>
      </div>
    </section>
  );
}
