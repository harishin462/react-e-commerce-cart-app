"use client"

import React from "react";

export default function Counter({ value, min = 0, onChange }) {
  const dec = () => {
    const next = Math.max(min, (value ?? 0) - 1);
    onChange?.(next);
  };
  const inc = () => {
    const next = (value ?? 0) + 1;
    onChange?.(next);
  };

  return (
    <div className="inline-flex items-center rounded-lg border border-[var(--color-border)] overflow-hidden">
      <button
        type="button"
        onClick={dec}
        className="h-9 w-9 grid place-items-center text-lg select-none hover:bg-[var(--color-accent)]"
        aria-label="Kurangi"
      >
        −
      </button>
      <div className="px-3 min-w-10 text-center tabular-nums">{value}</div>
      <button
        type="button"
        onClick={inc}
        className="h-9 w-9 grid place-items-center text-lg select-none hover:bg-[var(--color-accent)]"
        aria-label="Tambah"
      >
        +
      </button>
    </div>
  );
}