"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartLine, CartState, Product } from "@/types";

interface CartContextValue {
  lines: CartLine[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  totalQuantity: number;
  subtotalCents: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "layers-cart-v1";

function loadCartFromStorage(): CartState {
  if (typeof window === "undefined") return { lines: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lines: [] };
    const parsed = JSON.parse(raw) as CartState;
    if (!Array.isArray(parsed.lines)) return { lines: [] };
    return { lines: parsed.lines.filter(l => typeof l.slug === "string" && l.quantity > 0) };
  } catch {
    return { lines: [] };
  }
}

function saveCartToStorage(state: CartState) {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => loadCartFromStorage().lines);

  useEffect(() => {
    saveCartToStorage({ lines });
  }, [lines]);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setLines(prev => {
      const existing = prev.find(l => l.slug === product.slug);
      if (existing) {
        return prev.map(l => (l.slug === product.slug ? { ...l, quantity: l.quantity + quantity } : l));
      }
      const line: CartLine = {
        id: product.id,
        slug: product.slug,
        title: product.title,
        price: product.price,
        currency: product.currency,
        image: product.image,
        quantity,
      };
      return [...prev, line];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setLines(prev => prev.filter(l => l.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    setLines(prev => prev.map(l => (l.slug === slug ? { ...l, quantity: Math.max(0, quantity) } : l)).filter(l => l.quantity > 0));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const totalQuantity = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const subtotalCents = useMemo(() => lines.reduce((sum, l) => sum + l.price * l.quantity, 0), [lines]);

  const value: CartContextValue = useMemo(() => ({ lines, addItem, removeItem, updateQuantity, clear, totalQuantity, subtotalCents }), [lines, addItem, removeItem, updateQuantity, clear, totalQuantity, subtotalCents]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
