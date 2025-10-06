"use client";

import { useId } from "react";

export function QuantityInput({ value, onChange, min = 1, max = 10 }: { value: number; onChange: (v: number) => void; min?: number; max?: number; }) {
  const id = useId();
  return (
    <div className="inline-flex items-stretch rounded-lg border border-black/10 overflow-hidden">
      <button type="button" aria-label="Decrease" className="px-3 py-2 text-lg" onClick={() => onChange(Math.max(min, value - 1))}>–</button>
      <label htmlFor={id} className="sr-only">Quantity</label>
      <input id={id} inputMode="numeric" pattern="[0-9]*" value={value} onChange={e => onChange(Math.max(min, Math.min(max, Number(e.target.value) || min)))} className="w-12 text-center outline-none" />
      <button type="button" aria-label="Increase" className="px-3 py-2 text-lg" onClick={() => onChange(Math.min(max, value + 1))}>+</button>
    </div>
  );
}
