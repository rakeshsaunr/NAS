import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const SocialIcon = ({ href, children, label, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-500/20 transition-colors"
    style={{ color: color }}
  >
    {children}
  </a>
);

const gradientTextClass =
  "hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#d60000] hover:to-[#ff6464] focus:text-transparent focus:bg-clip-text focus:bg-gradient-to-r focus:from-[#d60000] focus:to-[#ff6464]";
// applies red gradient to text color on hover & focus

const Footer = () => {
  const footerLinks = [
    {
      title: "Connect & Discover",
      links: [
        "Contact us",
        "Privacy policy",
        "Advertise with us",
        "Tradeshows",
        "Blogs",
        "News & events"
      ]
    },
    {
      title: "About Us",
      links: [
        "About Network Automation Solutions",
        "Success stories",
        "FAQ",
        "Career with us"
      ]
    },
    {
      title: "For buyers",
      links: [
        "Exporters directory",
        "All categories",
        "Sellers",
        "Feedback",
        "Regions"
      ]
    },
    {
      title: "For sellers",
      links: [
        "Buyers",
        "GTP Trade Assurance",
        "Customer Testimonials",
        "Terms & conditions",
        "Complaint"
      ]
    }
  ];

  const categories = [
    "Agriculture",
    "Apparel And Fashion Accessories",
    "Construction & Real Estate",
    "Electronic & Electrical",
    "Food & Beverages",
    "Home Furnishing",
    "Minerals & Metals"
  ];

  const socialLinks = [
    {
      href: "https://www.facebook.com/",
      label: "Facebook",
      color: "#3b5998",
      icon: <FaFacebookF size={20} />
    },
    {
      href: "https://www.twitter.com/",
      label: "Twitter",
      color: "#1da1f2",
      icon: <FaTwitter size={20} />
    },
    {
      href: "https://www.linkedin.com/",
      label: "LinkedIn",
      color: "#0077b5",
      icon: <FaLinkedinIn size={20} />
    },
    {
      href: "https://www.instagram.com/",
      label: "Instagram",
      color: "#e4405f",
      icon: <FaInstagram size={20} />
    }
  ];

  return (
    <footer className="bg-white text-black font-sans selection:bg-red-500 selection:text-black">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-5">

            <h3 className="text-2xl font-bold mb-4">
              Network Automation Solutions
            </h3>
            <p className="text-[10px] text-gray-700">
                30+ Years Experience in CCTV & IT Solutions
            </p>
            <p className="text-sm leading-relaxed text-gray-700 pr-4">
            Network Automation Solutions is a leading Home Automation & Security System company in Indore providing CCTV, Video Door Phone, EPABX, WiFi Networking, Smart Lighting & Security Solutions with Sales, Installation & AMC support since 2001.
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-6">
            {footerLinks.map((section, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-sm mb-4">
                  {section.title}
                </h4>

                <ul className="space-y-2">
                  {section.links.map((linkText, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href="#"
                        className={`text-xs text-gray-600 transition-colors ${gradientTextClass}`}
                      >
                        {linkText}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">

          <div className="w-full md:w-1/3">
            <h4 className="text-yellow-400 font-bold text-xl mb-3">
              Subscribe for newsletter
            </h4>

            <div className="relative flex items-center">

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full py-2 px-4 rounded-sm text-black outline-none bg-gray-100"
              />

              <button className="absolute right-0 bg-black border-l border-gray-200 px-4 py-2 flex items-center gap-1 text-yellow-300 font-bold hover:bg-gray-800 transition-colors">
                {/* Icon removed */}
                <span className="text-sm">Send</span>
              </button>

            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-2 mt-6 md:mt-0">
            {socialLinks.map((social) => (
              <SocialIcon
                href={social.href}
                key={social.label}
                label={social.label}
                color={social.color}
              >
                {social.icon}
              </SocialIcon>
            ))}
          </div>
        </div>

        {/* Countries section removed */}

        {/* Categories */}
        <div className="border-t border-gray-300 pt-6 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold text-gray-700">

          {categories.map((cat, idx) => (
            <React.Fragment key={idx}>
              <a
                href="#"
                className={`whitespace-nowrap transition-colors ${gradientTextClass}`}
              >
                {cat}
              </a>
              {idx !== categories.length - 1 && (
                <span className="text-gray-400">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;