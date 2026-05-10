import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://portfolio-backend-3nr9.onrender.com/api/v1/services";

// Mapped model according to @services-model.js (fields: title, shortDescription, longDescription, price, durationDays, tags[], imageUrl)
const blankForm = {
  title: "",
  shortDescription: "",
  longDescription: "",
  price: "",
  durationDays: "",
  tags: "",
};
const Service = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(blankForm);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch Services
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setServices(res.data?.data || []);
    } catch (err) {
      console.error("Fetch services error:", err);
      alert("Failed to fetch services — check console for details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setFormError("");
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Model-matched validation (title and shortDescription required; image required on create)
    if (!form.title.trim()) return setFormError("Title is required");
    if (!form.shortDescription.trim())
      return setFormError("Short description is required");
    if (!editId && !imageFile)
      return setFormError("Image file is required");

    setFormError("");
    const data = new FormData();
    data.append("title", form.title);
    data.append("shortDescription", form.shortDescription);
    data.append("longDescription", form.longDescription);
    if (form.price !== "") data.append("price", Number(form.price)); // numeric per model
    if (form.durationDays !== "") data.append("durationDays", Number(form.durationDays)); // numeric per model

    // Tags: split to array, join again as CSV string (depending on backend, but frontend stores as string, model array)
    const tagsArr = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (tagsArr.length) {
      data.append("tags", tagsArr.join(","));
    }
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to add or update a service.");
        setSubmitting(false);
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editId) {
        // UPDATE (model: allow updating any field, including image)
        const res = await axios.put(`${API_BASE}/${editId}`, data, config);
        const updated = res.data?.data;
        if (updated && updated._id) {
          setServices(prev =>
            prev.map(s => (s._id === editId ? updated : s))
          );
        } else {
          fetchServices();
        }
      } else {
        // CREATE (require all statically required fields)
        const res = await axios.post(API_BASE, data, config);
        const created = res.data?.data;
        if (created && created._id) {
          setServices(prev => [created, ...prev]);
        } else {
          fetchServices();
        }
      }

      // Reset form to blank
      setForm(blankForm);
      setImageFile(null);
      setPreviewImage("");
      setShowForm(false);
      setEditId(null);
    } catch (err) {
      console.error("Service submit error:", err?.response || err);
      const message =
        err.response?.data?.message ||
        (typeof err.response?.data === "string"
          ? err.response.data
          : "") ||
        err.message;
      if (err.response?.status === 401) {
        alert("Unauthorized: Please login to add or update a service.");
      } else {
        alert("Failed to submit service: " + message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete a service.");
        return;
      }
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      console.error("Delete service error:", err);
      const message = err.response?.data?.message || err.message;
      if (err.response?.status === 401) alert("Unauthorized: Please login.");
      else alert("Failed to delete service: " + message);
    }
  };

  const handleEdit = (service) => {
    setForm({
      title: service.title || "",
      shortDescription: service.shortDescription || "",
      longDescription: service.longDescription || "",
      price:
        service.price !== undefined && service.price !== null
          ? String(service.price)
          : "",
      durationDays:
        service.durationDays !== undefined && service.durationDays !== null
          ? String(service.durationDays)
          : "",
      tags: Array.isArray(service.tags) ? service.tags.join(", ") : "",
    });
    setPreviewImage(service.imageUrl || "");
    setImageFile(null);
    setEditId(service._id);
    setShowForm(true);
    setFormError("");
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm(blankForm);
    setImageFile(null);
    setPreviewImage("");
    setFormError("");
  };

  return (
    <div className="w-full min-h-screen bg-white px-0 py-0">
      <div className="w-full max-w-6xl mx-auto px-2 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Services</h2>
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-3 py-1.5 rounded shadow transition text-sm"
            onClick={() => {
              setShowForm(true);
              setEditId(null);
              setForm(blankForm);
              setImageFile(null);
              setPreviewImage("");
              setFormError("");
            }}
          >
            Add Service
          </button>
        </div>
        {/* Popup Modal for Service Form */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fade-in">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold h-8 w-8 flex items-center justify-center"
                onClick={handleCancel}
                aria-label="Close"
                type="button"
                style={{ lineHeight: 1 }}
              >
                &times;
              </button>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                {editId ? "Update Service" : "Add New Service"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="shortDescription"
                    placeholder="Short Description"
                    value={form.shortDescription}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <textarea
                    name="longDescription"
                    placeholder="Long Description"
                    value={form.longDescription}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={0}
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                  <input
                    type="number"
                    min={0}
                    name="durationDays"
                    placeholder="Duration (days)"
                    value={form.durationDays}
                    onChange={handleChange}
                    className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
                  />
                  {(previewImage || imageFile) && (
                    <div className="mt-2 flex items-center">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-24 rounded shadow border"
                        style={{ maxWidth: "150px", objectFit: "cover" }}
                      />
                    </div>
                  )}
                  {editId && !previewImage && (
                    <div className="text-gray-400 text-sm mt-2">No image available</div>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="tags"
                    placeholder="Tags (comma separated)"
                    value={form.tags}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                {formError && (
                  <div className="text-red-600 text-sm">{formError}</div>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-sm"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded bg-teal-600 text-white font-semibold hover:bg-teal-700 transition disabled:opacity-60 text-sm"
                    disabled={submitting}
                  >
                    {submitting
                      ? editId
                        ? "Updating..."
                        : "Adding..."
                      : editId
                      ? "Update Service"
                      : "Add Service"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <svg
              className="animate-spin h-6 w-6 text-teal-600 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            <span className="text-gray-600">Loading services...</span>
          </div>
        ) : (
          <div>
            {services.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No services found.
              </div>
            ) : (
              <div className="grid gap-6">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="relative border border-gray-200 bg-white rounded-lg transition p-6 flex flex-col md:flex-row gap-4 w-full"
                  >
                    <div className="flex w-full justify-end gap-2 mb-2 md:mb-0 md:absolute md:top-2 md:right-2 z-10">
                      <button
                        onClick={() => handleEdit(service)}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 shadow transition h-8 w-8 flex items-center justify-center"
                        title="Update"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow transition h-8 w-8 flex items-center justify-center"
                        title="Delete"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-col md:flex-row w-full gap-4">
                      {service.imageUrl && (
                        <div className="flex-shrink-0 w-full md:w-48 flex items-center justify-center">
                          <img
                            src={service.imageUrl}
                            alt={service.title}
                            className="rounded-md object-cover w-full h-auto"
                            style={{ maxHeight: "170px" }}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                          {service.title}
                        </h3>
                        {service.shortDescription && (
                          <p className="text-teal-600 font-medium mb-1">
                            {service.shortDescription}
                          </p>
                        )}
                        <p className="text-gray-600 mb-2">
                          {service.longDescription}
                        </p>
                        {(service.price !== undefined && service.price !== null && service.price !== "") ||
                        (service.durationDays !== undefined && service.durationDays !== null && service.durationDays !== "") ? (
                          <div className="flex gap-4 mb-2">
                            {service.price !== undefined && service.price !== null && service.price !== "" && (
                              <span className="inline-block text-sm text-teal-700 bg-teal-50 rounded px-2 py-0.5">
                                Price: ₹{service.price}
                              </span>
                            )}
                            {service.durationDays !== undefined && service.durationDays !== null && service.durationDays !== "" && (
                              <span className="inline-block text-sm text-pink-700 bg-pink-50 rounded px-2 py-0.5">
                                Duration: {service.durationDays} days
                              </span>
                            )}
                          </div>
                        ) : null}
                        {service.tags && service.tags.length > 0 && (
                          <div className="mb-2 flex flex-wrap gap-1">
                            {service.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="inline-block bg-gray-100 text-gray-600 rounded px-2 py-0.5 text-xs"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* Simple fade-in animation for modal */}
        <style>{`
          .animate-fade-in {
            animation: fadeIn 0.2s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98);}
            to { opacity: 1; transform: scale(1);}
          }
          @media (max-width: 767px) {
            .service-action-btns {
              position: static !important;
              margin-bottom: 0.5rem !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Service;
