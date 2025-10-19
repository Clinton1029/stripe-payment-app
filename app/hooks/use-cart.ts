import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  isFeatured?: boolean;
}

interface CartStore {
  items: Product[];
  addToCart: (product: Product) => void;
  buyNow: (product: Product) => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  addToCart: (product) =>
    set((state) => ({
      items: [...state.items, product],
    })),

  buyNow: (product) => {
    console.log("Buy now clicked for:", product);
    // No redirect yet, frontend only.
  },
}));
