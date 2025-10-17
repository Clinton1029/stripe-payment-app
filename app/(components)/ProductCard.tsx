"use client";

export default function ProductCard({ product, onBuy }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-5 space-y-2">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-500 text-sm">{product.description}</p>
        <p className="text-lg font-bold text-primary">${product.price}</p>
        <button
          onClick={() => onBuy(product)}
          className="mt-3 w-full bg-primary text-white py-2 rounded-xl hover:bg-blue-700"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
