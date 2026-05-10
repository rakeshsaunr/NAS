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

const App = () => {
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
    <div className="min-h-screen bg-white font-sans selection:bg-red-100 selection:text-red-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'Outfit', sans-serif; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.5s ease forwards; }
      `}</style>

      {/* Quick Impact Stats & Branding Header */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Logo/Branding centered at the top */}
          <div className="flex flex-col items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-200">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Secure Vision</h1>
            <p className="text-gray-500 font-medium">Professional Security Solutions</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Installations", val: "500+" },
              { label: "Services", val: "11+" },
              { label: "Support", val: "24/7" },
              { label: "Years Exp.", val: "10+" }
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-3xl font-extrabold text-red-600 mb-1">{stat.val}</div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">Hamari Services</h2>
          <div className="w-20 h-1.5 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const isActive = index === activeIndex;
            return (
              <button
                key={service.id}
                onClick={() => handleServiceClick(index)}
                className={`flex flex-col items-center gap-4 p-6 rounded-3xl border transition-all duration-300 ${
                  isActive 
                    ? 'border-red-500 bg-red-50 shadow-xl scale-105' 
                    : 'border-gray-100 bg-white hover:border-red-200 hover:shadow-md'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  isActive ? 'bg-red-600 text-white' : 'bg-red-50 text-red-600'
                }`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className={`text-sm font-bold ${isActive ? 'text-red-700' : 'text-gray-700'}`}>
                  {service.name}
                </span>
              </button>
            );
          })}
        </div>

        {activeService && (
          <div ref={detailRef} className="bg-gray-900 text-white rounded-3xl p-10 shadow-2xl fade-in flex flex-col md:flex-row items-center gap-8 border-l-8 border-red-600">
            <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center flex-shrink-0">
              <activeService.icon className="w-12 h-12 text-red-500" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-4">{activeService.name}</h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">{activeService.desc}</p>
            </div>
          </div>
        )}
      </section>

      {/* Inquiry Form & Info Block */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
          
          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Sampark Karein</h2>
            <div className="space-y-6">
              {[
                { icon: Phone, title: "Phone", info: "+91 98765 43210" },
                { icon: Mail, title: "Email", info: "contact@securevision.com" },
                { icon: MapPin, title: "Address", info: "Main Road, New Delhi" },
                { icon: Clock, title: "Hours", info: "Mon-Sat: 9AM-7PM" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-red-600 shadow-sm">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.title}</p>
                    <p className="text-gray-900 font-semibold">{item.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Integrated Form */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Free Site Survey Ke Liye Form Bharein</h3>
            <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Pura Naam</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 focus:bg-white focus:border-red-500 outline-none transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Phone Number</label>
                <input type="tel" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 focus:bg-white focus:border-red-500 outline-none transition-all" placeholder="+91..." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Konsi Service Chahiye?</label>
                <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 focus:bg-white focus:border-red-500 outline-none transition-all appearance-none">
                  <option>CCTV Surveillance</option>
                  <option>Home Automation</option>
                  <option>Biometric System</option>
                  <option>Others</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-5 rounded-xl shadow-lg shadow-red-200 flex items-center justify-center gap-3 transition-all active:scale-95">
                  <Send className="w-5 h-5" />
                  SUBMIT ENQUIRY
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;