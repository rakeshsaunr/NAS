import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE =
  "http://localhost:5000/api/v1/callslip";

const CallSlip = () => {
  const [callSlips, setCallSlips] = useState([]);

  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    companyName: "",
    contactNumber: "",
    email: "",
    address: "",

    department: "",
    category: "",
    productType: "",

    callDate: "",
    callTime: "",

    callType: "",

    complaintType: "",
    problemDescription: "",
    serviceDetails: "",
    errorDetails: "",

    priorityLevel: "Low",

    charges: {
      serviceCharges: "",
      totalAmount: "",
      paymentMode: "",
      paymentStatus: "Pending",
    },

    serviceStatus: "Pending",

    assignedEngineer: "",

    loggedBy: "",

    remarks: "",
  });

  // ================= FETCH CALL SLIPS =================

  const fetchCallSlips = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_BASE);

      setCallSlips(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH DEPARTMENTS =================

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/department"
      );

      setDepartments(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FETCH CATEGORIES =================

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/category"
      );

      setCategories(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCallSlips();
    fetchDepartments();
    fetchCategories();
  }, []);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("charges.")) {
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

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,

        charges: {
          ...form.charges,

          serviceCharges: Number(
            form.charges.serviceCharges
          ),

          totalAmount: Number(
            form.charges.totalAmount
          ),
        },
      };

      await axios.post(API_BASE, payload);

      alert("Call Slip Created Successfully");

      fetchCallSlips();

      setForm({
        customerName: "",
        companyName: "",
        contactNumber: "",
        email: "",
        address: "",

        department: "",
        category: "",
        productType: "",

        callDate: "",
        callTime: "",

        callType: "",

        complaintType: "",
        problemDescription: "",
        serviceDetails: "",
        errorDetails: "",

        priorityLevel: "Low",

        charges: {
          serviceCharges: "",
          totalAmount: "",
          paymentMode: "",
          paymentStatus: "Pending",
        },

        serviceStatus: "Pending",

        assignedEngineer: "",

        loggedBy: "",

        remarks: "",
      });
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message
      );
    }
  };

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      {/* HEADER */}

      <div className="mb-5">
        <h1 className="text-3xl font-bold">
          Call Slip Management
        </h1>

        <p className="text-gray-500">
          Manage customer service requests
        </p>
      </div>

      {/* FORM */}

      <div className="bg-white p-5 rounded-2xl shadow">
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            className="input"
            value={form.customerName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            className="input"
            value={form.companyName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            className="input"
            value={form.contactNumber}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            className="input"
            value={form.address}
            onChange={handleChange}
          />

          {/* DEPARTMENT */}

          <select
            name="department"
            className="input"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Department
            </option>

            {departments.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item.name}
              </option>
            ))}
          </select>

          {/* CATEGORY */}

          <select
            name="category"
            className="input"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Category
            </option>

            {categories.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item.name}
              </option>
            ))}
          </select>

          {/* PRODUCT TYPE */}

          <select
            name="productType"
            className="input"
            value={form.productType}
            onChange={handleChange}
          >
            <option value="">
              Select Product Type
            </option>

            {categories.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item.name}
              </option>
            ))}
          </select>

          {/* CALL DATE */}

          <input
            type="date"
            name="callDate"
            className="input"
            value={form.callDate}
            onChange={handleChange}
          />

          {/* CALL TIME */}

          <input
            type="time"
            name="callTime"
            className="input"
            value={form.callTime}
            onChange={handleChange}
          />

          {/* CALL TYPE */}

          <select
            name="callType"
            className="input"
            value={form.callType}
            onChange={handleChange}
          >
            <option value="">
              Select Call Type
            </option>

            <option value="Project Work">
              Project Work
            </option>

            <option value="Installation">
              Installation
            </option>

            <option value="Maintenance">
              Maintenance
            </option>

            <option value="AMC Visit">
              AMC Visit
            </option>

            <option value="Service Call">
              Service Call
            </option>

            <option value="Site Survey">
              Site Survey
            </option>
          </select>

          {/* PRIORITY */}

          <select
            name="priorityLevel"
            className="input"
            value={form.priorityLevel}
            onChange={handleChange}
          >
            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>

            <option value="Urgent">
              Urgent
            </option>
          </select>

          {/* COMPLAINT */}

          <input
            type="text"
            name="complaintType"
            placeholder="Complaint Type"
            className="input"
            value={form.complaintType}
            onChange={handleChange}
          />

          <textarea
            name="problemDescription"
            placeholder="Problem Description"
            className="input md:col-span-2"
            value={form.problemDescription}
            onChange={handleChange}
          />

          <textarea
            name="serviceDetails"
            placeholder="Service Details"
            className="input md:col-span-2"
            value={form.serviceDetails}
            onChange={handleChange}
          />

          <textarea
            name="errorDetails"
            placeholder="Error Details"
            className="input md:col-span-2"
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

          {/* PAYMENT MODE */}

          <select
            name="charges.paymentMode"
            className="input"
            value={form.charges.paymentMode}
            onChange={handleChange}
          >
            <option value="">
              Select Payment Mode
            </option>

            <option value="Cash">
              Cash
            </option>

            <option value="UPI">
              UPI
            </option>

            <option value="Card">
              Card
            </option>

            <option value="Bank Transfer">
              Bank Transfer
            </option>

            <option value="Cheque">
              Cheque
            </option>
          </select>

          {/* PAYMENT STATUS */}

          <select
            name="charges.paymentStatus"
            className="input"
            value={form.charges.paymentStatus}
            onChange={handleChange}
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Paid">
              Paid
            </option>
          </select>

          {/* SERVICE STATUS */}

          <select
            name="serviceStatus"
            className="input"
            value={form.serviceStatus}
            onChange={handleChange}
          >
            <option value="Pending">
              Pending
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>

          {/* ENGINEER */}

          <input
            type="text"
            name="assignedEngineer"
            placeholder="Assigned Engineer"
            className="input"
            value={form.assignedEngineer}
            onChange={handleChange}
          />

          {/* LOGGED BY */}

          <input
            type="text"
            name="loggedBy"
            placeholder="Logged By"
            className="input"
            value={form.loggedBy}
            onChange={handleChange}
          />

          {/* REMARKS */}

          <textarea
            name="remarks"
            placeholder="Remarks"
            className="input md:col-span-2"
            value={form.remarks}
            onChange={handleChange}
          />

          {/* BUTTON */}

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl md:col-span-2"
          >
            Save Call Slip
          </button>
        </form>
      </div>

      {/* TABLE */}

      <div className="bg-white mt-6 rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">
                Customer
              </th>

              <th className="p-3 text-left">
                Company
              </th>

              <th className="p-3 text-left">
                Department
              </th>

              <th className="p-3 text-left">
                Category
              </th>

              <th className="p-3 text-left">
                Priority
              </th>

              <th className="p-3 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {callSlips.map((item) => (
              <tr
                key={item._id}
                className="border-b"
              >
                <td className="p-3">
                  {item.customerName}
                </td>

                <td className="p-3">
                  {item.companyName}
                </td>

                <td className="p-3">
                  {item.department?.name}
                </td>

                <td className="p-3">
                  {item.category?.name}
                </td>

                <td className="p-3">
                  {item.priorityLevel}
                </td>

                <td className="p-3">
                  {item.serviceStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* STYLE */}

      <style>{`
        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          padding: 12px;
          border-radius: 12px;
          outline: none;
        }

        .input:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79,70,229,0.2);
        }
      `}</style>
    </div>
  );
};

export default CallSlip;