import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { RiMenu4Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

// Animated Hamburger with hero-like underline, uses RiMenu4Fill icon when closed and IoMdClose when open
const AnimatedHamburger = ({ open, toggle }) => {
  return (
    <button
      aria-label={open ? "Close menu" : "Open menu"}
      tabIndex={0}
      type="button"
      onClick={toggle}
      className="relative w-9 h-9 rounded flex flex-col items-center justify-center focus:outline-none z-50 group text-red-600"
      style={{ background: "none", minWidth: 0, padding: 0 }}
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <span className="relative w-[2.2rem] h-[2.2rem] flex items-center justify-center">
        {/* Hamburger icon when closed, close icon when open */}
        <RiMenu4Fill
          size={32}
          className={`absolute transition-all duration-300 ${open ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
        />
        <IoMdClose
          size={32}
          className={`absolute transition-all duration-300 ${open ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        />
        {/* Animated underline, only show when closed */}
        {!open && (
          <span
            className="
              absolute left-1/2 -translate-x-1/2 bottom-[-5px]
              h-[0.24rem] bg-red-600 rounded-full w-0 
              group-hover:w-4/5
              transition-all duration-300
            "
            style={{ transition: "all 0.35s cubic-bezier(.4,2,.6,1)" }}
          ></span>
        )}
      </span>
    </button>
  );
};

const useDropdown = (initial = false, delay = 200) => {
  const [open, setOpen] = useState(initial);
  const timeoutRef = useRef(null);

  const clearTimeoutRef = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearTimeoutRef();
    setOpen(true);
  };

  const handleMouseLeave = () => {
    clearTimeoutRef();
    timeoutRef.current = setTimeout(() => setOpen(false), delay);
  };

  // These are safe to just expose
  const handleDropdownMouseEnter = handleMouseEnter;
  const handleDropdownMouseLeave = handleMouseLeave;

  // Touch friendly/click on button (for button-triggered menus)
  const handleToggleClick = (e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      clearTimeoutRef();
    };
  }, []);

  return {
    open,
    setOpen,
    handleMouseEnter,
    handleMouseLeave,
    handleDropdownMouseEnter,
    handleDropdownMouseLeave,
    handleToggleClick,
  };
};

