"use client";

import { useCart } from "../hooks/use-cart";
import { useRouter } from "next/navigation"; // ✅ Added

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    priceId: string;
    isFeatured?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);
  const router = useRouter(); // ✅ Added

  const handleBuyNow = async () => {
    if (!product.priceId) {
      console.error("❌ Missing priceId! Check if this product has a valid Stripe priceId.");
      return alert("Error: This product is missing a valid payment link.");
    }

    console.log("✅ Redirecting to custom checkout with:", {
      priceId: product.priceId,
      name: product.name,
      price: product.price,
    });

    // ✅ Go to your new custom checkout page
    router.push(
      `/checkout?priceId=${product.priceId}&name=${encodeURIComponent(
        product.name
      )}&price=${product.price}`
    );
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

        {/* ✅ Buy Now (redirects to checkout page) */}
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
