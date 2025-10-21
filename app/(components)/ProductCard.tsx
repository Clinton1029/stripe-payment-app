"use client";

import { useCart } from "../hooks/use-cart"; // ✅ Ensure this is correct

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    priceId: string; // ✅ Ensure this is coming correctly
    isFeatured?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);

  const handleBuyNow = async () => {
    if (!product.priceId) {
      console.error("❌ Missing priceId! Check if this product has a valid Stripe priceId.");
      return alert("Error: This product is missing a valid payment link.");
    }

    console.log("📤 Sending to Stripe API:", { priceId: product.priceId }); // ✅ Debugging log

    try {
      const response = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: product.priceId }),
      });

      const data = await response.json();
      console.log("📩 Response from backend:", data); // ✅ Debug log

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("❌ Stripe URL not returned from backend:", data);
        alert("Failed to start checkout. Please try again later.");
      }
    } catch (error) {
      console.error("❌ Checkout failed:", error);
      alert("Something went wrong while starting checkout.");
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-300 hover:scale-[1.02]">
      
      {product.isFeatured && (
        <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg z-10">
          Featured
        </span>
      )}

      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
      </div>

      <div className="p-6 space-y-3">
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
          {product.name}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-2">
          {product.description}
        </p>
        <p className="text-2xl font-bold text-blue-600 tracking-tight">
          ${product.price.toFixed(2)}
        </p>

        {/* ✅ Buy Now (Stripe Checkout) */}
        <button
          onClick={handleBuyNow}
          type="button"
          className="mt-4 w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
        >
          Buy Now
        </button>

        {/* ✅ Add to Cart */}
        <button
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            })
          }
          type="button"
          className="mt-2 w-full py-3 rounded-xl font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 transition-all duration-300 active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
