"use client"

import React from "react";
import { useCartStore } from "@/hooks/useCartStore";

export default function Navbar() {
  // Compute directly in selectors to avoid function calls in render
  const itemCount = useCartStore((state) => 
    state.products.reduce((acc, p) => acc + (state.quantities[p.id] ?? 0), 0)
  );
  const totalPrice = useCartStore((state) => 
    state.products.reduce((acc, p) => acc + (state.quantities[p.id] ?? 0) * p.price, 0)
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-[var(--color-border)] dark:bg-black/30">
      <nav className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">ShopCart</span>
          <span className="text-xs text-[var(--color-muted-foreground)]">React + Tailwind</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative inline-flex items-center gap-2">
            <span className="text-sm text-[var(--color-muted-foreground)] hidden sm:inline">Items</span>
            <span className="inline-flex items-center justify-center min-w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-3 text-sm font-semibold">
              {itemCount}
            </span>
          </div>
          <div className="text-sm sm:text-base font-semibold">
            Total: <span className="tabular-nums">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </nav>
    </header>
  );
}