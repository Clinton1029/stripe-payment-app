"use client";
import { useCart } from "../store/cartStore"; // your Zustand import
import React from "react";

const ProductCard = ({ product }: { product: any }) => {
  const { addItem } = useCart();

  const handleBuyNow = async () => {
    // ✅ Add item first
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    // ✅ Immediately fetch latest cart from Zustand
    const updatedItems = useCart.getState().items;

    if (updatedItems.length === 0) return;

    try {
      const res = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: updatedItems }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // ✅ Go to Stripe Checkout
      } else {
        console.error("❌ Stripe URL not returned:", data);
      }
    } catch (error) {
      console.error("❌ Checkout failed:", error);
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      {/* ✅ Connect to button */}
      <button
        onClick={handleBuyNow}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
