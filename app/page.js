"use client";
import React, { useMemo, useState, useEffect } from "react";

const productsData = [
  { id: 1, name: "Lotus Embroidered Sling Bag", price: 750, category: "Bags", images: ["/LotusBag.png","/LotusBag.png"], details:{material:"Cotton fabric", colours:"Red, Black", days:"3–5 days", note:"Hand-embroidered"} },
  { id: 2, name: "Swing Motif Madhubani Bag", price: 750, category: "Bags", images: ["/SwingBag.png"], details:{material:"Canvas", colours:"Yellow, Black", days:"4 days", note:"Folk motif"} },
  { id: 3, name: "Fish Motif Handcrafted Pouch", price: 200, category: "Pouches", images: ["/FishPouch.jpeg"], details:{material:"Cotton", colours:"Blue, Black", days:"2 days", note:"Symbol of prosperity"} },
  { id: 4, name: "Turquoise Bird Art Sling", price: 1000, category: "Bags", images: ["/TurquoiseSling.png"], details:{} },
  { id: 5, name: "Red Folk Art Crossbody", price: 1000, category: "Bags", images: ["/RedCrossbody.png"], details:{} },
  { id: 6, name: "Madhubani Painting Artwork", price: 2000, category: "Paintings", images: ["/MadhubaniArtwork.png"], details:{} },
  { id: 7, name: "Peacock Madhubani Tote Bag", price: 1200, category: "Bags", images: ["/PeacockBag.png"], details:{} },
  { id: 8, name: "Sun Motif Art Pouch", price: 250, category: "Pouches", images: ["/SunPouch.png"], details:{} },
  { id: 9, name: "Krishna Radha Madhubani Painting", price: 3000, category: "Paintings", images: ["/KrishnaPainting.png"], details:{} },
  { id: 10, name: "Krishna Radha Madhubani Painting", price: 3000, category: "Painting", images: ["/KrishnaPainting.png"], details:{} },
  { id: 11, name: "Peacock Motif Designer Bag", price: 1200, category: "Bag", images: ["/PeacockBag.png","/PeacockBag2.png"], details:{material:"Canvas", colours:"Green & Blue", days:"5 days", note:"Peacock themed traditional art"} },
];

