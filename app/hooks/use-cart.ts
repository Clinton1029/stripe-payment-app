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
  cartCount: number; // ✅ now a reactive state key
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  cartCount: 0, // ✅ Start with 0

  addItem: (item) => {
    const existingItem = get().items.find((i) => i.id === item.id);

    let updatedItems;
    if (existingItem) {
      updatedItems = get().items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updatedItems = [...get().items, { ...item, quantity: 1 }];
    }

    set({
      items: updatedItems,
      cartCount: updatedItems.reduce((total, i) => total + i.quantity, 0), // ✅ Update count
    });
  },

  removeItem: (id) => {
    const updatedItems = get().items.filter((i) => i.id !== id);

    set({
      items: updatedItems,
      cartCount: updatedItems.reduce((total, i) => total + i.quantity, 0), // ✅ Update count
    });
  },

  clearCart: () =>
    set({
      items: [],
      cartCount: 0, // ✅ Reset count
    }),
}));
