import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const API_BASE = "http://localhost:3000/api/v1/callslip";

const initialForm = {
  customerName: '',
  department: '',
  companyName: '',
  contactNumber: '',
  email: '',
  address: '',
  callNumber: '',
  callDate: '',
  callTime: '',
  callType: {
    projectWork: false,
    installation: false,
    maintenance: false,
    amcVisit: false,
    serviceCall: false,
    siteSurvey: false,
  },
  charges: {
    serviceCharges: '',
    totalAmount: '',
    paymentMode: '',
    paymentStatus: '',
  },
  products: {
    cctv: false,
    biometric: false,
    networking: false,
    security: false,
    epabx: false,
    automation: false,
  },
  complaintType: '',
  problemDescription: '',
  serviceDetails: '',
  errorDetails: '',
  priorityLevel: 'Low',
  loggedBy: '',
};

const priorityLevels = ['Low', 'Medium', 'High', 'Urgent'];

function buildCallSlipPayload(form) {
  return {
    ...form,
    callType: { ...form.callType },
    charges: { ...form.charges },
    products: { ...form.products },
  };
}

const CallSlip = () => {
  const [callSlips, setCallSlips] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch call slips (like projects)
  const fetchCallSlips = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setCallSlips(res.data?.data || []);
    } catch (err) {
      console.error("Fetch call slips error:", err);
      setFormError("Failed to fetch call slips.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallSlips();
  }, []);

  // Handle input & checkbox changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('callType.')) {
      const key = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        callType: {
          ...prev.callType,
          [key]: checked,
        },
      }));
    } else if (name.startsWith('charges.')) {
      const key = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        charges: {
          ...prev.charges,
          [key]: type === "number" ? Number(value) : value,
        }
      }));
    } else if (name.startsWith('products.')) {
      const key = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        products: {
          ...prev.products,
          [key]: checked,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]:
          type === 'checkbox' ? checked
          : type === 'number' ? Number(value)
          : value,
      }));
    }
    setFormError("");
  };

  const handleEdit = (slip) => {
    setEditId(slip._id);
    setForm({
      ...slip,
      callType: { ...initialForm.callType, ...slip.callType },
      charges: { ...initialForm.charges, ...slip.charges },
      products: { ...initialForm.products, ...slip.products },
    });
    setShowForm(true);
    setFormError('');
    setSuccessMsg('');
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm(initialForm);
    setShowForm(false);
    setFormError('');
    setSuccessMsg('');
  };

  // Delete slip
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this call slip?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCallSlips();
    } catch (err) {
      alert("Failed to delete. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMsg("");
    if (!form.customerName.trim()) {
      setFormError("Customer Name is required");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setFormError("You must be logged in to submit a call slip.");
        setSubmitting(false);
        return;
      }

      const payload = buildCallSlipPayload(form);

      if (editId) {
        await axios.put(`${API_BASE}/${editId}`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        setSuccessMsg("Call Slip updated successfully!");
      } else {
        await axios.post(API_BASE, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        setSuccessMsg("Call Slip submitted successfully!");
      }
      setForm(initialForm);
      setEditId(null);
      setShowForm(false);
      fetchCallSlips();
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
        "Submission failed, please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-2 sm:px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Call Slips</h2>
          <button
            onClick={() => {
              setShowForm(f => !f);
              setForm(initialForm);
              setEditId(null);
              setFormError('');
              setSuccessMsg('');
            }}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded shadow font-bold transition"
          >
            {showForm ? (editId ? "Cancel Edit" : "Close Form") : "Add New"}
          </button>
        </div>

        {/* Form area modal style */}
        {showForm && (
          <div className="fixed z-30 inset-0 bg-black bg-opacity-30 flex items-center justify-center animate-fade-in">
            <div className="bg-white rounded-md p-6 w-full max-w-lg relative shadow-md">
              <form onSubmit={handleSubmit} className="space-y-3">
                <h3 className="text-xl font-semibold mb-2">{editId ? 'Update Call Slip' : 'New Call Slip'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-medium">Customer Name<span className="text-pink-600">*</span></label>
                    <input name="customerName" value={form.customerName} onChange={handleChange} required className="input"/>
                  </div>
                  <div>
                    <label className="font-medium">Department</label>
                    <input name="department" value={form.department} onChange={handleChange} className="input"/>
                  </div>
                  <div>
                    <label className="font-medium">Company Name</label>
                    <input name="companyName" value={form.companyName} onChange={handleChange} className="input"/>
                  </div>
                  <div>
                    <label className="font-medium">Contact Number</label>
                    <input name="contactNumber" value={form.contactNumber} onChange={handleChange} type="tel" className="input"/>
                  </div>
                  <div>
                    <label className="font-medium">Email</label>
                    <input name="email" value={form.email} onChange={handleChange} type="email" className="input"/>
                  </div>
                  <div>
                    <label className="font-medium">Address</label>
                    <input name="address" value={form.address} onChange={handleChange} className="input"/>
                  </div>
                  <div>
                    <label className="font-medium">Call Number</label>
                    <input name="callNumber" value={form.callNumber} onChange={handleChange} className="input"/>
                  </div>
                  <div>
                    <label className="font-medium">Call Date</label>
                    <input name="callDate" value={form.callDate} onChange={handleChange} type="date" className="input"/>
                  </div>
                  <div>
                    <label className="font-medium">Call Time</label>
                    <input name="callTime" value={form.callTime} onChange={handleChange} type="time" className="input"/>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">Call Type</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(initialForm.callType).map((key) => (
                      <label key={key} className="inline-flex items-center gap-1">
                        <input
                          type="checkbox"
                          name={`callType.${key}`}
                          checked={form.callType[key]}
                          onChange={handleChange}
                          className="accent-pink-600"
                        />
                        <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">Products</label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(initialForm.products).map((key) => (
                      <label key={key} className="inline-flex items-center gap-1">
                        <input
                          type="checkbox"
                          name={`products.${key}`}
                          checked={form.products[key]}
                          onChange={handleChange}
                          className="accent-pink-600"
                        />
                        <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-medium">Service Charges</label>
                    <input
                      name="charges.serviceCharges"
                      value={form.charges.serviceCharges}
                      onChange={handleChange}
                      type="number"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="font-medium">Total Amount</label>
                    <input
                      name="charges.totalAmount"
                      value={form.charges.totalAmount}
                      onChange={handleChange}
                      type="number"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="font-medium">Payment Mode</label>
                    <input
                      name="charges.paymentMode"
                      value={form.charges.paymentMode}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="font-medium">Payment Status</label>
                    <input
                      name="charges.paymentStatus"
                      value={form.charges.paymentStatus}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium">Complaint Type</label>
                  <input name="complaintType" value={form.complaintType} onChange={handleChange} className="input"/>
                </div>
                <div>
                  <label className="font-medium">Problem Description</label>
                  <textarea name="problemDescription" value={form.problemDescription} onChange={handleChange} className="input"/>
                </div>
                <div>
                  <label className="font-medium">Service Details</label>
                  <textarea name="serviceDetails" value={form.serviceDetails} onChange={handleChange} className="input"/>
                </div>
                <div>
                  <label className="font-medium">Error Details</label>
                  <textarea name="errorDetails" value={form.errorDetails} onChange={handleChange} className="input"/>
                </div>
                <div>
                  <label className="font-medium">Priority Level</label>
                  <select name="priorityLevel" value={form.priorityLevel} onChange={handleChange} className="input">
                    {priorityLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-medium">Logged By</label>
                  <input name="loggedBy" value={form.loggedBy} onChange={handleChange} className="input"/>
                </div>

                {formError && <div className="text-red-600 text-sm">{formError}</div>}
                {successMsg && <div className="text-green-600 text-sm">{successMsg}</div>}

                <div className="flex gap-3 justify-end mt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded shadow font-semibold transition disabled:opacity-60"
                  >
                    {submitting ? (editId ? "Updating..." : "Submitting...") : (editId ? "Update" : "Submit")}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Calls List */}
        <div className="bg-white rounded-md shadow p-4">
          {loading ? (
            <div className="text-gray-800">Loading call slips...</div>
          ) : (
            callSlips.length === 0 ? (
              <div className="text-gray-600">No call slips found.</div>
            ) : (
              <div className="grid gap-4">
                {callSlips.map((slip) => (
                  <div
                    key={slip._id || slip.callNumber}
                    className="relative border rounded-md p-4 pb-4 bg-gray-50 shadow flex flex-col gap-2"
                  >
                    {/* Buttons */}
                    <div className="flex w-full justify-end gap-2 mb-2 md:mb-0 md:absolute md:top-2 md:right-2 z-10 blog-action-btns">
                      <button
                        onClick={() => handleEdit(slip)}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 shadow transition h-8 w-8 flex items-center justify-center"
                        title="Update"
                      >
                        <FaRegEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(slip._id)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow transition h-8 w-8 flex items-center justify-center"
                        title="Delete"
                      >
                        <RiDeleteBin5Line className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">{slip.customerName}</h3>
                        <div className="text-gray-700 mb-1 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                          <span><strong>Company:</strong> {slip.companyName || <span className="text-gray-400">N/A</span>}</span>
                          <span><strong>Contact:</strong> {slip.contactNumber || <span className="text-gray-400">N/A</span>}</span>
                          <span><strong>Date:</strong> {slip.callDate || <span className="text-gray-400">N/A</span>}</span>
                          <span><strong>Priority:</strong> <span className={
                            slip.priorityLevel === 'High' ? 'text-red-600 font-bold'
                              : slip.priorityLevel === 'Urgent' ? 'text-red-700 font-extrabold'
                              : slip.priorityLevel === 'Medium' ? 'text-yellow-600 font-medium'
                              : 'text-gray-700 font-normal'
                          }>{slip.priorityLevel}</span></span>
                        </div>
                        <div className="text-gray-600 mb-2"><strong>Department:</strong> {slip.department}</div>
                        <div className="flex flex-wrap gap-3 text-xs mb-1">
                          <span className="bg-pink-100 px-2 py-0.5 rounded-full">
                            {Object.entries(slip.callType || {}).filter(([k,v])=>v).map(([k])=>k.charAt(0).toUpperCase()+k.slice(1)).join(", ") || 'No Call Type'}
                          </span>
                          <span className="bg-blue-100 px-2 py-0.5 rounded-full">
                            {Object.entries(slip.products || {}).filter(([k,v])=>v).map(([k])=>k.charAt(0).toUpperCase()+k.slice(1)).join(", ") || 'No Product'}
                          </span>
                        </div>
                        <div className="text-gray-700 break-words mb-1">
                          <strong>Complaint Type:</strong> {slip.complaintType}
                        </div>
                        {slip.problemDescription && (
                          <div className="text-gray-600 text-sm"><strong>Problem:</strong> {slip.problemDescription}</div>
                        )}
                        {slip.serviceDetails && (
                          <div className="text-gray-600 text-sm"><strong>Service:</strong> {slip.serviceDetails}</div>
                        )}
                        {slip.errorDetails && (
                          <div className="text-gray-600 text-sm"><strong>Error:</strong> {slip.errorDetails}</div>
                        )}
                        <div className="mt-2 text-xs text-gray-500">
                          <span><strong>Logged By:</strong> {slip.loggedBy || <span className="text-gray-400">N/A</span>}</span>
                          {slip.callNumber && <span className="ml-3"><strong>Call #:</strong> {slip.callNumber}</span>}
                          {slip.callTime && <span className="ml-3"><strong>Time:</strong> {slip.callTime}</span>}
                        </div>
                        {/* Charges block */}
                        {(slip.charges && (slip.charges.serviceCharges || slip.charges.totalAmount)) && (
                          <div className="mt-2">
                            <span className="inline-block bg-green-100 text-green-700 rounded px-2 py-0.5 mr-2">
                              Charges: {slip.charges.serviceCharges} / Total: {slip.charges.totalAmount}
                            </span>
                            <span className="inline-block bg-yellow-100 text-yellow-800 rounded px-2 py-0.5 mr-2">
                              {slip.charges.paymentMode} ({slip.charges.paymentStatus})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Simple fade-in animation for modal */}
        <style>{`
          .animate-fade-in {
            animation: fadeIn 0.18s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98);}
            to { opacity: 1; transform: scale(1);}
          }
          .input {
            @apply w-full border-gray-300 focus:border-pink-500 focus:ring-pink-200 rounded px-3 py-1.5 text-gray-800 text-sm shadow-sm border;
          }
          .blog-action-btns {
            /* Used for responsive action buttons similar to Project.jsx */
          }
          @media (max-width: 767px) {
            .blog-action-btns {
              position: static !important;
              margin-bottom: 0.5rem !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default CallSlip;