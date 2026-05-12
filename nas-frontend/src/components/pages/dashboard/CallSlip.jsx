import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const API_BASE = "http://localhost:5000/api/v1/callslip";

const paymentModes = [
  "",
  "Cash",
  "Cheque",
  "Bank Transfer",
  "UPI",
  "Card",
  "Other",
];

const paymentStatuses = [
  "",
  "Paid",
  "Unpaid",
  "Pending",
  "Partial",
  "Failed",
  "Refunded",
];

// Dropdown options for Department and Complaint Type
const departmentOptions = [
  "",
  "Sales",
  "Service",
  "Support",
  "Admin",
  "Accounts",
  "IT",
  "Logistics",
  "Purchase",
  "Operations",
  "Other",
];

const complaintTypeOptions = [
  "",
  "Installation",
  "Maintenance",
  "Service",
  "Product Defect",
  "AMC Visit",
  "Technical Query",
  "Other"
];

const initialForm = {
  customerName: "",
  department: "",
  departmentOther: "",
  companyName: "",
  contactNumber: "",
  email: "",
  address: "",
  callNumber: "",
  callDate: "",
  callTime: "",

  callType: {
    projectWork: false,
    installation: false,
    maintenance: false,
    amcVisit: false,
    serviceCall: false,
    siteSurvey: false,
  },

  charges: {
    serviceCharges: "",
    totalAmount: "",
    paymentMode: "",
    paymentStatus: "",
  },

  products: {
    cctv: false,
    biometric: false,
    networking: false,
    security: false,
    epabx: false,
    automation: false,
  },

  complaintType: "",
  problemDescription: "",
  serviceDetails: "",
  errorDetails: "",
  priorityLevel: "Low",
  loggedBy: "",
};

const priorityLevels = ["Low", "Medium", "High", "Urgent"];

function buildCallSlipPayload(form) {
  return {
    ...form,

    // For plain input, no need for other field, just send department as it is
    department: form.department,

    charges: {
      ...form.charges,

      serviceCharges:
        form.charges.serviceCharges === ""
          ? 0
          : Number(form.charges.serviceCharges),

      totalAmount:
        form.charges.totalAmount === ""
          ? 0
          : Number(form.charges.totalAmount),
    },

    callType: {
      ...initialForm.callType,
      ...form.callType,
    },

    products: {
      ...initialForm.products,
      ...form.products,
    },
  };
}

