"use client";

import { useCart } from "../hooks/use-cart";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 mb-4">Your cart is empty.</p>
            <Link
              href="/"
              className="text-blue-600 font-medium hover:underline"
            >
              Go back to shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 font-medium hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Total */}
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-md">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Checkout */}
            <button
              onClick={() => console.log("Checkout clicked")}
              className="w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
