import React from "react";

const Services = () => (
  <div className="max-w-4xl mx-auto py-10 px-6">
    <h1 className="text-4xl font-extrabold text-red-700 mb-6">Our Services</h1>

    {/* installation services */}
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Installation Services</h2>
      <p className="text-gray-700 mb-3">
        We provide complete installation services for CCTV, networking, and security systems with proper configuration and testing to ensure optimal performance.
      </p>
    </section>

    {/* maintenance services */}
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Maintenance Services</h2>
      <p className="text-gray-700 mb-3">
        Our maintenance services include regular system checks, troubleshooting, and repairs to keep your systems running smoothly.
      </p>
    </section>

    {/* AMC (Annual Maintenance Contract) */}
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">AMC (Annual Maintenance Contract)</h2>
      <p className="text-gray-700 mb-3">
        We offer cost-effective AMC plans that include scheduled maintenance, priority support, and long-term system reliability.
      </p>
    </section>

    {/* Offshore Support / Remote Working */}
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Offshore Support / Remote Working</h2>
      <p className="text-gray-700 mb-3">
        Our remote support services allow us to monitor, manage, and troubleshoot systems online, ensuring quick resolution without the need for on-site visits.
      </p>
    </section>

    {/* FMS (Facility Management Services) */}
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">FMS (Facility Management Services)</h2>
      <p className="text-gray-700 mb-3">
        We provide complete facility management services for IT and security systems, including monitoring, maintenance, reporting, and dedicated support to ensure seamless operations.
      </p>
    </section>

    {/* Our Process */}
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Process</h2>
      <ol className="list-decimal list-inside space-y-1 text-gray-700 ml-4">
        <li>Requirement Analysis</li>
        <li>Site Survey</li>
        <li>Installation</li>
        <li>Testing</li>
        <li>Support</li>
      </ol>
    </section>
  </div>
);

export default Services;