import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  Phone,
  Video,
  Network,
  Fingerprint,
  Building,
  Lock,
  Wifi,
  Flame,
  Home,
  Eye,
  Mail,
  MapPin,
  Clock,
  Send
} from 'lucide-react';

const SERVICES = [
  { id: 1, name: "CCTV Cameras", icon: Video, desc: "HD surveillance cameras for 24/7 monitoring. Supports night vision, remote viewing, and cloud recording." },
  { id: 2, name: "IP Cameras", icon: Network, desc: "High-resolution digital video streaming over your network. Easy remote access via mobile app." },
  { id: 3, name: "Biometric Systems", icon: Fingerprint, desc: "Fingerprint and face recognition for attendance & access. Tamper-proof and ideal for offices and factories." },
  { id: 4, name: "Video Door Phones", icon: Phone, desc: "See and speak to visitors before opening the door. Wired and wireless options with mobile integration." },
  { id: 5, name: "EPABX Systems", icon: Building, desc: "Private branch exchange systems for seamless internal and external office communication." },
  { id: 6, name: "Access Control", icon: Lock, desc: "Restrict entry with card readers, PIN pads, and biometric gates. Full audit trails included." },
  { id: 7, name: "WiFi Networking", icon: Wifi, desc: "Structured LAN, Wi-Fi, and fiber networking for fast, reliable connectivity across your premises." },
  { id: 8, name: "Fire Alarm Systems", icon: Flame, desc: "Addressable fire detection panels with smoke, heat, and gas detectors for early hazard warnings." },
  { id: 9, name: "Home Automation", icon: Home, desc: "Smart control of lights, fans, AC, and appliances from your phone or Alexa/Google Home." },
  { id: 10, name: "Smart Door Locks", icon: Lock, desc: "Keyless entry with PIN, fingerprint, card, or app. Auto-lock, guest codes, and usage history included." },
  { id: 11, name: "Motion Sensors", icon: Eye, desc: "PIR and microwave sensors to detect movement and trigger alerts, lights, or alarms automatically." },
];

const CctvServices = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const detailRef = useRef(null);

  const handleServiceClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  const activeService = activeIndex >= 0 ? SERVICES[activeIndex] : null;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-200 font-sans selection:bg-red-100 selection:text-red-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.5s ease forwards; }
      `}</style>

      {/* Branding Header Redesign */}
      <section className="bg-white pb-12 pt-14 px-4 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex flex-col items-center text-center md:w-2/5 gap-4">
            <div className="w-16 h-16 mb-2 bg-red-600 rounded-3xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Secure Vision Solutions</h1>
            <p className="text-gray-600 font-medium max-w-xs">Empowering your safety with advanced electronic security, automation, and connectivity services. Start protecting your premises today.</p>
            <div className="flex gap-8 mt-6">
              <div className="text-center">
                <div className="text-xl font-extrabold text-red-600">500+</div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Installations</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-extrabold text-red-600">11+</div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Services</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-extrabold text-red-600">24/7</div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Support</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-extrabold text-red-600">10+</div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Years</div>
              </div>
            </div>
          </div>
          <div className="md:w-3/5 hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=700&q=80"
              alt="Security cameras on building"
              className="rounded-3xl shadow-2xl w-full object-cover h-[320px]"
            />
          </div>
        </div>
      </section>

      {/* Modern Services Grid & Details */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Our Services</h2>
          <p className="text-gray-500 mb-2">Explore our wide range of smart security and automation offerings:</p>
          <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-14">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const isActive = index === activeIndex;
            return (
              <button
                key={service.id}
                onClick={() => handleServiceClick(index)}
                className={`flex flex-col items-center gap-4 p-6 rounded-2xl border-2 shadow-md transition-all duration-300 ${
                  isActive
                    ? 'border-red-500 bg-white scale-105 shadow-red-200'
                    : 'border-gray-100 bg-gray-50 hover:border-red-300 hover:shadow-lg'
                }`}
                aria-pressed={isActive}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'
                }`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className={`text-base font-bold ${isActive ? 'text-red-700' : 'text-gray-800'}`}>
                  {service.name}
                </span>
              </button>
            );
          })}
        </div>

        {activeService && (
          <div
            ref={detailRef}
            className="bg-white text-gray-900 rounded-3xl p-10 shadow-2xl fade-in flex flex-col md:flex-row items-center gap-8 border-l-8 border-red-600"
          >
            <div className="w-24 h-24 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
              <activeService.icon className="w-12 h-12 text-red-600" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3">{activeService.name}</h3>
              <p className="text-gray-700 text-lg leading-relaxed max-w-2xl">{activeService.desc}</p>
            </div>
          </div>
        )}
      </section>

      {/* Contact & Inquiry Block removed as per instructions */}
    </div>
  );
};

export default CctvServices;