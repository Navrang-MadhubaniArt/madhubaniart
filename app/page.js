"use client";
import React, { useMemo, useState } from "react";

const productsData = [
  { id: 1, name: "Lotus Embroidered Sling Bag", price: 750, category: "Bags", image: "https://via.placeholder.com/800x800" },
  { id: 2, name: "Swing Motif Madhubani Bag", price: 750, category: "Bags", image: "https://via.placeholder.com/800x800" },
  { id: 3, name: "Fish Motif Handcrafted Pouch", price: 200, category: "Pouches", image: "https://via.placeholder.com/800x800" },
  { id: 4, name: "Turquoise Bird Art Sling", price: 1000, category: "Bags", image: "https://via.placeholder.com/800x800" },
  { id: 5, name: "Red Folk Art Crossbody", price: 1000, category: "Bags", image: "https://via.placeholder.com/800x800" },
  { id: 6, name: "Madhubani Painting Artwork", price: 2000, category: "Paintings", image: "https://via.placeholder.com/800x800" },
];

export default function Store() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => setCart((c) => [...c, product]);
  const removeFromCart = (index) => setCart((c) => c.filter((_, i) => i !== index));

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);
  const categories = useMemo(() => [...new Set(productsData.map((p) => p.category))], []);

  const generateWhatsAppLink = () => {
    const phoneNumber = "919315891229";
    const items = cart
      .map((item, i) => `${i + 1}. ${item.name} (${item.category}) - ₹${item.price}`)
      .join("%0A");

    const message = `Hello%20Navrang%20Arts,%0A%0AI%20would%20like%20to%20place%20an%20order:%0A%0A${items}%0A%0ATotal:%20₹${total}%0A%0APlease%20confirm%20availability%20and%20delivery.`;
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  return (
    <div className="bg-[#f6f2ec] text-[#222]">
      {/* Announcement */}
      <div className="bg-black text-white text-center text-xs tracking-wider py-2">
        AUTHENTIC MADHUBANI • HANDCRAFTED IN BIHAR
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="text-xl tracking-[0.3em] font-light">NAVRANG ARTS</div>
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
            <a href="#shop" className="hover:underline">Shop</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="#contact" className="hover:underline">Contact</a>
            <span>Cart ({cart.length})</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto text-center px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-light leading-tight">
          Timeless Madhubani Art for Modern Living
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Curated, handcrafted pieces celebrating Mithila heritage — designed to be worn, carried and lived with.
        </p>
      </section>

      {/* Category Nav */}
      <div className="max-w-6xl mx-auto px-6 pb-10">
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm tracking-wide border-b pb-4">
          {categories.map((cat) => (
            <a key={cat} href={`#${cat}`} className="hover:underline">{cat}</a>
          ))}
        </div>
      </div>

      {/* Products by Category */}
      <main id="shop" className="max-w-6xl mx-auto px-6 space-y-20 pb-16">
        {categories.map((category) => (
          <section key={category} id={category}>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-light">{category}</h2>
              <p className="text-gray-500 text-sm mt-2">Curated Collection</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {productsData
                .filter((p) => p.category === category)
                .map((product) => (
                  <article key={product.id} className="group">
                    <div className="bg-[#eee] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-80 object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="pt-4 text-center">
                      <h3 className="text-lg font-medium">{product.name}</h3>
                      <p className="text-gray-500 text-sm mt-1">Handcrafted in India</p>
                      <p className="mt-2 font-medium">₹{product.price}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-4 px-6 py-2 border border-black bg-transparent hover:bg-black hover:text-white transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </main>

      {/* About */}
      <section id="about" className="max-w-4xl mx-auto text-center px-6 py-20">
        <h2 className="text-3xl font-light mb-4">Our Story</h2>
        <p className="text-gray-600 leading-relaxed">
          Navrang Arts works with artisans across Bihar to preserve and promote Madhubani painting traditions. Every piece is handmade, unique, and rooted in cultural heritage.
        </p>
      </section>

      {/* Cart */}
      <section className="max-w-xl mx-auto px-6 pb-20">
        <div className="bg-white p-6">
          <h3 className="text-xl font-light mb-4">Your Selection</h3>

          {cart.length === 0 ? (
            <p className="text-gray-500">No items selected</p>
          ) : (
            <>
              <div className="space-y-2">
                {cart.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm">{item.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">₹{item.price}</span>
                      <button className="text-xs text-red-500" onClick={() => removeFromCart(i)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4 flex items-center justify-between font-medium">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <a href={generateWhatsAppLink()} target="_blank">
                <button className="mt-6 w-full bg-black text-white py-3">
                  Order via WhatsApp
                </button>
              </a>
            </>
          )}
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a
        href={generateWhatsAppLink()}
        target="_blank"
        className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 shadow-lg"
      >
        WhatsApp Order
      </a>

      {/* Footer */}
      <footer id="contact" className="border-t py-10 text-center text-sm text-gray-500">
        © 2026 Navrang Arts — Crafted in Bihar, India
      </footer>
    </div>
  );
}
