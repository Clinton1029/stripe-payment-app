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
  cartCount: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  decreaseItem: (id: string) => void; // ✅ optional decrease
  removeFromCart: (id: string) => void; // ✅ renamed to match your CartPage
  clearCart: () => void;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  cartCount: 0,

  // ✅ Add or increase quantity
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
      cartCount: updatedItems.reduce((total, i) => total + i.quantity, 0),
    });
  },

  // ✅ Decrease quantity or remove if 1
  decreaseItem: (id) => {
    const existingItem = get().items.find((i) => i.id === id);

    if (!existingItem) return;

    let updatedItems;
    if (existingItem.quantity > 1) {
      updatedItems = get().items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
    } else {
      updatedItems = get().items.filter((i) => i.id !== id);
    }

    set({
      items: updatedItems,
      cartCount: updatedItems.reduce((total, i) => total + i.quantity, 0),
    });
  },

  // ✅ Remove item completely
  removeFromCart: (id) => {
    const updatedItems = get().items.filter((i) => i.id !== id);

    set({
      items: updatedItems,
      cartCount: updatedItems.reduce((total, i) => total + i.quantity, 0),
    });
  },

  // ✅ Clear all
  clearCart: () =>
    set({
      items: [],
      cartCount: 0,
    }),
}));
