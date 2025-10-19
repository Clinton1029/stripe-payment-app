"use client";

import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between p-4 border-b">
              <div>
                <h2 className="font-bold">{item.name}</h2>
                <p>${item.price} x {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <h2 className="text-2xl font-bold mt-5">Total: ${total.toFixed(2)}</h2>

          <button onClick={clearCart} className="mt-4 px-6 py-2 bg-red-600 text-white rounded">
            Clear Cart
          </button>

          <button className="mt-4 ml-4 px-6 py-2 bg-blue-600 text-white rounded">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
