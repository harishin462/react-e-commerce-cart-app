"use client";

import React from "react";
import Navbar from "@/components/cart/Navbar";
import CartList from "@/components/cart/CartList";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>
        <CartList />
      </main>
      <footer className="border-t border-[var(--color-border)] py-6 text-center text-sm text-[var(--color-muted-foreground)]">
        Dibuat dengan Next.js, React, dan Tailwind CSS.
      </footer>
    </div>
  );
}