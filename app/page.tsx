"use client";

import ProductCard from "./(components)/ProductCard";

export default function HomePage() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "Premium sound with noise cancellation.",
      price: 89.99,
      image: "/products/headphones.jpg",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Track your health and stay connected.",
      price: 129.99,
      image: "/products/watch.jpg",
    },
    {
      id: 3,
      name: "Gaming Mouse",
      description: "High precision and customizable buttons.",
      price: 49.99,
      image: "/products/mouse.jpg",
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      description: "Powerful sound in a compact body.",
      price: 59.99,
      image: "/products/speaker.jpg",
    },
  ];

  const handleBuy = (product: any) => {
    alert(`Clicked buy for ${product.name}`);
    // Later, we’ll connect this to Stripe Checkout
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-10">
        Featured Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onBuy={handleBuy} />
        ))}
      </div>
    </div>
  );
}
