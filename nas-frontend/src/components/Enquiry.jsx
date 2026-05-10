import React, { useState } from "react";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const Enquiry = ({ open, onClose }) => {
  const [form, setForm] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappMessage = `
Hello Network Automation Solutions,

New Enquiry Details

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}

Message:
${form.message}
    `;

    const whatsappURL = `https://wa.me/918570922334?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    setSubmitted(true);
    setForm(initialFormState);

    setTimeout(() => {
      setSubmitted(false);

      if (onClose) {
        onClose();
      }
    }, 2000);
  };

  // Close on ESC
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (onClose) onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn">
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 relative overflow-hidden">

        {/* Close Button */}
        <button
          className="absolute top-3 right-3 bg-white/70 rounded-full p-2 text-red-700 hover:bg-white transition focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 22 22"
          >
            <path d="M6 6l10 10M16 6L6 16" />
          </svg>
        </button>

        <div className="p-6 md:p-10">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-300">
            Enquiry Form
          </h2>

          <p className="text-white mb-8">
            Please fill out the form below to contact us on WhatsApp.
          </p>

          {/* Success Message */}
          {submitted && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 font-medium text-center animate-fadeIn">
              Redirecting to WhatsApp...
            </div>
          )}

          {/* Form */}
          {!submitted && (
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              {/* Name */}
              <div>
                <label
                  className="block text-lg font-semibold mb-2 text-white"
                  htmlFor="name"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  autoComplete="name"
                  className="w-full px-4 py-3 rounded-lg bg-white/90 placeholder-gray-400 text-gray-900 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  className="block text-lg font-semibold mb-2 text-white"
                  htmlFor="email"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/90 placeholder-gray-400 text-gray-900 focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  className="block text-lg font-semibold mb-2 text-white"
                  htmlFor="phone"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  autoComplete="tel"
                  className="w-full px-4 py-3 rounded-lg bg-white/90 placeholder-gray-400 text-gray-900 focus:outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="block text-lg font-semibold mb-2 text-white"
                  htmlFor="message"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  className="w-full px-4 py-3 rounded-lg bg-white/90 placeholder-gray-400 text-gray-900 focus:outline-none min-h-[100px]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-yellow-300 text-red-700 font-semibold rounded-lg shadow hover:bg-yellow-400 transition duration-300"
              >
                Submit Enquiry
              </button>
            </form>
          )}
        </div>

        {/* Animation */}
        <style>
          {`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: scale(0.96);
              }

              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            .animate-fadeIn {
              animation: fadeIn 0.3s ease;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Enquiry;