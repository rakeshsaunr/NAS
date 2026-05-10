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

const SolutionCard = ({ icon: Icon, title, desc, badge }) => (
  <div className="bg-white group border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all p-3 rounded-md flex flex-col h-full max-w-[250px] mx-auto relative">
    {badge && (
      <div className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm z-10 uppercase">
        {badge}
      </div>
    )}
    <div className="aspect-[1/1] bg-blue-50 flex items-center justify-center mb-3 overflow-hidden rounded group-hover:bg-white transition-colors" style={{ minHeight: 80 }}>
      <div className="relative">
        <Icon size={44} className="text-blue-300 group-hover:text-blue-900 group-hover:scale-110 transition-all duration-300" />
        <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-sm">
          <ShieldCheck size={13} className="text-green-500" />
        </div>
      </div>
    </div>
    <div className="flex-grow flex flex-col">
      <h3 className="text-gray-800 text-base font-semibold leading-tight mb-1 group-hover:text-blue-900 transition-colors">
        {title}
      </h3>
      <div className="text-[11px] text-gray-500 mb-3 flex-1">
        {desc}
      </div>
    </div>
    <button className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 text-white hover:from-orange-500 hover:to-blue-600 py-1.5 rounded font-bold uppercase text-[10px] transition-all flex items-center justify-center gap-2 mt-auto">
      <ShoppingCart size={13} /> Enquire Now
    </button>
  </div>
);

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => { document.removeEventListener('mousedown', listener); };
  }, [ref, handler]);
};

const FilterDropdown = ({
  filters,
  onVerticalChange
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setOpen(false));

  const domains = [
    'Home & Apartment',
    'Retail/Showroom',
    'Offices',
    'School/College',
    'Hospitals',
    'Societies/Gates',
    'Hotel/Restaurants',
    'Warehouse/Factory'
  ];

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
        <div className="absolute left-0 mt-2 bg-white border rounded shadow-xl w-[240px] max-w-[94vw] p-3 space-y-3">
          <div>
            <h4 className="font-bold text-gray-800 mb-2 text-[11px] uppercase">Choose Vertical</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
              {domains.map(domain => (
                <label key={domain} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-blue-600">
                  <input
                    type="checkbox"
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    checked={filters.verticals.includes(domain)}
                    onChange={() => onVerticalChange(domain)}
                  />{domain}
                </label>
              ))}
            </div>
          </div>
          <div>
            <button className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 text-white py-1.5 rounded text-[11px] font-bold uppercase hover:from-orange-500 hover:to-blue-600 transition-colors mt-1">Need Bulk Solutions?</button>
          </div>
        </div>
      )}
    </div>
  );
};

function filterSolutions(solutions, filters) {
  if (!filters.verticals.length) return solutions;
  return solutions.filter(
    sol => sol.domains.some(dom => filters.verticals.includes(dom))
  );
}