const Navbar = () => {
  const aboutDropdown = useDropdown(false, 200);
  const productDropdown = useDropdown(false, 200); // NEW
  const servicesDropdown = useDropdown(false, 200);
  const joinHandDropdown = useDropdown(false, 200);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false); // NEW
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileJoinHandOpen, setMobileJoinHandOpen] = useState(false);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Desktop product dropdown items for correct links & text
  const desktopProductDropdownItems = [
    {
      to: "/pages/products",
      label: "All Products",
    },
    {
      to: "/product/cctv-surveillance",
      label: "CCTV Surveillance Systems",
    },
    {
      to: "/product/biometric-systems",
      label: "Biometric Systems",
    },
    {
      to: "/product/networking-solutions",
      label: "Networking Solutions",
    },
    {
      to: "/product/epabx",
      label: "EPABX Systems",
    },
    {
      to: "/product/security-solutions",
      label: "Security Solutions",
    },
    {
      to: "/product/home-automation",
      label: "Home Automation",
    },
    {
      to: "/product/industries-we-serve",
      label: "Industries We Serve",
    },
  ];

  // Mobile product dropdown items: exactly the same as desktop
  const mobileProductDropdownItems = desktopProductDropdownItems;

  // Join Hand Dropdown Items (for both desktop and mobile)
  const joinHandDropdownItems = [
    {
      to: "/pages/career",
      label: "Career With Us",
    },
    {
      to: "/pages/internship",
      label: "Internship Program",
    },
    {
      to: "/pages/partner-with-us",
      label: "Partner With Us",
    },
    {
      to: "/pages/franchise-opportunity",
      label: "Franchise Opportunity",
    },
    {
      to: "/pages/dealer-registration",
      label: "Dealer Registration",
    },
    {
      to: "/pages/vendor-registration",
      label: "Vendor Registration",
    },
  ];

  return (
    <>
      <nav className="bg-[#f2fbff] shadow-sm sticky top-0 z-50 animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* LEFT: Logo */}
            <div className="flex items-center flex-shrink-0 animate-fade-in-left">
              <Link
                to="/"
                aria-label="Home"
                onClick={handleLogoClick}
                className="flex items-center"
              >
                <img
                  className="h-35 w-35 object-contain transition-transform duration-300 hover:scale-105"
                  src="/logo.png"
                  alt="Logo"
                />
              </Link>
            </div>

            {/* CENTER: Nav links */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex items-center space-x-6">
                {/* About */}
                <div
                  className="relative group animate-stagger-fade-in"
                  style={{ animationDelay: "0s" }}
                  onMouseEnter={aboutDropdown.handleMouseEnter}
                  onMouseLeave={aboutDropdown.handleMouseLeave}
                >
                  <button
                    className="flex items-center space-x-1 hover:text-red-600 text-sm px-2 py-1 relative bg-transparent focus:outline-none"
                    onClick={aboutDropdown.handleToggleClick}
                  >
                    <span>About</span>
                    <ChevronDown size={16} />
                    <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-red-600 -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  {aboutDropdown.open && (
                    <div
                      className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in-up"
                      onMouseEnter={aboutDropdown.handleDropdownMouseEnter}
                      onMouseLeave={aboutDropdown.handleDropdownMouseLeave}
                    >
                      <Link
                        to="/pages/about"
                        className="block px-3 py-1 text-sm hover:bg-gray-100"
                      >
                        About Us
                      </Link>
                      {/* Additional About menu items can be added here */}
                      {/* <Link
                        to="/pages/testimonial"
                        className="block px-3 py-1 text-sm hover:bg-gray-100"
                      >
                        Testimonial
                      </Link> */}
                    </div>
                  )}
                </div>
                {/* Product */}
                <div
                  className="relative group animate-stagger-fade-in"
                  style={{ animationDelay: "0.15s" }}
                  onMouseEnter={productDropdown.handleMouseEnter}
                  onMouseLeave={productDropdown.handleMouseLeave}
                >
                  <button
                    className="flex items-center space-x-1 hover:text-red-600 text-sm px-2 py-1 relative bg-transparent focus:outline-none"
                    onClick={productDropdown.handleToggleClick}
                  >
                    <span>Product</span>
                    <ChevronDown size={16} />
                    <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-red-600 -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  {productDropdown.open && (
                    <div
                      className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in-up"
                      onMouseEnter={productDropdown.handleDropdownMouseEnter}
                      onMouseLeave={productDropdown.handleDropdownMouseLeave}
                    >
                      {desktopProductDropdownItems.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="block px-3 py-1 text-sm hover:bg-gray-100"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                {/* Our Work */}
                <Link
                  to="/pages/work"
                  className="hover:text-red-600 text-sm px-2 py-1 relative group animate-stagger-fade-in"
                  style={{ animationDelay: "0.60s" }}
                >
                  Our Work
                  <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-red-600 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
                </Link>
                {/* Services */}
                <div
                  className="relative group animate-stagger-fade-in"
                  style={{ animationDelay: "0.75s" }}
                  onMouseEnter={servicesDropdown.handleMouseEnter}
                  onMouseLeave={servicesDropdown.handleMouseLeave}
                >
                  <button
                    className="flex items-center space-x-1 hover:text-red-600 text-sm px-2 py-1 relative bg-transparent focus:outline-none"
                    onClick={servicesDropdown.handleToggleClick}
                  >
                    <span>Services</span>
                    <ChevronDown size={16} />
                    <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-red-600 -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  {servicesDropdown.open && (
                    <div
                      className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in-up"
                      onMouseEnter={servicesDropdown.handleDropdownMouseEnter}
                      onMouseLeave={servicesDropdown.handleDropdownMouseLeave}
                    >
                      <Link
                        to="/pages/installation-services"
                        className="block px-3 py-1 text-sm hover:bg-gray-100"
                      >
                        Installation Services
                      </Link>
                      <Link
                        to="/pages/maintenance-services"
                        className="block px-3 py-1 text-sm hover:bg-gray-100"
                      >
                        Maintenance Services
                      </Link>
                      <Link
                        to="/pages/amc-services"
                        className="block px-3 py-1 text-sm hover:bg-gray-100"
                      >
                        AMC (Annual Maintenance Contract)
                      </Link>
                      <Link
                        to="/pages/offshore-support"
                        className="block px-3 py-1 text-sm hover:bg-gray-100"
                      >
                        Offshore Support / Remote Working
                      </Link>
                      <Link
                        to="/pages/fms-services"
                        className="block px-3 py-1 text-sm hover:bg-gray-100"
                      >
                        FMS (Facility Management Services)
                      </Link>
                      <Link
                        to="/pages/our-proces"
                        className="block px-3 py-1 text-sm hover:bg-gray-100"
                      >
                        Our Process
                      </Link>
                    </div>
                  )}
                </div>
                {/* Contact link added after Work */}
                <Link
                  to="/pages/contact"
                  className="hover:text-red-600 text-sm px-2 py-1 relative group animate-stagger-fade-in"
                  style={{ animationDelay: "0.63s" }}
                >
                  Contact
                  <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-red-600 -translate-x-1/2 group-hover:w-full transition-all duration-300" />
                </Link>
                {/* Join Hand */}
                <div
                  className="relative group animate-stagger-fade-in"
                  style={{ animationDelay: "0.90s" }}
                  onMouseEnter={joinHandDropdown.handleMouseEnter}
                  onMouseLeave={joinHandDropdown.handleMouseLeave}
                >
                  <button
                    className="flex items-center space-x-1 hover:text-red-600 text-sm px-2 py-1 relative bg-transparent focus:outline-none"
                    onClick={joinHandDropdown.handleToggleClick}
                  >
                    <span>Join Hand</span>
                    <ChevronDown size={16} />
                    <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-red-600 -translate-x-1/2 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  {joinHandDropdown.open && (
                    <div
                      className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in-up"
                      onMouseEnter={joinHandDropdown.handleDropdownMouseEnter}
                      onMouseLeave={joinHandDropdown.handleDropdownMouseLeave}
                    >
                      {joinHandDropdownItems.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="block px-3 py-1 text-sm hover:bg-gray-100"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                {/* Enquiry Now Button - desktop */}
                <Link
                  to="/enquiry"
                  className="ml-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-400 text-white text-sm font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200 animate-stagger-fade-in"
                  style={{ animationDelay: "1s" }}
                >
                  Enquiry Now
                </Link>
                {/* Admin/Login Button */}
                <Link
                  to="/login"
                  className="ml-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-800 to-gray-600 text-white text-sm font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200 animate-stagger-fade-in"
                  style={{ animationDelay: "1.1s" }}
                >
                  Admin
                </Link>
              </div>
            </div>

            {/* RIGHT: Hamburger */}
            <div className="flex items-center space-x-3 ml-auto animate-fade-in-right">
              {/* Mobile hamburger */}
              <div className="md:hidden flex items-center h-14">
                <AnimatedHamburger
                  open={mobileMenuOpen}
                  toggle={() => setMobileMenuOpen((o) => !o)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white shadow-lg absolute top-16 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? "max-h-[80vh] opacity-100 animate-fade-in" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col px-4 py-4 space-y-2">
            {/* About (mobile) */}
            <div>
              <button
                className="flex items-center w-full justify-between px-2 py-1 text-left font-normal hover:text-red-600 text-sm"
                onClick={() => setMobileAboutOpen((v) => !v)}
              >
                <span>About</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  mobileAboutOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden pl-4">
                  <Link
                    to="/pages/about"
                    className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  {/*<Link
                    to="/pages/testimonial"
                    className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Testimonial
                  </Link>*/}
                </div>
              </div>
            </div>
            {/* Product (mobile) */}
            <div>
              <button
                className="flex items-center w-full justify-between px-2 py-1 text-left font-normal hover:text-red-600 text-sm"
                onClick={() => setMobileProductOpen((v) => !v)}
              >
                <span>Product</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileProductOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  mobileProductOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden pl-4">
                  {mobileProductDropdownItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {/* Add more product mobile dropdown links as needed */}
                </div>
              </div>
            </div>
            {/* Our Work */}
            <Link
              to="/pages/work"
              className="block px-2 py-1 hover:text-red-600 text-sm animate-stagger-fade-in"
              style={{ animationDelay: "0.3s" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Work
            </Link>
            {/* Services (mobile) */}
            <div>
              <button
                className="flex items-center w-full justify-between px-2 py-1 text-left font-normal hover:text-red-600 text-sm"
                onClick={() => setMobileServicesOpen((v) => !v)}
              >
                <span>Services</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  mobileServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden pl-4">
                  <Link
                    to="/pages/services"
                    className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Services
                  </Link>
                  <Link
                    to="/pages/installation-services"
                    className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Installation Services
                  </Link>
                </div>
              </div>
            </div>
            {/* Contact */}
            <Link
              to="/pages/contact"
              className="block px-2 py-1 hover:text-red-600 text-sm animate-stagger-fade-in"
              style={{ animationDelay: "0.33s" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {/* Join Hand Dropdown (Mobile) */}
            <div>
              <button
                className="flex items-center w-full justify-between px-2 py-1 text-left font-normal hover:text-red-600 text-sm"
                onClick={() => setMobileJoinHandOpen((v) => !v)}
              >
                <span>Join Hand</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileJoinHandOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  mobileJoinHandOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden pl-4">
                  {joinHandDropdownItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Enquiry Now Button - mobile */}
            <Link
              to="/enquiry"
              className="block w-full mt-2 px-3 py-1.5 rounded-full bg-white text-red-600 text-sm font-semibold shadow-md text-center hover:scale-105 hover:shadow-lg transition-transform duration-200"
              style={{ animationDelay: "1s" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Enquiry Now
            </Link>
            {/* Admin/Login Button - mobile */}
            <Link
              to="/login"
              className="block w-full mt-2 px-3 py-1.5 rounded-full bg-white text-gray-900 border border-gray-900 text-sm font-semibold shadow-md text-center hover:scale-105 hover:shadow-lg transition-transform duration-200"
              style={{ animationDelay: "1.1s" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;