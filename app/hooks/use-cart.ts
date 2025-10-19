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
  removeFromCart: (id: string) => void;
  buyNow: (product: Product) => void;
  total: number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  addToCart: (product) =>
    set((state) => ({
      items: [...state.items, product],
    })),

  removeFromCart: (id: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  buyNow: (product) => {
    console.log("Buy now clicked:", product);
  },

  total: 0,
}));

// We can add a computed selector in the cart page
