"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../hooks/use-cart"; // ✅ Import Zustand cart store

export default function Navbar() {
  const cartCount = useCart((state) => state.cartCount); // ✅ Get dynamic cart count

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold text-primary">
          StripeStore
        </Link>
        <div className="space-x-6 flex items-center">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/success" className="hover:text-primary">Orders</Link>

          {/* ✅ Dynamic Cart Icon */}
          <Link
            href="/cart"
            className="relative transition-transform duration-200 hover:scale-110"
          >
            <ShoppingCart className="w-6 h-6 hover:text-primary" />

            {/* ✅ Badge updates dynamically */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