const CallSlip = () => {
  const [callSlips, setCallSlips] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ================= FETCH =================
  const fetchCallSlips = async () => {
    setLoading(true);

    try {
      const res = await axios.get(API_BASE);

      console.log("GET RESPONSE =>", res.data);

      let slips = [];

      if (Array.isArray(res.data)) {
        slips = res.data;
      } else if (Array.isArray(res.data.data)) {
        slips = res.data.data;
      } else if (Array.isArray(res.data.callSlips)) {
        slips = res.data.callSlips;
      }

      setCallSlips(slips);
    } catch (error) {
      console.log("FETCH ERROR =>", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallSlips();
  }, []);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name.startsWith("callType.")) {
      const key = name.split(".")[1];

      setForm((prev) => ({
        ...prev,
        callType: {
          ...prev.callType,
          [key]: checked,
        },
      }));
    } else if (name.startsWith("products.")) {
      const key = name.split(".")[1];

      setForm((prev) => ({
        ...prev,
        products: {
          ...prev.products,
          [key]: checked,
        },
      }));
    } else if (name.startsWith("charges.")) {
      const key = name.split(".")[1];

      setForm((prev) => ({
        ...prev,
        charges: {
          ...prev.charges,
          [key]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ================= NEW =================
  const handleNewCallSlip = () => {
    setForm(initialForm);
    setEditId(null);
    setShowForm(true);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const payload = buildCallSlipPayload(form);

      let res;

      if (editId) {
        res = await axios.put(`${API_BASE}/${editId}`, payload);
      } else {
        res = await axios.post(API_BASE, payload);
      }

      console.log("SAVE RESPONSE =>", res.data);

      // Save hone ke baad latest data fetch
      await fetchCallSlips();

      setForm(initialForm);
      setEditId(null);
      setShowForm(false);
    } catch (error) {
      console.log("SAVE ERROR =>", error);

      alert(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ================= EDIT =================
  const handleEdit = (slip) => {
    setEditId(slip._id);

    setForm({
      ...initialForm,
      ...slip,

      // No need to handle departmentOther, just keep department as plain text
      callType: {
        ...initialForm.callType,
        ...slip.callType,
      },

      products: {
        ...initialForm.products,
        ...slip.products,
      },

      charges: {
        ...initialForm.charges,
        ...slip.charges,

        serviceCharges:
          slip.charges?.serviceCharges !== undefined
            ? String(slip.charges.serviceCharges)
            : "",

        totalAmount:
          slip.charges?.totalAmount !== undefined
            ? String(slip.charges.totalAmount)
            : "",
      },
    });

    setShowForm(true);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this call slip?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE}/${id}`);

      setCallSlips((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log("DELETE ERROR =>", error);
    }
  };

  // List of columns for table
  const tableColumns = [
    { label: "Action", key: "actions" },
    { label: "Customer Name", key: "customerName" },
    { label: "Company", key: "companyName" },
    { label: "Contact", key: "contactNumber" },
    { label: "Department", key: "department" },
    { label: "Complaint Type", key: "complaintType" },
    { label: "Priority", key: "priorityLevel" },
    { label: "Total Amount", key: "charges.totalAmount" },
    { label: "Payment Mode", key: "charges.paymentMode" },
    { label: "Payment Status", key: "charges.paymentStatus" },
    { label: "Call Date", key: "callDate" },
    { label: "Call Time", key: "callTime" },
    { label: "Call Number", key: "callNumber" },
    { label: "Logged By", key: "loggedBy" },
    { label: "Service Charges", key: "charges.serviceCharges" },
    { label: "Problem Description", key: "problemDescription" },
    { label: "Service Details", key: "serviceDetails" },
    { label: "Error Details", key: "errorDetails" },
    { label: "Call Type", key: "callType" },
    { label: "Products", key: "products" },
    { label: "Email", key: "email" },
    { label: "Address", key: "address" },
  ];

  // Helper for nested value retrieval
  function getValueByKey(obj, keyPath) {
    if (typeof keyPath !== "string") return "";
    if (keyPath === "callType") {
      if (!obj.callType) return "";
      // Show checked call types as comma separated
      return Object.entries(obj.callType)
        .filter(([k, v]) => v)
        .map(([k]) => k)
        .join(", ");
    }
    if (keyPath === "products") {
      if (!obj.products) return "";
      // Show checked products as comma separated
      return Object.entries(obj.products)
        .filter(([k, v]) => v)
        .map(([k]) => k)
        .join(", ");
    }
    if (keyPath.includes(".")) {
      const keys = keyPath.split(".");
      let value = obj;
      for (const k of keys) {
        value = value ? value[k] : undefined;
      }
      return value === undefined ? "" : value;
    }
    return obj[keyPath] === undefined ? "" : obj[keyPath];
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">
            Call Management
          </h2>

          <p className="text-gray-500">
            Manage all service requests
          </p>
        </div>

        <button
          onClick={handleNewCallSlip}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-xs"
          style={{ fontSize: "0.75rem" }}
        >
          + New Call Slip
        </button>
   
   
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-10 text-lg">
          Loading...
        </div>
      ) : (
        <>
          {/* EMPTY */}
          {callSlips.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-center shadow">
              <h2 className="text-xl font-semibold text-gray-700">
                No Call Slips Found
              </h2>
            </div>
          ) : (
            // TABLE
            <div className="bg-white rounded-xl p-4 shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead>
                  <tr>
                    {tableColumns.map((col) => (
                      <th
                        key={col.key}
                        className="px-4 py-2 font-semibold text-left bg-gray-50 text-gray-700"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {callSlips.map((slip, index) => (
                    <tr
                      key={slip._id || index}
                      className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                    >
                      {tableColumns.map((col) =>
                        col.key === "actions" ? (
                          <td
                            key={col.key}
                            className="px-3 py-2 whitespace-nowrap"
                            style={{ minWidth: 90 }}
                          >
                            <button
                              onClick={() => handleEdit(slip)}
                              title="Edit"
                              className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-2"
                            >
                              <FaRegEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(slip._id)}
                              title="Delete"
                              className="bg-red-100 text-red-600 p-2 rounded-lg"
                            >
                              <RiDeleteBin5Line />
                            </button>
                          </td>
                        ) : (
                          <td key={col.key} className="px-3 py-2">
                            {
                              col.key === "charges.totalAmount" ? (
                                (
                                  slip.charges &&
                                  slip.charges.totalAmount !== undefined &&
                                  slip.charges.totalAmount !== ""
                                )
                                  ? `₹ ${slip.charges.totalAmount}`
                                  : ""
                              )
                              : getValueByKey(slip, col.key)
                            }
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-4xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            {/* TOP */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold">
                {editId
                  ? "Update Call Slip"
                  : "New Call Slip"}
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-4"
            >
              <input
                name="customerName"
                placeholder="Customer Name"
                className="input"
                value={form.customerName}
                onChange={handleChange}
              />

              <input
                name="department"
                placeholder="Department"
                className="input"
                value={form.department}
                onChange={handleChange}
              />

              <input
                name="companyName"
                placeholder="Company Name"
                className="input"
                value={form.companyName}
                onChange={handleChange}
              />

              <input
                name="contactNumber"
                placeholder="Contact Number"
                className="input"
                value={form.contactNumber}
                onChange={handleChange}
              />

              <input
                name="email"
                placeholder="Email"
                className="input"
                value={form.email}
                onChange={handleChange}
              />

              <input
                name="address"
                placeholder="Address"
                className="input"
                value={form.address}
                onChange={handleChange}
              />

              <input
                name="callNumber"
                placeholder="Call Number"
                className="input"
                value={form.callNumber}
                onChange={handleChange}
              />

              <input
                type="date"
                name="callDate"
                className="input"
                value={form.callDate}
                onChange={handleChange}
              />

              <input
                type="time"
                name="callTime"
                className="input"
                value={form.callTime}
                onChange={handleChange}
              />

              <select
                name="priorityLevel"
                className="input"
                value={form.priorityLevel}
                onChange={handleChange}
              >
                {priorityLevels.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <input
                name="loggedBy"
                placeholder="Logged By"
                className="input"
                value={form.loggedBy}
                onChange={handleChange}
              />

              <select
                name="complaintType"
                className="input"
                value={form.complaintType}
                onChange={handleChange}
              >
                <option value="">Select Complaint Type</option>
                {complaintTypeOptions
                  .filter((type) => type !== "")
                  .map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </select>

              <input
                name="problemDescription"
                placeholder="Problem Description"
                className="input"
                value={form.problemDescription}
                onChange={handleChange}
              />

              <input
                name="serviceDetails"
                placeholder="Service Details"
                className="input"
                value={form.serviceDetails}
                onChange={handleChange}
              />

              <input
                name="errorDetails"
                placeholder="Error Details"
                className="input"
                value={form.errorDetails}
                onChange={handleChange}
              />

              {/* CHARGES */}
              <input
                type="number"
                name="charges.serviceCharges"
                placeholder="Service Charges"
                className="input"
                value={form.charges.serviceCharges}
                onChange={handleChange}
              />

              <input
                type="number"
                name="charges.totalAmount"
                placeholder="Total Amount"
                className="input"
                value={form.charges.totalAmount}
                onChange={handleChange}
              />

              {/* Payment Mode as Dropdown */}
              <select
                name="charges.paymentMode"
                className="input"
                value={form.charges.paymentMode}
                onChange={handleChange}
              >
                <option value="">Select Payment Mode</option>
                {paymentModes
                  .filter((m) => m !== "")
                  .map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
              </select>

              {/* Payment Status as Dropdown */}
              <select
                name="charges.paymentStatus"
                className="input"
                value={form.charges.paymentStatus}
                onChange={handleChange}
              >
                <option value="">Select Payment Status</option>
                {paymentStatuses
                  .filter((status) => status !== "")
                  .map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
              </select>

              {/* CALL TYPE */}
              <div className="md:col-span-2">
                <h3 className="font-semibold mb-2">
                  Call Type
                </h3>

                <div className="flex flex-wrap gap-4">
                  {Object.keys(initialForm.callType).map(
                    (type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          name={`callType.${type}`}
                          checked={form.callType[type]}
                          onChange={handleChange}
                        />

                        {type}
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* PRODUCTS */}
              <div className="md:col-span-2">
                <h3 className="font-semibold mb-2">
                  Products
                </h3>

                <div className="flex flex-wrap gap-4">
                  {Object.keys(initialForm.products).map(
                    (product) => (
                      <label
                        key={product}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          name={`products.${product}`}
                          checked={form.products[product]}
                          onChange={handleChange}
                        />

                        {product}
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* BUTTON */}
              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
                >
                  {submitting
                    ? "Saving..."
                    : "Save Call Slip"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STYLE */}
      <style>{`
        .input {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 12px;
          outline: none;
        }

        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.2);
        }
        /* Table styles for improved appearance */
        table {
          border-collapse: collapse;
        }
        th, td {
          border-right: 1px solid #ededed;
        }
        th:last-child, td:last-child {
          border-right: none;
        }
        tbody tr:last-child td {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
};

export default CallSlip;