import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const existingItem = get().items.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        items: get().items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...get().items, { ...item, quantity: 1 }] });
    }
  },

  removeItem: (id) => {
    set({ items: get().items.filter((i) => i.id !== id) });
  },

  clearCart: () => set({ items: [] }),

  get cartCount() {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
