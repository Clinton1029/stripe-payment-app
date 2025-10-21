"use client";

export default function BuyButton({ priceId }) {
  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe
    } else {
      alert("Failed to redirect to payment");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Buy Now
    </button>
  );
}
