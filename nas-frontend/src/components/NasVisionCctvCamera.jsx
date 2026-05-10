import React from "react";
import {
  ShieldCheck,
  BadgeCheck,
  PhoneCall,
} from "lucide-react";

// Updated CCTV SVG Graphic (placed on right)
const CctvCameraGraphic = () => (
  <svg
    width="220"
    height="170"
    viewBox="0 0 220 170"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto drop-shadow-lg"
    style={{ maxWidth: "340px", width: "100%", height: "auto" }}
  >
    <g>
      {/* Body */}
      <rect x="32" y="55" rx="10" width="130" height="36" fill="#f87171" stroke="#b91c1c" strokeWidth="3" />
      {/* Camera barrel */}
      <rect x="150" y="65" width="50" height="16" rx="6" fill="#fff" stroke="#fbbf24" strokeWidth="3" />
      {/* Camera face */}
      <ellipse cx="200" cy="73" rx="10" ry="13" fill="#d1d5db" stroke="#374151" strokeWidth="3" />
      {/* Lens */}
      <circle cx="200" cy="73" r="6" fill="#0ea5e9" stroke="#0369a1" strokeWidth="2" />
      {/* Mount */}
      <rect x="45" y="91" width="20" height="12" rx="4" fill="#a3a3a3" />
      {/* Arm */}
      <rect x="61" y="100" width="80" height="6" rx="3" fill="#a3a3a3" transform="rotate(-10 61 100)" />
      {/* Shadow under camera */}
      <ellipse cx="92" cy="133" rx="60" ry="10" fill="#f3f4f6" />
    </g>
  </svg>
);

const features = [
  {
    icon: (
      <span className="bg-gradient-to-br from-[#fb7185] via-[#fbbf24] to-[#fcd34d] flex items-center justify-center h-14 w-14 rounded-xl shadow-md mb-3">
        <ShieldCheck size={32} className="text-white drop-shadow" />
      </span>
    ),
    title: "100% Secure",
    desc: "Smart and reliable security for family & business",
  },
  {
    icon: (
      <span className="bg-gradient-to-br from-[#fcd34d] via-[#fb7185] to-[#fbbf24] flex items-center justify-center h-14 w-14 rounded-xl shadow-md mb-3">
        <BadgeCheck size={32} className="text-white drop-shadow" />
      </span>
    ),
    title: "Certified Engineers",
    desc: "Expert guidance and professional installation",
  },
  {
    icon: (
      <span className="bg-gradient-to-br from-[#6ee7b7] via-[#34d399] to-[#4ade80] flex items-center justify-center h-14 w-14 rounded-xl shadow-md mb-3">
        <PhoneCall size={32} className="text-white drop-shadow" />
      </span>
    ),
    title: "24x7 Support",
    desc: "Instant help on phone, WhatsApp & site visits",
  },
];

const brands = [
  {
    name: "CP PLUS",
    img: "https://1000logos.net/wp-content/uploads/2023/03/CP-PLUS-logo.png",
  },
  {
    name: "Hikvision",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Hikvision_logo.svg/512px-Hikvision_logo.svg.png",
  },
  {
    name: "Dahua",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/82/Dahua_Technology_logo.svg",
  },
  {
    name: "Honeywell",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Honeywell_logo.svg/512px-Honeywell_logo.svg.png",
  },
];

const stats = [
  {
    value: "1000+",
    label: "Installations",
  },
  {
    value: "30+",
    label: "Years Experience",
  },
  {
    value: "1",
    label: "Contact Point",
  },
];

const NasVisionCctvCamera = () => {
  return (
    <div className="bg-gradient-to-br from-[#fff9f4] via-[#fffbf5] to-[#fef6f1] min-h-screen w-full">
      {/* Hero section */}
      <section className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row gap-14 items-center px-4 py-10 md:py-20">
        {/* Content Left */}
        <div className="flex-1 w-full">
          <span className="inline-block mb-4 bg-[#fffbe9] border border-[#fde68a] text-[#f59e42] font-semibold px-4 py-1 rounded-full uppercase text-xs tracking-widest shadow-sm text-center w-full md:w-auto">
            Welcome to Network Automation Solutions
          </span>
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-black leading-tight text-gray-900 mb-2 text-center md:text-left">
            <span className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              CCTV
            </span>{" "}
            solutions for your home & office
          </h1>
          <p className="mt-4 text-gray-600 md:text-lg max-w-lg text-center md:text-left mx-auto md:mx-0">
            CCTV | Video Door Phones | Smart Lighting | EPABX | WiFi
            <br className="hidden md:block"/>
            <span className="inline md:block">
              30+ years in Indore & nearby. One-stop for installation, support & upgrades.
            </span>
          </p>
          {/* Features */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-5 mt-8">
            {features.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center bg-white/80 backdrop-blur-sm p-5 rounded-2xl border hover:border-orange-300 transition shadow group min-w-0"
              >
                {item.icon}
                <h3 className="text-base font-bold text-gray-800 text-center">{item.title}</h3>
                <p className="text-xs text-gray-500 text-center mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
          {/* CTA */}
          <div className="flex mt-10 gap-4 flex-wrap justify-center md:justify-start">
            <button className="bg-gradient-to-br from-red-500 via-orange-500 to-yellow-400 text-white font-bold px-8 py-3 rounded-xl shadow hover:brightness-110 hover:shadow-lg transition-all outline-none w-full sm:w-auto">
              Get Free Consultation
            </button>
            <button className="px-8 py-3 font-semibold rounded-xl border border-orange-200 bg-white hover:bg-orange-100 text-orange-600 transition w-full sm:w-auto">
              See Services
            </button>
          </div>
        </div>
        {/* CCTV camera graphic (right side, bigger, updated) */}
        <div className="flex-1 flex items-center justify-center w-full mb-8 md:mb-0">
          <div className="rounded-3xl p-6 md:p-10 bg-[#fff] shadow-xl border border-orange-50 flex items-center justify-center w-full md:max-w-xs">
            <CctvCameraGraphic />
          </div>
        </div>
      </section>

      {/* Stats & Brand Logos */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Stats */}
          <div className="w-full md:w-2/5 flex flex-row md:flex-col justify-around gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-gradient-to-tr from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100 shadow text-center flex-1 min-w-[90px]"
              >
                <div className="text-3xl md:text-4xl font-black text-red-500 mb-1">{stat.value}</div>
                <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
          {/* Brand Logos - Centered images and responsive */}
          <div className="w-full md:w-3/5">
            <h2 className="text-xl font-extrabold text-orange-700 text-center md:text-left mb-4 tracking-tight">
              Trusted Brands We Offer
            </h2>
            <div
              className="
                grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                gap-6 md:gap-8 justify-items-center items-center
                "
            >
              {brands.map((brand) => (
                <div
                  key={brand.name}
                  className="bg-white p-4 rounded-xl border border-orange-50 shadow hover:scale-105 transition-transform flex flex-col items-center justify-center min-w-0 w-full"
                  style={{ maxWidth: 140 }}
                >
                  <div className="flex items-center justify-center w-full">
                    <img
                      src={brand.img}
                      alt={brand.name}
                      className="mx-auto mb-2 h-12 md:h-14 w-auto object-contain block"
                      style={{ display: "block", maxHeight: 56 }}
                    />
                  </div>
                  <p className="text-xs font-semibold text-gray-700 text-center">{brand.name}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-4 text-center md:text-left">
              Global leaders in CCTV, networking & smart security products.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NasVisionCctvCamera;