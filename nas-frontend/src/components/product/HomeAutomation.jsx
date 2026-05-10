import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Phone, 
  Mail, 
  Menu, 
  ChevronRight, 
  ShieldCheck, 
  Server, 
  Cpu, 
  Camera, 
  Wifi, 
  Database, 
  Smartphone, 
  HardDrive, 
  Users, 
  Globe, 
  Award, 
  MapPin, 
  ChevronLeft, 
  Filter 
} from 'lucide-react';

// --- Components ---

const ProductCardItem = ({ title, price, oldPrice, category, badge }) => (
  <div className="bg-white group border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all p-2 relative flex flex-col h-full rounded-md max-w-[250px] mx-auto">
    {badge && (
      <div className={`absolute top-2 left-2 ${badge === 'SALE!' ? 'bg-orange-500' : 'bg-blue-600'} text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm z-10 uppercase`}>
        {badge}
      </div>
    )}
    <div className="aspect-[1/1] bg-gray-50 flex items-center justify-center mb-2 overflow-hidden rounded group-hover:bg-white transition-colors" style={{ minHeight: 80 }}>
      <div className="relative">
        <Smartphone size={46} className="text-gray-300 group-hover:text-blue-900 group-hover:scale-110 transition-all duration-300" />
        <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-sm">
          <ShieldCheck size={13} className="text-green-500" />
        </div>
      </div>
    </div>
    <div className="flex-grow">
      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">{category}</span>
      <h3 className="text-gray-800 text-xs font-semibold leading-tight line-clamp-2 mb-2 group-hover:text-blue-900 transition-colors">
        {title}
      </h3>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gray-400 line-through text-[11px]">₹{oldPrice}</span>
        <span className="text-orange-600 font-bold text-base">₹{price}</span>
      </div>
    </div>
    <button className="w-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white hover:from-orange-500 hover:via-red-400 hover:to-red-600 py-2 rounded font-bold uppercase text-[10px] transition-all flex items-center justify-center gap-2">
      <ShoppingCart size={13} /> Add to Cart
    </button>
  </div>
);

// FilterDropdown: Dropdown filter for mobile/desktop (dropdown UI only)
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => { document.removeEventListener('mousedown', listener); };
  }, [ref, handler]);
}

