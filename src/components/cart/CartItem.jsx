"use client"

import React from "react";
import Counter from "./Counter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CartItem({ product, quantity, onQuantityChange }) {
  const { id, title, image, price } = product;
  const total = price * (quantity ?? 0);

  return (
    <div className="flex flex-col">
      <Card className="overflow-hidden border-[var(--color-border)] bg-[var(--color-card)]">
        <CardContent className="p-0">
          <div className="flex flex-col min-h-[400px]">
            <div className="aspect-[3/4] w-full bg-[var(--color-muted)] grid place-items-center h-64">
              <img
                src={image}
                alt={title}
                className="h-48 w-auto max-w-full object-contain p-4"
                loading="lazy"
              />
            </div>
            <div className="p-6 space-y-3 flex-1">
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-base leading-snug line-clamp-2">
                  {title}
                </CardTitle>
              </CardHeader>
              <div className="flex items-center justify-between">
                <div className="text-sm text-[var(--color-muted-foreground)]">
                  Harga: ${price.toFixed(2)}
                </div>
                <div className="text-sm text-[var(--color-muted-foreground)]">Total</div>
              </div>
              <div className="flex items-end justify-between">
                <div className="h-6" />
                <div className="text-lg font-semibold tabular-nums">${total.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Counter di bawah card */}
      <div className="mt-3 flex justify-center">
        <Counter value={quantity} min={0} onChange={(v) => onQuantityChange?.(id, v)} />
      </div>
    </div>
  );
}