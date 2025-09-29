"use client"

import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { useCartStore } from "@/hooks/useCartStore";

export default function CartList() {
  const products = useCartStore((s) => s.products);
  const quantities = useCartStore((s) => s.quantities);
  const loading = useCartStore((s) => s.loading);
  const error = useCartStore((s) => s.error);
  
  // Compute totals in selectors
  const itemCount = useCartStore((state) => 
    state.products.reduce((acc, p) => acc + (state.quantities[p.id] ?? 0), 0)
  );
  const totalPriceValue = useCartStore((state) => 
    state.products.reduce((acc, p) => acc + (state.quantities[p.id] ?? 0) * p.price, 0)
  );

  useEffect(() => {
    let alive = true;
    const store = useCartStore.getState();
    store.setLoading(true);
    fetch("https://fakestoreapi.com/products?limit=5")
      .then((res) => res.json())
      .then((data) => {
        if (!alive) return;
        store.setProducts(data || []);
        const initial = {};
        (data || []).forEach((p) => {
          initial[p.id] = 0;
        });
        store.setQuantities(initial);
        store.setError(null);
      })
      .catch((e) => alive && store.setError(e?.message || "Gagal memuat data"))
      .finally(() => alive && store.setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const handleQuantityChange = (id, value) => {
    useCartStore.getState().setQuantity(id, value);
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-[var(--color-muted-foreground)]">Memuat produk…</div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-red-600">Terjadi kesalahan: {String(error)}</div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <CartItem
            key={p.id}
            product={p}
            quantity={quantities[p.id] ?? 0}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
      <div className="mt-8 flex items-center justify-end gap-6 border-t pt-4">
        <div className="text-sm text-[var(--color-muted-foreground)]">Jumlah item: {itemCount}</div>
        <div className="text-base font-semibold">Grand Total: ${totalPriceValue.toFixed(2)}</div>
      </div>
    </div>
  );
}