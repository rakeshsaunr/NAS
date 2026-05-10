import React, { useState } from 'react';
import {
  Globe,
  Award,
  Users,
  ShieldCheck,
  Building2,
  GraduationCap,
  BriefcaseBusiness,
  Hospital,
  ShoppingCart,
  Banknote,
  Home,
  Warehouse,
  Bus,
  Cable,
} from "lucide-react";

// Simple data for industry verticals
const industries = [
  {
    title: "Retail & Shopping Malls",
    desc: "Transform retail security and shopper experiences with robust surveillance and automation solutions.",
    icon: ShoppingCart,
    badge: "POPULAR",
  },
  {
    title: "Education (Schools/Colleges)",
    desc: "Ensure campus safety and operational efficiency for students and staff.",
    icon: GraduationCap,
    badge: "",
  },
  {
    title: "Healthcare & Hospitals",
    desc: "Safeguard patients, staff, and critical areas of healthcare facilities.",
    icon: Hospital,
    badge: "RECOMMENDED",
  },
  {
    title: "Banking & Finance",
    desc: "Enhance security and compliance across banks and ATMs with advanced solutions.",
    icon: Banknote,
    badge: "",
  },
  {
    title: "Corporate Offices",
    desc: "Modernize office security, access, and environment control for businesses.",
    icon: BriefcaseBusiness,
    badge: "",
  },
  {
    title: "Residential Societies",
    desc: "Protect gated communities and homes with integrated security and networking.",
    icon: Home,
    badge: "",
  },
  {
    title: "Warehouses & Logistics",
    desc: "Monitor inventory and logistics for smooth supply chain management.",
    icon: Warehouse,
    badge: "",
  },
  {
    title: "Hospitality (Hotels, Resorts)",
    desc: "Offer guests a safe and smart stay by deploying advanced technology.",
    icon: Building2,
    badge: "",
  },
  {
    title: "Transport & Bus Stations",
    desc: "Elevate passenger safety and monitor transit corridors with ease.",
    icon: Bus,
    badge: "",
  },
  {
    title: "Factories & Industries",
    desc: "Secure critical assets and enable automation on factory floors.",
    icon: Cable,
    badge: "",
  },
];

function IndustryCard({ title, desc, icon: Icon, badge }) {
  return (
    <div className="bg-white border border-gray-100 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all p-4 rounded flex flex-col items-center text-center max-w-xs w-full mx-auto group relative h-full">
      {badge && (
        <span className="absolute top-2 left-2 bg-orange-600 text-white text-[9px] px-2 py-0.5 rounded uppercase font-bold">{badge}</span>
      )}
      <div className="mb-4 mt-2 text-blue-700 group-hover:text-blue-900 transition-colors">
        <Icon size={36} />
      </div>
      <h3 className="font-bold text-md mb-2 text-gray-800 group-hover:text-blue-900 transition-colors">{title}</h3>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
}

export default function Industries() {
  const [search, setSearch] = useState("");

  // Simple search filter
  const filteredIndustries = industries.filter(
    (ind) =>
      ind.title.toLowerCase().includes(search.toLowerCase()) ||
      ind.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white py-10 px-4 text-center border-b-4 border-orange-400">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Industry Solutions</h1>
          <p className="text-blue-100 text-xs md:text-base max-w-2xl mx-auto">
            Customized IT, Security, and Automation for every Industry. Empower your business or institution
            with reliable, scalable technology – delivered by Network Automation Solutions.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-3 py-8">
        <div className="mb-8 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="font-bold text-gray-800 text-md">
            {filteredIndustries.length} Industry Verticals
          </div>
          <div>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Industry (e.g. Retail, Hospital)..."
              className="border border-gray-200 rounded px-3 py-1 text-xs outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {filteredIndustries.map((item, idx) => (
            <IndustryCard key={idx} {...item} />
          ))}
        </div>

        {/* Can't find? */}
        <div className="mt-12 text-center">
          <span className="inline-block bg-blue-50 text-blue-900 px-4 py-2 text-xs rounded font-bold">Didn't find your industry?</span>
          <p className="mt-2 text-xs text-gray-500 mb-3">
            We're happy to create tailor-made solutions for any business, institution, or organization in India.
          </p>
          <button className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white px-6 py-2 rounded-full font-bold uppercase text-xs hover:from-orange-500 hover:via-red-400 hover:to-red-600 transition-all">Contact Our Experts</button>
        </div>
      </main>

      {/* Trust Badges */}
      <section className="bg-white border-y py-8 mt-8">
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