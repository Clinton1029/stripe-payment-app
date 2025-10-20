import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

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
  decreaseItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  checkout: () => void; // ✅ NEW
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartCount: 0,

      addItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);

        let updatedItems;
        if (existingItem) {
          updatedItems = get().items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
          toast.success(`Increased quantity of ${item.name}`);
        } else {
          updatedItems = [...get().items, { ...item, quantity: 1 }];
          toast.success(`${item.name} added to cart`);
        }

        set({
          items: updatedItems,
          cartCount: updatedItems.reduce((total, i) => total + i.quantity, 0),
        });
      },

      decreaseItem: (id) => {
        const existingItem = get().items.find((i) => i.id === id);
        if (!existingItem) return;

        let updatedItems;
        if (existingItem.quantity > 1) {
          updatedItems = get().items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          );
          toast.success(`Decreased quantity of ${existingItem.name}`);
        } else {
          updatedItems = get().items.filter((i) => i.id !== id);
          toast.success(`${existingItem.name} removed from cart`);
        }

        set({
          items: updatedItems,
          cartCount: updatedItems.reduce((total, i) => total + i.quantity, 0),
        });
      },

      removeItem: (id) => {
        const itemToRemove = get().items.find((i) => i.id === id);
        const updatedItems = get().items.filter((i) => i.id !== id);

        set({
          items: updatedItems,
          cartCount: updatedItems.reduce((total, i) => total + i.quantity, 0),
        });

        if (itemToRemove) toast.success(`${itemToRemove.name} removed from cart`);
      },

      clearCart: () => {
        set({
          items: [],
          cartCount: 0,
        });
        toast.success("Cart cleared");
      },

      checkout: () => {
        set({
          items: [],
          cartCount: 0,
        });
        toast.success("Checkout successful ✅ Cart cleared");
      },
    }),
    {
      name: "stripe-cart-storage",
    }
  )
);
