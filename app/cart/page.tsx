"use client";

import { useCart } from "../hooks/use-cart";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, addItem, decreaseItem, clearCart } = useCart();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Stripe Checkout handler
  const handleCheckout = async () => {
    if (items.length === 0) return;

    try {
      const response = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.url) {
        // Optional: clear cart after redirect
        clearCart();
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

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
                {/* Image + Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} each
                    </p>
                    <p className="text-gray-800 font-bold">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => decreaseItem(item.id)}
                    className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span className="text-lg font-medium">{item.quantity}</span>

                  <button
                    onClick={() => addItem(item)}
                    className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
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
              onClick={handleCheckout}
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