export default function SecuritySolution() {
  const [filters, setFilters] = useState({
    verticals: []
  });

  const handleVerticalChange = (domain) => {
    setFilters(f => ({
      ...f,
      verticals: f.verticals.includes(domain)
        ? f.verticals.filter(b => b !== domain)
        : [...f.verticals, domain],
    }));
  };

  const solutions = [
    {
      title: "CCTV Video Surveillance",
      desc: "IP, Analog & Wireless Cameras, DVRs/NVRs for every scale – remote/mobile view, night vision, analytics.",
      icon: Camera,
      badge: "TOP PICK",
      domains: [
        'Home & Apartment', 'Retail/Showroom', 'Offices', 'Societies/Gates', 'Warehouse/Factory', 'School/College'
      ]
    },
    {
      title: "Access Control & Biometric",
      desc: "Smart card/fingerprint/face devices. Restrict entry, maintain attendance, and integrate with doors/gates.",
      icon: Cpu,
      badge: "POPULAR",
      domains: [
        'Offices', 'School/College', 'Hospitals', 'Societies/Gates', 'Warehouse/Factory'
      ]
    },
    {
      title: "Video Door Phones",
      desc: "Interact safely with visitors via video/audio before granting access – standalone & multi-apartment solutions.",
      icon: Smartphone,
      badge: "",
      domains: [
        'Home & Apartment', 'Societies/Gates', 'Hotel/Restaurants'
      ]
    },
    {
      title: "Intrusion Alarm Systems",
      desc: "Motion, magnetic and smoke detectors with siren alerts. Get notified instantly of break-in attempts.",
      icon: Server,
      badge: "",
      domains: [
        'Home & Apartment', 'Retail/Showroom', 'Offices', 'Warehouse/Factory'
      ]
    },
    {
      title: "Smart Automation",
      desc: "Remotely control lights, appliances, and energy usage. Enhance security with scheduled scenes and monitoring.",
      icon: Wifi,
      badge: "NEW",
      domains: [
        'Home & Apartment', 'Offices', 'Hotel/Restaurants'
      ]
    },
    {
      title: "Gate & Boom Barrier Automation",
      desc: "Secure, contactless vehicle access for societies/facilities—ANPR, RFID, remote opening.",
      icon: HardDrive,
      badge: "ADVANCED",
      domains: [
        'Societies/Gates', 'Warehouse/Factory', 'Hotel/Restaurants'
      ]
    },
    {
      title: "IT Networking & Server Racks",
      desc: "Structured cabling, Wi-Fi, firewalls, server & storage solutions. Reliable for business-critical ops.",
      icon: Database,
      badge: "",
      domains: [
        'Offices', 'Retail/Showroom', 'School/College', 'Warehouse/Factory'
      ]
    },
    {
      title: "Fire Safety Systems",
      desc: "Fire alarm panels, detectors, extinguishers and evacuation alerts for active protection across premises.",
      icon: Award,
      badge: "",
      domains: [
        'School/College', 'Offices', 'Warehouse/Factory', 'Hotel/Restaurants', 'Hospitals'
      ]
    },
  ];

  const filteredSolutions = filterSolutions(solutions, filters);

  return (
    <div className="min-h-screen bg-blue-50 font-sans text-gray-900 pb-20">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white py-10 px-4 text-center border-b-4 border-orange-400">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Security Solutions for Every Need</h1>
          <p className="text-blue-100 text-xs md:text-base max-w-2xl mx-auto">
            Protect your home, office, and business with our advanced security technologies.<br />
            Customized solutions for every industry – ab har jagah sureksha!
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-3 py-8">
        <div className="flex flex-col lg:flex-row gap-5">

          {/* Sidebar - Hidden on md+ */}
          <aside className="hidden lg:block w-full lg:w-60 space-y-4">
            <div className="bg-white p-3 border rounded shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-blue-900 font-bold uppercase text-xs border-b pb-2">
                <Filter size={13} /> <span>Choose Vertical</span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="space-y-1 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                    {[
                      'Home & Apartment',
                      'Retail/Showroom',
                      'Offices',
                      'School/College',
                      'Hospitals',
                      'Societies/Gates',
                      'Hotel/Restaurants',
                      'Warehouse/Factory'
                    ].map(domain => (
                      <label key={domain} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-blue-600">
                        <input
                          type="checkbox"
                          className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                          checked={filters.verticals.includes(domain)}
                          onChange={() => handleVerticalChange(domain)}
                        />{domain}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded border border-blue-100">
              <h4 className="font-bold text-blue-900 text-xs mb-1">Need Bulk Solutions?</h4>
              <p className="text-[11px] text-blue-700 mb-3">Get special pricing and expert guidance for large requirements or multi-site security.</p>
              <button className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 text-white py-1.5 rounded text-[11px] font-bold uppercase hover:from-orange-500 hover:to-blue-600 transition-colors">Contact Team</button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-grow">

            {/* Top Toolbar */}
            <div className="bg-white p-2 border rounded mb-5 flex flex-col md:flex-row justify-between items-center gap-3 shadow-sm">
              <div className="text-xs text-gray-500">Showing <span className="font-bold text-gray-800">{filteredSolutions.length}</span> Solutions</div>
              <div className="flex gap-3 w-full md:w-auto items-center">
                  {/* Filter Dropdown - visible on mobile/tablet */}
                  <span className="block w-full md:w-auto md:hidden">
                    <FilterDropdown 
                      filters={filters}
                      onVerticalChange={handleVerticalChange}
                    />
                  </span>
                  <select className="flex-grow md:w-40 p-1.5 border border-gray-200 rounded text-xs outline-none focus:border-blue-500">
                      <option>Sort by: Most Relevant</option>
                      <option>Newest First</option>
                      <option>Industry</option>
                  </select>
              </div>
            </div>

            {/* Solution Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredSolutions.map((s, i) => (
                    <SolutionCard 
                        key={i}
                        icon={s.icon}
                        title={s.title}
                        desc={s.desc}
                        badge={s.badge}
                    />
                ))}
            </div>

            {/* Load More / Pagination */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <button className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 text-white border-0 px-6 py-2 rounded-full font-bold uppercase text-xs hover:from-orange-500 hover:to-blue-600 transition-all">
                Load More Solutions
              </button>
              <div className="flex items-center gap-1">
                  <button className="w-7 h-7 flex items-center justify-center rounded border text-gray-400 hover:bg-gray-100 transition-colors"><ChevronLeft size={13} /></button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border bg-blue-900 text-white font-bold text-xs">1</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border hover:bg-gray-100 text-xs">2</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border hover:bg-gray-100 text-xs">3</button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border text-gray-400 hover:bg-gray-100 transition-colors"><ChevronRight size={13} /></button>
              </div>
            </div>
            {/* No Enquiry Form as per CCTV page */}
          </div>
        </div>
      </main>

      {/* Trust Badges */}
      <section className="bg-white border-y py-8 mt-6">
        <div className="max-w-7xl mx-auto px-3 grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
                { title: "Pan India Projects", sub: "Deployment across Bharat", icon: Globe },
                { title: "100% Genuine", sub: "Brand Guarantee", icon: ShieldCheck },
                { title: "Expert Solutions", sub: "Planning to Installation", icon: Users },
                { title: "Safe Payments", sub: "Encrypted & Trusted", icon: Award }
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