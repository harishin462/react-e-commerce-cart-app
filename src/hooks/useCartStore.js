"use client";

import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  products: [], // array of products
  quantities: {}, // { [id]: qty }
  loading: false,
  error: null,

  // actions
  setProducts: (products) => set({ products }),
  setQuantities: (quantities) => set({ quantities }),
  setQuantity: (id, value) =>
    set((state) => ({ quantities: { ...state.quantities, [id]: Math.max(0, value) } })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));