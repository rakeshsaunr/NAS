import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { RxDashboard } from "react-icons/rx";
import {
  FaFolderOpen,
  FaRegNewspaper,
  FaBriefcase,
  FaConciergeBell,
  FaUserAlt, // Customer icon
} from "react-icons/fa";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RiStickyNote2Line } from "react-icons/ri";

/**
 * Hamburger icon (HiOutlineMenuAlt1) with gradient color like close icon, but now in red
 */
function AnimatedHamburgerSidebar({ onClick, show }) {
  if (!show) return null;

  return (
    <button
      onClick={onClick}
      aria-label="Open sidebar"
      className="fixed top-3 left-4 z-50 p-2 rounded-md transition md:hidden"
      style={{
        background: "none",
        display: show ? "block" : "none",
        minWidth: 0,
      }}
      tabIndex={0}
      type="button"
    >
      <span className="sr-only">Open sidebar</span>
      <HiOutlineMenuAlt1
        className="text-3xl"
        style={{
          WebkitMaskImage: "linear-gradient(90deg,#d60000 0%,#ff6464 100%)",
          maskImage: "linear-gradient(90deg,#d60000 0%,#ff6464 100%)",
          color: "#d60000",
          background: "linear-gradient(90deg,#d60000 0%,#ff6464 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      />
    </button>
  );
}

function AnimatedCloseSidebar({ onClick, show }) {
  if (!show) return null;
  return (
    <button
      onClick={onClick}
      aria-label="Close sidebar"
      className="relative w-10 h-10 rounded flex flex-col items-center justify-center focus:outline-none z-50 md:hidden"
      style={{ background: "none", minWidth: 0 }}
      tabIndex={0}
      type="button"
    >
      <span className="sr-only">Close sidebar</span>
      <span
        style={{
          position: "absolute",
          left: 8,
          right: 8,
          top: 20,
          height: 4,
          borderRadius: 6,
          background: "linear-gradient(90deg, #d60000 0%, #ff6464 100%)",
          transform: "rotate(45deg)",
          transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: 8,
          right: 8,
          top: 20,
          height: 4,
          borderRadius: 6,
          background: "linear-gradient(90deg, #d60000 0%, #ff6464 100%)",
          opacity: 0,
          transform: "scaleX(0)",
          transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: 8,
          right: 8,
          top: 20,
          height: 4,
          borderRadius: 6,
          background: "linear-gradient(90deg, #d60000 0%, #ff6464 100%)",
          transform: "rotate(-45deg)",
          transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
        }}
      />
    </button>
  );
}

// Dynamic menu items
const menuItems = [
  { to: "/dashboard", label: "Dashboard", icon: <RxDashboard className="inline-block text-lg text-red-600" /> },
  { to: "/dashboard/project", label: "Products", icon: <FaFolderOpen className="inline-block text-lg text-red-600" /> },
  { to: "/dashboard/experiences", label: "Experiences", icon: <FaBriefcase className="inline-block text-lg text-red-600" /> },
  { to: "/dashboard/service", label: "Services", icon: <FaConciergeBell className="inline-block text-lg text-red-600" /> },
  { to: "/dashboard/customer", label: "Customer", icon: <FaUserAlt className="inline-block text-lg text-red-600" /> }, // Added Customer menu item
  // Sahi link yahan lagaya: should be "/dashboard/callslip" instead of "/dashboard/call-slip"
  { to: "/dashboard/callslip", label: "Call Generation Slip", icon: <RiStickyNote2Line className="inline-block text-lg text-red-600" /> },
  { to: "/dashboard/blogs", label: "Blog", icon: <FaRegNewspaper className="inline-block text-lg text-red-600" /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(typeof window !== "undefined" ? window.innerWidth >= 768 : true);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setOpen(!mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) document.body.style.overflow = open ? "hidden" : "auto";
    else document.body.style.overflow = "auto";
  }, [open, isMobile]);

  return (
    <>
      {isMobile && (
        <AnimatedHamburgerSidebar onClick={() => setOpen(true)} show={!open} />
      )}

      <aside
        className={`
          ${isMobile ? "fixed z-50 top-0 left-0" : "sticky top-0"}
          w-64 bg-white shadow-lg flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:w-64
        `}
        style={{
          height: "100dvh",
          position: isMobile ? "fixed" : "sticky",
          top: 0,
          left: 0,
        }}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto md:block" />
          </div>

          {isMobile && (
            <AnimatedCloseSidebar onClick={() => setOpen(false)} show={open} />
          )}
        </div>

        <div className="flex-grow overflow-y-auto">
          <ul className="mt-4 space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`block px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200 ${
                    location.pathname === item.to
                      ? "bg-red-50 text-red-700 font-semibold shadow-sm"
                      : "text-gray-700 hover:bg-red-100 hover:text-red-900"
                  }`}
                  onClick={() => isMobile && setOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-200 mt-auto py-3 text-center text-sm text-gray-500">
          © 2026 Network Automation Solutions
        </div>
      </aside>

      {isMobile && open && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-[2px] z-40 md:hidden transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
