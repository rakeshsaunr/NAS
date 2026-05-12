import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

const API_BASE = "http://localhost:5000/api/v1/servicecall";

const STATUS_OPTIONS = [
  "Pending",
  "In Progress",
  "Completed",
  "Closed",
  "Hold",
];

const initialForm = {
  callSheetNumber: "",
  date: "",
  callStartTime: "",
  callEndTime: "",
  companyName: "",
  customerName: "",
  wiringDetails: "",
  productDetails: "",
  serviceDescription: "",
  workStatus: "Pending",
  customerRemark: "",
  technicianRemarks: "",

  workType: {
    newInstallation: false,
    serviceCall: false,
    maintenance: false,
  },
};

const Service = () => {
  const [serviceCalls, setServiceCalls] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  // ================= FETCH =================
  const fetchServiceCalls = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_BASE);

      setServiceCalls(res.data?.data || []);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch service calls");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceCalls();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= HANDLE CHECKBOX =================
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      workType: {
        ...prev.workType,
        [name]: checked,
      },
    }));
  };

  // ================= VALIDATION =================
  const validateForm = () => {
    if (!form.callSheetNumber)
      return "Call Sheet Number is required";

    if (!form.date)
      return "Date is required";

    if (!form.callStartTime)
      return "Call Start Time is required";

    if (!form.callEndTime)
      return "Call End Time is required";

    if (!form.companyName)
      return "Company Name is required";

    if (!form.customerName)
      return "Customer Name is required";

    return null;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();

    if (error) {
      alert(error);
      return;
    }

    try {
      setSubmitting(true);

      const body = {
        ...form,
      };

      if (editId) {
        const res = await axios.put(
          `${API_BASE}/${editId}`,
          body
        );

        const updated = res.data.data;

        setServiceCalls((prev) =>
          prev.map((item) =>
            item._id === editId ? updated : item
          )
        );

        alert("Service Call Updated");
      } else {
        const res = await axios.post(API_BASE, body);

        setServiceCalls((prev) => [
          res.data.data,
          ...prev,
        ]);

        alert("Service Call Added");
      }

      setForm(initialForm);
      setEditId(null);
      setShowForm(false);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this service call?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE}/${id}`);

      setServiceCalls((prev) =>
        prev.filter((item) => item._id !== id)
      );

      alert("Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  // ================= EDIT =================
  const handleEdit = (call) => {
    setForm({
      callSheetNumber: call.callSheetNumber || "",
      date: call.date
        ? call.date.split("T")[0]
        : "",
      callStartTime: call.callStartTime || "",
      callEndTime: call.callEndTime || "",
      companyName: call.companyName || "",
      customerName: call.customerName || "",
      wiringDetails: call.wiringDetails || "",
      productDetails: call.productDetails || "",
      serviceDescription:
        call.serviceDescription || "",
      workStatus: call.workStatus || "Pending",
      customerRemark: call.customerRemark || "",
      technicianRemarks:
        call.technicianRemarks || "",

      workType: {
        newInstallation:
          call.workType?.newInstallation || false,
        serviceCall:
          call.workType?.serviceCall || false,
        maintenance:
          call.workType?.maintenance || false,
      },
    });

    setEditId(call._id);
    setShowForm(true);
  };

  // ================= CANCEL =================
  const handleCancel = () => {
    setForm(initialForm);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-3xl font-bold">
            Service Calls
          </h1>

          <button
            onClick={() => {
              setShowForm(true);
              setEditId(null);
              setForm(initialForm);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add Service Call
          </button>
        </div>

        {/* MODAL */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto">
            <div className="bg-white w-full max-w-3xl rounded-lg p-6 relative">

              <button
                onClick={handleCancel}
                className="absolute top-3 right-3 text-2xl"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold mb-5">
                {editId
                  ? "Update Service Call"
                  : "Add Service Call"}
              </h2>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >

                <input
                  type="text"
                  name="callSheetNumber"
                  placeholder="Call Sheet Number"
                  value={form.callSheetNumber}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <input
                  type="text"
                  name="callStartTime"
                  placeholder="Call Start Time"
                  value={form.callStartTime}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <input
                  type="text"
                  name="callEndTime"
                  placeholder="Call End Time"
                  value={form.callEndTime}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={form.companyName}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <input
                  type="text"
                  name="customerName"
                  placeholder="Customer Name"
                  value={form.customerName}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                {/* CHECKBOX */}
                <div className="col-span-2">
                  <label className="font-semibold block mb-2">
                    Work Type
                  </label>

                  <div className="flex gap-5 flex-wrap">

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="newInstallation"
                        checked={
                          form.workType.newInstallation
                        }
                        onChange={handleCheckbox}
                      />
                      New Installation
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="serviceCall"
                        checked={
                          form.workType.serviceCall
                        }
                        onChange={handleCheckbox}
                      />
                      Service Call
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="maintenance"
                        checked={
                          form.workType.maintenance
                        }
                        onChange={handleCheckbox}
                      />
                      Maintenance
                    </label>

                  </div>
                </div>

                <textarea
                  name="wiringDetails"
                  placeholder="Wiring Details"
                  value={form.wiringDetails}
                  onChange={handleChange}
                  className="border p-2 rounded md:col-span-2"
                />

                <textarea
                  name="productDetails"
                  placeholder="Product Details"
                  value={form.productDetails}
                  onChange={handleChange}
                  className="border p-2 rounded md:col-span-2"
                />

                <textarea
                  name="serviceDescription"
                  placeholder="Service Description"
                  value={form.serviceDescription}
                  onChange={handleChange}
                  className="border p-2 rounded md:col-span-2"
                />

                <select
                  name="workStatus"
                  value={form.workStatus}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}
                </select>

                <textarea
                  name="customerRemark"
                  placeholder="Customer Remark"
                  value={form.customerRemark}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <textarea
                  name="technicianRemarks"
                  placeholder="Technician Remarks"
                  value={form.technicianRemarks}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />

                <div className="col-span-2 flex justify-end gap-3 mt-4">

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    {submitting
                      ? "Saving..."
                      : editId
                      ? "Update"
                      : "Save"}
                  </button>

                </div>
              </form>
            </div>
          </div>
        )}

        {/* LIST */}
        {loading ? (
          <div className="text-center py-10">
            Loading...
          </div>
        ) : serviceCalls.length === 0 ? (
          <div className="text-center py-10">
            No Service Calls Found
          </div>
        ) : (
          <div className="grid gap-5">
            {serviceCalls.map((call) => (
              <div
                key={call._id}
                className="bg-white rounded-lg shadow p-5 relative"
              >

                {/* ACTIONS */}
                <div className="absolute top-3 right-3 flex gap-2">

                  <button
                    onClick={() => handleEdit(call)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                  >
                    <FaRegEdit />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(call._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                  >
                    <RiDeleteBin5Line />
                  </button>

                </div>

                <h2 className="text-2xl font-bold mb-2">
                  {call.customerName}
                </h2>

                <div className="grid md:grid-cols-2 gap-2 text-gray-700">

                  <p>
                    <b>Call Sheet:</b>{" "}
                    {call.callSheetNumber}
                  </p>

                  <p>
                    <b>Date:</b>{" "}
                    {new Date(
                      call.date
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    <b>Company:</b>{" "}
                    {call.companyName}
                  </p>

                  <p>
                    <b>Status:</b>{" "}
                    {call.workStatus}
                  </p>

                  <p>
                    <b>Start:</b>{" "}
                    {call.callStartTime}
                  </p>

                  <p>
                    <b>End:</b>{" "}
                    {call.callEndTime}
                  </p>

                </div>

                <div className="mt-3">

                  <p>
                    <b>Work Type:</b>
                  </p>

                  <div className="flex gap-3 mt-1 flex-wrap">

                    {call.workType?.newInstallation && (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                        New Installation
                      </span>
                    )}

                    {call.workType?.serviceCall && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                        Service Call
                      </span>
                    )}

                    {call.workType?.maintenance && (
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm">
                        Maintenance
                      </span>
                    )}

                  </div>
                </div>

                {call.serviceDescription && (
                  <div className="mt-3">
                    <b>Description:</b>
                    <p>{call.serviceDescription}</p>
                  </div>
                )}

                {call.customerRemark && (
                  <div className="mt-3">
                    <b>Customer Remark:</b>
                    <p>{call.customerRemark}</p>
                  </div>
                )}

                {call.technicianRemarks && (
                  <div className="mt-3">
                    <b>Technician Remark:</b>
                    <p>{call.technicianRemarks}</p>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Service;