export default function Store() {
  const [page, setPage] = useState('store');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [cart, setCart] = useState([]);
  const [qty, setQty] = useState(1);
  const [qtyMap, setQtyMap] = useState({});
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  let revealTimeout = null;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        clearTimeout(revealTimeout);
        revealTimeout = setTimeout(() => {
          setShowHeader(true);
        }, 120); // smooth reveal delay
      }

      setIsScrolled(window.scrollY > 20);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const addToCart = (product, quantity = 1) => {
    const items = Array(quantity).fill(product);
    setCart((c) => [...c, ...items]);
  };

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);
  const categories = useMemo(() => [...new Set(productsData.map((p) => p.category))], []);

  const generateWhatsAppLink = () => {
    const phoneNumber = "919315891229";
    const items = cart
      .map((item, i) => `${i + 1}. ${item.name} (${item.category}) - ₹${item.price}`)
      .join("%0A");

    const message = `Hello Navrang Arts,%0AI would like to order:%0A${items}%0ATotal: ₹${total}`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const groupedCart = Object.values(
    cart.reduce((acc, item) => {
      if (!acc[item.id]) acc[item.id] = { ...item, qty: 0 };
      acc[item.id].qty += 1;
      return acc;
    }, {})
  );

  return (
    <div className="bg-[#f6f2ec] text-[#222]">
      <div className="bg-black text-white text-center text-xs tracking-wider py-2">
        AUTHENTIC MADHUBANI • HANDCRAFTED IN BIHAR
      </div>

      {/* HEADER (fixed: proper closing + no duplicate nav) */}
      <header
  className={`fixed w-full z-20 border-b transition-all duration-300 ${
    showHeader ? "translate-y-0" : "-translate-y-full"
  } ${
    isScrolled
      ? "bg-white/80 backdrop-blur-md shadow-sm border-gray-200"
      : "bg-white/40 backdrop-blur-sm border-transparent"
  }`}
>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div
            className={`tracking-[0.3em] transition-all duration-300 ${
              isScrolled ? "text-sm font-medium tracking-[0.2em]" : "text-xl font-light"
            }`}
          >
            NAVRANG ARTS
          </div>

          {/* Switch */}
          <div className="flex bg-[#f0ece6] rounded-full p-1">
            <button
              onClick={() => setPage('store')}
              className={`px-5 py-1.5 rounded-full transition-all text-sm ${page==='store' ? 'bg-black text-white shadow' : 'text-gray-600'}`}
            >
              Shop
            </button>
            <button
              onClick={() => setPage('classes')}
              className={`px-5 py-1.5 rounded-full transition-all text-sm ${page==='classes' ? 'bg-black text-white shadow' : 'text-gray-600'}`}
            >
              Art Classes
            </button>
          </div>

          {/* Cart */}
          <div className="text-sm">
            Cart ({cart.length})
          </div>
        </div>
      </header>

      {page === 'store' && (
        <>
          <section className="max-w-5xl mx-auto text-center px-6 py-20">
            <h1 className="text-4xl md:text-6xl font-light">Timeless Madhubani Art for Modern Living</h1>
          </section>

          <main className="max-w-6xl mx-auto px-6 space-y-20 pb-16">
            {categories.map((category) => (
              <section key={category}>
                <h2 className="text-2xl mb-6 text-center">{category}</h2>
                <div className="flex gap-8 overflow-x-auto scrollbar-hide">
                  {productsData.filter(p=>p.category===category).map(product => (
                    <div key={product.id} className="min-w-[260px]">
                      <div onClick={()=>{setSelectedProduct(product); setQty(1)}} className="cursor-pointer">
                        <img src={product.images[0]} className="h-64 w-full object-cover" />
                        <p className="text-lg font-semibold tracking-wide text-[#1a1a1a] mt-2">
                          {product.name}
                        </p>
                        <p>₹{product.price}</p>
                      </div>

                      {/* Add to cart controls */}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center border rounded-full overflow-hidden">
                          <button
                            onClick={()=>setQtyMap(prev=>({
                              ...prev,
                              [product.id]: Math.max(1,(prev[product.id]||1)-1)
                            }))}
                            className="px-3 py-1 text-lg"
                          >
                            −
                          </button>
                          <span className="px-3 text-sm">
                            {qtyMap[product.id] || 1}
                          </span>
                          <button
                            onClick={()=>setQtyMap(prev=>({
                              ...prev,
                              [product.id]: (prev[product.id]||1)+1
                            }))}
                            className="px-3 py-1 text-lg"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={()=>addToCart(product, qtyMap[product.id] || 1)}
                          className="flex-1 border py-1 text-sm hover:bg-black hover:text-white transition"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </main>

          <section className="max-w-xl mx-auto px-6 pb-20">
            <div className="bg-white p-6">
              <h3 className="mb-4">Your Selection</h3>
              <div className="divide-y">
                {groupedCart.map(item => (
                  <div key={item.id} className="grid grid-cols-[1fr_auto] items-center py-4">
                    <div>
                      <span className="block">{item.name}</span>
                      <span className="text-xs text-gray-500">
                        ₹{item.price} × {item.qty}
                      </span>
                    </div>
                    <span className="text-right tabular-nums min-w-[90px]">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-[1fr_auto] items-center mt-4 border-t pt-4">
                <span className="font-medium">Total</span>
                <span className="text-right tabular-nums min-w-[90px] font-medium">₹{total}</span>
              </div>
              <a href={generateWhatsAppLink()} target="_blank">
                <button className="mt-4 w-full bg-black text-white py-2">Order via WhatsApp</button>
              </a>
            </div>
          </section>
        </>
      )}

      {page === 'classes' && (
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h1 className="text-4xl text-center mb-10">TRIVENI ART CLASSES</h1>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="border p-6">
              <h2>Drawing Classes</h2>
              <p>Sketching, shading, creativity for kids</p>
            </div>
            <div className="border p-6">
              <h2>Painting Classes</h2>
              <p>Watercolors, Madhubani, color theory</p>
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className={`fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm ${isClosing ? 'opacity-0' : 'opacity-100'} transition`}>
          <div className="bg-white p-6 max-w-md w-full rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] relative">

            <button
              className="absolute right-3 top-3 text-lg"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <div className="flex gap-3 overflow-x-auto scrollbar-hide mb-4 snap-x snap-mandatory">
              {selectedProduct.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="h-40 min-w-full object-cover rounded snap-center"
                />
              ))}
            </div>

            <h2 className="text-xl font-semibold tracking-wide mb-1 text-[#1a1a1a]">
              {selectedProduct.name}
            </h2>
            <p className="mb-2">₹{selectedProduct.price}</p>

            {/* Description */}
            <div className="text-xs text-gray-600 space-y-1 mb-3">
              <p className="font-medium text-gray-800 mb-1">Product Details</p>
              {selectedProduct.details?.material && <p>Material: {selectedProduct.details.material}</p>}
              {selectedProduct.details?.colours && <p>Colours: {selectedProduct.details.colours}</p>}
              {selectedProduct.details?.days && <p>Days to make: {selectedProduct.details.days}</p>}
              {selectedProduct.details?.note && <p>{selectedProduct.details.note}</p>}

              {/* Fallback if no details */}
              {!selectedProduct.details || Object.keys(selectedProduct.details).length === 0 ? (
                <p className="italic text-gray-400">Handcrafted Madhubani artwork with traditional techniques.</p>
              ) : null}
            </div>

            <div className="flex items-center justify-center border rounded-full overflow-hidden w-fit mx-auto mb-4">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4">−</button>
              <span className="px-4">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="px-4">+</button>
            </div>

            <button
              onClick={()=>{addToCart(selectedProduct, qty); setSelectedProduct(null)}}
              className="w-full bg-black text-white py-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
