import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send form data to your backend / email service
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-extrabold text-red-700 mb-6">Contact Us</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Get in Touch</h2>
      <p className="mb-6 text-gray-700">
        Reach out to us for inquiries, consultations, or support.
      </p>

      {/* Contact Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Send Us a Message</h3>
        {submitted ? (
          <div className="text-green-700 font-semibold mb-2">
            Thank you for contacting us! We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-red-400"
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="phone">
                Phone
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-red-400"
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-red-400"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-red-400"
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded transition"
            >
              Submit
            </button>
          </form>
        )}
      </div>

      {/* Contact Details */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone & Email Support</h3>
        <p className="mb-2 text-gray-700">
          <span className="font-semibold">Phone:</span>{" "}
          <a href="tel:+911234567890" className="text-red-700 hover:underline">
            +91 12345 67890
          </a>
        </p>
        <p className="mb-2 text-gray-700">
          <span className="font-semibold">Email:</span>{" "}
          <a href="mailto:info@networkautomations.com" className="text-red-700 hover:underline">
            info@networkautomations.com
          </a>
        </p>
      </div>

      {/* Office Location */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Office Location</h3>
        <p className="text-gray-700 mb-1">
          101, Tech Park,<br />
          Near Brilliant Convention Centre,<br />
          Indore, Madhya Pradesh 452010,<br />
          India
        </p>
      </div>

      {/* Google Map Integration */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Us on the Map</h3>
        <div className="rounded-lg overflow-hidden border border-gray-300 shadow-md max-w-full">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.4909199417586!2d75.83725467589394!3d22.70994032940614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd614f80f381%3A0x98b51f4578df2b25!2sBrilliant%20Convention%20Centre%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1709638744441!5m2!1sen!2sin"
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect with Us</h3>
        <div className="flex space-x-5">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-800"
            title="Facebook"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" width="32" height="32">
              <path d="M22.675 0h-21.35C.594 0 0 .593 0 1.326v21.348C0 23.406.594 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z"/>
            </svg>
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-500"
            title="Twitter"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" width="32" height="32">
              <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.916 4.916 0 0 0 16.616 3c-2.717 0-4.92 2.206-4.92 4.92 0 .386.045.763.128 1.124C7.728 8.808 4.1 6.845 1.671 3.149a4.822 4.822 0 0 0-.666 2.475c0 1.708.869 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.28 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.631 1.965 2.445 3.396 4.6 3.435A9.872 9.872 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.004-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-700"
            title="LinkedIn"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" width="32" height="32">
              <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.62c-1.13 0-2.05-.92-2.05-2.05s.92-2.05 2.05-2.05a2.05 2.05 0 1 1 0 4.1zm15.11 12.83h-3.56v-5.62c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.96v5.73H9.3V9h3.42v1.56h.05c.48-.91 1.66-1.87 3.41-1.87 3.65 0 4.32 2.4 4.32 5.51v6.25z"/>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-pink-500"
            title="Instagram"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" width="32" height="32">
              <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.206.056 1.98.24 2.437.415.463.176.795.386 1.143.734.348.347.559.68.735 1.143.175.457.359 1.231.415 2.437.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.056 1.206-.24 1.98-.415 2.437a2.977 2.977 0 0 1-.734 1.143 2.977 2.977 0 0 1-1.143.734c-.457.175-1.231.359-2.437.415-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.206-.056-1.98-.24-2.437-.415a3.009 3.009 0 0 1-1.143-.734 2.977 2.977 0 0 1-.734-1.143c-.175-.457-.359-1.231-.415-2.437C2.175 15.647 2.163 15.267 2.163 12c0-3.204.012-3.584.07-4.849.056-1.206.24-1.98.415-2.437A2.986 2.986 0 0 1 3.382 3.57a2.977 2.977 0 0 1 1.143-.734c.457-.175 1.231-.359 2.437-.415C8.416 2.175 8.796 2.163 12 2.163M12 0C8.741 0 8.332.013 7.052.07 5.775.127 4.802.313 4.067.585a5.841 5.841 0 0 0-2.1 1.357 5.86 5.86 0 0 0-1.357 2.1c-.272.735-.458 1.708-.515 2.985C.013 8.332 0 8.741 0 12c0 3.259.013 3.668.07 4.948.057 1.277.243 2.25.515 2.985.314.836.746 1.544 1.357 2.101a5.814 5.814 0 0 0 2.1 1.357c.735.272 1.708.458 2.985.515C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.07 1.277-.057 2.25-.243 2.985-.515a5.827 5.827 0 0 0 2.1-1.357 5.838 5.838 0 0 0 1.357-2.1c.272-.735.458-1.708.515-2.985.057-1.28.07-1.689.07-4.948s-.013-3.668-.07-4.948c-.057-1.277-.243-2.25-.515-2.985a5.868 5.868 0 0 0-1.357-2.1 5.881 5.881 0 0 0-2.1-1.357c-.735-.272-1.708-.458-2.985-.515C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324A6.162 6.162 0 0 0 12 5.838zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.2-10.406a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;