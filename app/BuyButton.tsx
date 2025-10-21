"use client";

import { useState } from "react";

interface BuyButtonProps {
  priceId: string;
}

export default function BuyButton({ priceId }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      if (!res.ok) {
        throw new Error("Failed to initiate checkout");
      }

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        throw new Error("Stripe URL not returned");
      }
    } catch (error: any) {
      alert(error.message || "Something went wrong during checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded transition ${
        loading && "cursor-not-allowed"
      }`}
    >
      {loading ? "Processing..." : "Buy Now"}
    </button>
  );
}