const FilterDropdown = ({
  filters,
  onBrandChange,
  onTypeChange,
  onRoomChange,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setOpen(false));

  const brands = ['Philips Hue', 'Wipro', 'Syska', 'Oakter', 'Xiaomi', 'TP-Link', 'Realme'];
  const types = ['Smart Lighting', 'Smart Plug', 'Smart Switch', 'Smart IR', 'Smart Lock', 'Sensors'];
  const rooms = ['Living Room', 'Bedroom', 'Kitchen', 'All'];

  return (
    <div className="relative inline-block w-full md:w-auto z-20" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-3 py-1.5 bg-white border rounded text-blue-900 font-bold uppercase text-xs hover:bg-gray-50 shadow-sm transition mb-2 w-full md:w-auto"
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        <Filter size={13} />
        Filters
        <svg className={`ml-2 transition-transform ${open ? 'rotate-180' : ''}`} width="13" height="13" fill="none" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 bg-white border rounded shadow-xl w-[240px] max-w-[94vw] p-3 space-y-4">
          <div>
            <h4 className="font-bold text-gray-800 mb-2 text-[11px] uppercase">Brand</h4>
            <div className="space-y-1 max-h-20 overflow-y-auto pr-1 custom-scrollbar">
              {brands.map(brand => (
                <label key={brand} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-blue-600">
                  <input
                    type="checkbox"
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    checked={filters.brands.includes(brand)}
                    onChange={() => onBrandChange(brand)}
                  /> {brand}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2 text-[11px] uppercase">Type</h4>
            <div className="space-y-1">
              {types.map(type => (
                <label key={type} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-blue-600">
                  <input
                    type="checkbox"
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    checked={filters.types.includes(type)}
                    onChange={() => onTypeChange(type)}
                  /> {type}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2 text-[11px] uppercase">Room</h4>
            <div className="space-y-1">
              {rooms.map(room => (
                <label key={room} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-blue-600">
                  <input
                    type="radio"
                    name="room"
                    className="text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    checked={filters.room === room}
                    onChange={() => onRoomChange(room)}
                  /> {room}
                </label>
              ))}
            </div>
          </div>
          <div>
            <button className="w-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-1.5 rounded text-[11px] font-bold uppercase hover:from-orange-500 hover:via-red-400 hover:to-red-600 transition-colors mt-1">Need Bulk Pricing?</button>
          </div>
        </div>
      )}
    </div>
  );
};

function filterProducts(products, filters) {
  return products.filter(product => {
    // Brand filter
    if (filters.brands.length > 0) {
      let brandMatch = false;
      for (const brand of filters.brands) {
        if (
          product.title.toLowerCase().includes(brand.toLowerCase()) ||
          (product.brand && product.brand === brand)
        ) {
          brandMatch = true;
          break;
        }
      }
      if (!brandMatch) return false;
    }
    // Type filter
    if (filters.types.length > 0 && !filters.types.includes(product.category)) {
      return false;
    }
    // Room filter
    if (filters.room && filters.room !== 'All' && product.rooms) {
      if (!product.rooms.includes(filters.room)) return false;
    }
    return true;
  });
}

export default function HomeAutomation() {
  const [filters, setFilters] = useState({
    brands: [],
    types: [],
    room: 'All',
  });

  const handleBrandChange = (brand) => {
    setFilters(f => ({
      ...f,
      brands: f.brands.includes(brand)
        ? f.brands.filter(b => b !== brand)
        : [...f.brands, brand],
    }));
  };

  const handleTypeChange = (type) => {
    setFilters(f => ({
      ...f,
      types: f.types.includes(type)
        ? f.types.filter(t => t !== type)
        : [...f.types, type],
    }));
  };

  const handleRoomChange = (room) => {
    setFilters(f => ({
      ...f,
      room,
    }));
  };

  const products = [
    {
      title: "Philips Hue White and Color Ambiance Starter Kit",
      price: "6,999.00",
      oldPrice: "8,499.00",
      category: "Smart Lighting",
      badge: "SALE!",
      rooms: ["Living Room", "Bedroom"]
    },
    {
      title: "Wipro Next 16A Wi-Fi Smart Plug (Energy Monitoring)",
      price: "949.00",
      oldPrice: "1,299.00",
      category: "Smart Plug",
      badge: "POPULAR",
      rooms: ["Living Room", "Kitchen"]
    },
    {
      title: "Oakter Wi-Fi Smart IR Universal Remote",
      price: "1,399.00",
      oldPrice: "1,899.00",
      category: "Smart IR",
      badge: "",
      rooms: ["Living Room", "Bedroom"]
    },
    {
      title: "TP-Link Kasa Smart WiFi 3-Gang Wall Switch",
      price: "2,150.00",
      oldPrice: "2,699.00",
      category: "Smart Switch",
      badge: "NEW",
      rooms: ["Kitchen", "Living Room"]
    },
    {
      title: "Syska Smart LED RGB Bulb 9W - Wi-Fi Enabled",
      price: "499.00",
      oldPrice: "899.00",
      category: "Smart Lighting",
      badge: "SALE!",
      rooms: ["Bedroom", "Living Room"]
    },
    {
      title: "Mi Smart Door & Window Sensor (Xiaomi)",
      price: "999.00",
      oldPrice: "1,290.00",
      category: "Sensors",
      badge: "",
      rooms: ["Bedroom", "Living Room", "Kitchen"]
    },
    {
      title: "Realme Smart Cam 360° - Home Security Camera",
      price: "2,299.00",
      oldPrice: "2,999.00",
      category: "Sensors",
      badge: "BEST SELLER",
      rooms: ["Living Room"]
    },
    {
      title: "Godrej Spacetek Pro Smart Door Lock",
      price: "17,999.00",
      oldPrice: "19,500.00",
      category: "Smart Lock",
      badge: "",
      rooms: ["Bedroom", "Living Room"]
    },
    {
      title: "Oakter 16A Energy Meter Smart Plug",
      price: "1,149.00",
      oldPrice: "1,699.00",
      category: "Smart Plug",
      badge: "SALE!",
      rooms: ["Kitchen"]
    },
    {
      title: "Wipro Next Smart Wi-Fi Switch 6A",
      price: "779.00",
      oldPrice: "1,099.00",
      category: "Smart Switch",
      badge: "POPULAR",
      rooms: ["Living Room", "Bedroom"]
    },
    {
      title: "Philips Hue Motion Sensor (Wireless)",
      price: "3,299.00",
      oldPrice: "3,999.00",
      category: "Sensors",
      badge: "ADVANCED",
      rooms: ["Living Room", "Bedroom"]
    },
    {
      title: "Yale YDME 50 NxT Smart Door Lock",
      price: "8,999.00",
      oldPrice: "10,199.00",
      category: "Smart Lock",
      badge: "NEW",
      rooms: ["Bedroom", "Living Room"]
    }
  ];

  const filteredProducts = filterProducts(products, filters);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 text-white py-10 px-4 text-center border-b-4 border-green-500">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Home Automation Products</h1>
          <p className="text-blue-100 text-xs md:text-base max-w-2xl mx-auto">
            Transform your home into a smart home with top brands—lighting, plugs, sensors, locks & more.{" "}
            Smart living, effortless control. Ghar, smart banao, Network Automation Solutions ke saath!
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-3 py-8">
        <div className="flex flex-col lg:flex-row gap-5">

          {/* Sidebar - Hidden on md+ */}
          <aside className="hidden lg:block w-full lg:w-60 space-y-4">
            <div className="bg-white p-3 border rounded shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-blue-900 font-bold uppercase text-xs border-b pb-2">
                <Filter size={13} /> <span>Filters</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2 text-[11px] uppercase">Brand</h4>
                  <div className="space-y-1 max-h-24 overflow-y-auto pr-1 custom-scrollbar">
                    {['Philips Hue', 'Wipro', 'Syska', 'Oakter', 'Xiaomi', 'TP-Link', 'Realme'].map(brand => (
                      <label key={brand} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-blue-600">
                        <input
                          type="checkbox"
                          className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                          checked={filters.brands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                        /> {brand}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2 text-[11px] uppercase">Type</h4>
                  <div className="space-y-1">
                    {['Smart Lighting', 'Smart Plug', 'Smart Switch', 'Smart IR', 'Smart Lock', 'Sensors'].map(type => (
                      <label key={type} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-blue-600">
                        <input
                          type="checkbox"
                          className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                          checked={filters.types.includes(type)}
                          onChange={() => handleTypeChange(type)}
                        /> {type}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2 text-[11px] uppercase">Room</h4>
                  <div className="space-y-1">
                    {['Living Room', 'Bedroom', 'Kitchen', 'All'].map(room => (
                      <label key={room} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-blue-600">
                        <input
                          type="radio"
                          name="room"
                          className="text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                          checked={filters.room === room}
                          onChange={() => handleRoomChange(room)}
                        /> {room}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-100">
              <h4 className="font-bold text-blue-900 text-xs mb-1">Need Bulk Pricing?</h4>
              <p className="text-[11px] text-blue-700 mb-3">Hamare experts se sampark karein for custom home project pricing.</p>
              <button className="w-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-1.5 rounded text-[11px] font-bold uppercase hover:from-orange-500 hover:via-red-400 hover:to-red-600 transition-colors">Call Sales</button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-grow">

            {/* Top Toolbar */}
            <div className="bg-white p-2 border rounded mb-5 flex flex-col md:flex-row justify-between items-center gap-3 shadow-sm">
              <div className="text-xs text-gray-500">
                Showing <span className="font-bold text-gray-800">{filteredProducts.length}</span> results for Home Automation
              </div>
              <div className="flex gap-3 w-full md:w-auto items-center">
                {/* Filter Dropdown - visible on mobile/tablet */}
                <span className="block w-full md:w-auto md:hidden">
                  <FilterDropdown 
                    filters={filters}
                    onBrandChange={handleBrandChange}
                    onTypeChange={handleTypeChange}
                    onRoomChange={handleRoomChange}
                  />
                </span>
                <select className="flex-grow md:w-40 p-1.5 border border-gray-200 rounded text-xs outline-none focus:border-blue-500">
                  <option>Sort by: Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Popularity</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredProducts.map((p, i) => (
                <ProductCardItem 
                  key={i}
                  title={p.title}
                  price={p.price}
                  oldPrice={p.oldPrice}
                  category={p.category}
                  badge={p.badge}
                />
              ))}
            </div>

            {/* Load More / Pagination */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <button className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white border-0 px-6 py-2 rounded-full font-bold uppercase text-xs hover:from-orange-500 hover:via-red-400 hover:to-red-600 transition-all">
                Load More Products
              </button>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 flex items-center justify-center rounded border text-gray-400 hover:bg-gray-100 transition-colors"><ChevronLeft size={13} /></button>
                <button className="w-7 h-7 flex items-center justify-center rounded border bg-blue-900 text-white font-bold text-xs">1</button>
                <button className="w-7 h-7 flex items-center justify-center rounded border hover:bg-gray-100 text-xs">2</button>
                <button className="w-7 h-7 flex items-center justify-center rounded border hover:bg-gray-100 text-xs">3</button>
                <button className="w-7 h-7 flex items-center justify-center rounded border text-gray-400 hover:bg-gray-100 transition-colors"><ChevronRight size={13} /></button>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Trust Badges */}
      <section className="bg-white border-y py-8">
        <div className="max-w-7xl mx-auto px-3 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { title: "Pan India Delivery", sub: "Fast & Secure shipping", icon: Globe },
            { title: "100% Genuine", sub: "Original Brand Warranty", icon: ShieldCheck },
            { title: "Expert Support", sub: "24/7 Technical assistance", icon: Users },
            { title: "Safe Payments", sub: "Fully encrypted checkout", icon: Award }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="mb-3 text-blue-900"><item.icon size={22} /></div>
              <h4 className="font-bold text-xs uppercase mb-1">{item.title}</h4>
              <p className="text-[9px] text-gray-500 uppercase tracking-widest">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}