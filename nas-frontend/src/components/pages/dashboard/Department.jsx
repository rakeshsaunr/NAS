import React, { useEffect, useState } from "react";
import axios from "axios";

// Department form popup as a separate component, declared outside of Department
const DepartmentFormPopup = ({ open, onClose, form, onChange, onSubmit }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          aria-label="Close popup"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-6">Create Department</h2>
        <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Department Name"
            className="input"
            value={form.name}
            onChange={onChange}
            required
          />
          {/* CODE */}
          <input
            type="text"
            name="code"
            placeholder="Department Code"
            className="input"
            value={form.code}
            onChange={onChange}
          />
          {/* CONTACT PERSON */}
          <input
            type="text"
            name="contactPerson"
            placeholder="Contact Person"
            className="input"
            value={form.contactPerson}
            onChange={onChange}
          />
          {/* CONTACT NUMBER */}
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            className="input"
            value={form.contactNumber}
            onChange={onChange}
          />
          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="input"
            value={form.email}
            onChange={onChange}
          />
          {/* STATUS */}
          <select
            name="status"
            className="input"
            value={form.status}
            onChange={onChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Department Description"
            className="input md:col-span-2"
            rows="3"
            value={form.description}
            onChange={onChange}
          />
          {/* CREATED BY */}
          <input
            type="text"
            name="createdBy"
            placeholder="Created By"
            className="input"
            value={form.createdBy}
            onChange={onChange}
          />
          {/* REMARKS */}
          <textarea
            name="remarks"
            placeholder="Remarks"
            className="input md:col-span-2"
            rows="3"
            value={form.remarks}
            onChange={onChange}
          />
          {/* BUTTON */}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl md:col-span-2"
          >
            Save Department
          </button>
        </form>
      </div>
    </div>
  );
};

const API = "http://localhost:5000/api/v1/department";

const Department = () => {
  // ===========================================
  // STATES
  // ===========================================
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    contactPerson: "",
    contactNumber: "",
    email: "",
    status: "Active",
    createdBy: "",
    remarks: "",
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // ===========================================
  // FETCH DEPARTMENTS (outside of render)
  // ===========================================
  useEffect(() => {
    // Avoid calling setState directly on every render
    axios.get(API)
      .then(res => setDepartments(res.data.data))
      .catch(error => { console.log(error); });
  }, []);

  // ===========================================
  // HANDLE CHANGE
  // ===========================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===========================================
  // SUBMIT
  // ===========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate name is not empty or only whitespace
    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    try {
      await axios.post(API, form);
      setSuccessMsg("Department Created Successfully");
      // Refresh departments list
      const res = await axios.get(API);
      setDepartments(res.data.data);
      setForm({
        name: "",
        code: "",
        description: "",
        contactPerson: "",
        contactNumber: "",
        email: "",
        status: "Active",
        createdBy: "",
        remarks: "",
      });
      setIsPopupOpen(false);
      // Clear success after short delay
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Department Management</h1>
        <p className="text-gray-500">
          Create and manage departments
        </p>
      </div>
      {/* Success notification */}
      {successMsg && (
        <div className="mb-6">
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow">{successMsg}</div>
        </div>
      )}
      {/* CREATE BUTTON */}
      <div className="mb-6">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl"
        >
          + Add Department
        </button>
      </div>
      {/* Popup for Department Form */}
      <DepartmentFormPopup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow mt-6 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Contact Person</th>
              <th className="p-3 text-left">Contact Number</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.code}</td>
                <td className="p-3">{item.contactPerson}</td>
                <td className="p-3">{item.contactNumber}</td>
                <td className="p-3">{item.status}</td>
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

export default Department;