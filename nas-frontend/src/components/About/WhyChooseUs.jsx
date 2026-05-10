import {
  ShieldCheck,
  Headphones,
  Users,
  BadgeCheck,
  Wrench,
  Clock,
  Settings,
  Building2,
} from "lucide-react";

// CCTV Camera Image Component replaces SVG, using local cctv.png
const CctvCameraImage = () => (
  <img
    src="/cctv.png"
    alt="CCTV Camera"
    className="mx-auto lg:mx-0"
    style={{ width: 520, height: 400, objectFit: "contain" }}
    loading="lazy"
  />
);

const features = [
  {
    icon: <BadgeCheck size={28} strokeWidth={2.2} />,
    title: "1000+ Installations",
    desc: "Businesses and institutions trust us for our successful track record.",
    grad: "from-green-400 via-green-500 to-green-700",
  },
  {
    icon: <Users size={28} strokeWidth={2.2} />,
    title: "Expert Engineers",
    desc: "Certified team delivering reliable and secure IT solutions.",
    grad: "from-blue-400 via-blue-600 to-blue-700",
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={2.2} />,
    title: "Quality Assurance",
    desc: "We deploy premium and high-performance products only.",
    grad: "from-yellow-400 via-orange-400 to-orange-600",
  },
  {
    icon: <Clock size={28} strokeWidth={2.2} />,
    title: "Fast Installation",
    desc: "Quick and hassle-free setup with minimal downtime.",
    grad: "from-purple-400 via-pink-400 to-pink-700",
  },
  {
    icon: <Settings size={28} strokeWidth={2.2} />,
    title: "Custom Solutions",
    desc: "Tailored services according to your business needs.",
    grad: "from-rose-400 via-red-400 to-red-600",
  },
  {
    icon: <Building2 size={28} strokeWidth={2.2} />,
    title: "Affordable Pricing",
    desc: "Budget-friendly services for all business sizes.",
    grad: "from-indigo-400 via-indigo-600 to-indigo-800",
  },
  {
    icon: <Headphones size={28} strokeWidth={2.2} />,
    title: "24/7 Support",
    desc: "Friendly and instant technical support anytime.",
    grad: "from-cyan-400 via-teal-500 to-emerald-500",
  },
  {
    icon: <Wrench size={28} strokeWidth={2.2} />,
    title: "Complete Maintenance",
    desc: "From installation to long-term maintenance support.",
    grad: "from-neutral-400 via-gray-500 to-slate-800",
  },
];

const WhyChooseUs = () => {
  return (
    <>
      <section className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-white via-red-50 to-white overflow-hidden">
        {/* Background Blur Effects */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-red-200 opacity-20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-200 opacity-20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left Section */}
          <div className="flex flex-col justify-center">
            <span className="text-[12px] font-bold uppercase tracking-widest text-red-600 bg-red-100 px-4 py-1 rounded-full w-fit mb-5 shadow-sm">
              Why Choose Us
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-slate-900 mb-6">
              Trusted{" "}
              <span className="bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 bg-clip-text text-transparent">
                IT & Security
              </span>{" "}
              Solutions
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 rounded-full mb-6" />

            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              We provide modern CCTV, networking, surveillance, and IT
              infrastructure solutions for homes, offices, and industries.
              Our expert team ensures security, reliability, and complete
              customer satisfaction.
            </p>
          </div>
          {/* Right Section: CCTV Camera Image */}
          <div className="hidden lg:flex items-center justify-center">
            <CctvCameraImage />
          </div>
        </div>
      </section>

      {/* Card Section - moved to next section */}
      <section className="py-8 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {features.map((item) => (
            <div
              key={item.title}
              className="group bg-white border border-slate-100 rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover Gradient */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition duration-300 bg-gradient-to-br ${item.grad}`}
              />

              {/* Icon */}
              <div
                className={`relative z-10 w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-tr ${item.grad} text-white shadow-lg mb-5`}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-lg font-bold text-slate-900 mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;