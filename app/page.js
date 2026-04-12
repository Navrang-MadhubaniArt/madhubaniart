
"use client";
import React, { useState } from "react";

const productsData = [
  { id: 1, name: "Lotus Embroidered Sling Bag", price: 750, category: "Bags" },
  { id: 2, name: "Swing Motif Madhubani Bag", price: 750, category: "Bags" },
  { id: 3, name: "Fish Motif Handcrafted Pouch", price: 200, category: "Pouches" },
];

export default function Store() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => setCart([...cart, product]);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const generateWhatsAppLink = () => {
    const phoneNumber = "919315891229";

    const items = cart
      .map((item, i) => `${i + 1}. ${item.name} - ₹${item.price}`)
      .join("%0A");

    return `https://wa.me/${phoneNumber}?text=Order:%0A${items}%0ATotal:%20₹${total}`;
  };

  return (
    <div className="bg-[#f8f5f0] min-h-screen p-6">
      <h1 className="text-3xl mb-6">Navrang Arts</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productsData.map((product) => (
          <div key={product.id} className="border p-4">
            <h2>{product.name}</h2>
            <p>₹{product.price}</p>
            <button
              className="mt-2 border px-4 py-2"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2>Cart</h2>
        {cart.map((item, i) => (
          <p key={i}>{item.name}</p>
        ))}

        {cart.length > 0 && (
          <a href={generateWhatsAppLink()} target="_blank">
            <button className="mt-4 bg-black text-white px-4 py-2">
              Order on WhatsApp
            </button>
          </a>
        )}
      </div>
    </div>
  );
}
