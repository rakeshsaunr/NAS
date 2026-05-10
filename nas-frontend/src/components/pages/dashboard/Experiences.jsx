import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa"; // New edit icon
import { RiDeleteBin5Line } from "react-icons/ri"; // Delete icon

const API_BASE = "https://portfolio-backend-3nr9.onrender.com/api/v1/experience";

const NO_LOGO_DATAURI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'>
      <rect width='100%' height='100%' fill='#e5e7eb'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='14' fill='#6b7280' font-family='Arial, sans-serif'>No Logo</text>
    </svg>`
  );

function buildExperiencePayload({ form, logoFile }) {
  const payload = {};
  if (form.title) payload.title = form.title.trim();
  if (form.company) payload.company = form.company.trim();
  if (form.location) payload.location = form.location.trim();
  if (form.startDate) payload.startDate = form.startDate;
  if (form.endDate) payload.endDate = form.endDate;
  if (form.description) payload.description = form.description.trim();

  if (!logoFile && form.logo && form.logo.trim()) payload.logo = form.logo.trim();

  let certObj = {};
  if (form.certificateUrl && form.certificateUrl.trim()) certObj.url = form.certificateUrl.trim();
  if (form.certificateName && form.certificateName.trim()) certObj.name = form.certificateName.trim();
  if (Object.keys(certObj).length > 0) {
    payload.certificate = certObj;
  }

  return payload;
}

function buildExperienceFormData({ form, logoFile }) {
  const fd = new FormData();
  if (form.title) fd.append("title", form.title.trim());
  if (form.company) fd.append("company", form.company.trim());
  if (form.location) fd.append("location", form.location.trim());
  if (form.startDate) fd.append("startDate", form.startDate);
  if (form.endDate) fd.append("endDate", form.endDate);
  if (form.description) fd.append("description", form.description.trim());
  if (logoFile) {
    fd.append("logo", logoFile);
  } else if (form.logo && form.logo.trim()) {
    fd.append("logo", form.logo.trim());
  }
  let certObj = {};
  if (form.certificateUrl && form.certificateUrl.trim()) certObj.url = form.certificateUrl.trim();
  if (form.certificateName && form.certificateName.trim()) certObj.name = form.certificateName.trim();
  if (Object.keys(certObj).length > 0) {
    fd.append("certificate", JSON.stringify(certObj));
  }
  return fd;
}

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    logo: "",
    certificateUrl: "",
    certificateName: "",
  });
  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (showForm) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showForm]);

  const prevPreviewRef = useRef("");
  useEffect(() => {
    if (preview && prevPreviewRef.current && preview !== prevPreviewRef.current) {
      URL.revokeObjectURL(prevPreviewRef.current);
    }
    prevPreviewRef.current = preview;
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setExperiences(res.data?.data || []);
    } catch (err) {
      console.error("Fetch experiences error:", err);
      alert("Failed to fetch experiences — check console for details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0] || null;
    setLogoFile(file);
    setFormError("");
    if (preview) URL.revokeObjectURL(preview);
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setFormError("Title is required");
    if (!form.company.trim()) return setFormError("Company is required");
    if (!form.startDate.trim()) return setFormError("Start date is required");
    setFormError("");

    const isEdit = !!editId;
    const url = isEdit ? `${API_BASE}/${editId}` : API_BASE;

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to add or update an experience.");
        setSubmitting(false);
        return;
      }
      let res;
      if (logoFile) {
        res = await axios({
          method: isEdit ? "put" : "post",
          url,
          data: buildExperienceFormData({ form, logoFile }),
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      } else {
        res = await axios({
          method: isEdit ? "put" : "post",
          url,
          data: buildExperiencePayload({ form, logoFile }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        });
      }

      const saved = res.data?.data || null;
      if (saved) {
        setExperiences((prev) =>
          isEdit ? prev.map((exp) => (exp._id === editId ? saved : exp)) : [saved, ...prev]
        );
      } else {
        fetchExperiences();
      }

      setForm({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        logo: "",
        certificateUrl: "",
        certificateName: "",
      });
      setLogoFile(null);
      if (preview) URL.revokeObjectURL(preview);
      setPreview("");
      setShowForm(false);
      setEditId(null);
    } catch (err) {
      console.error("Experience submit error:", err);
      let serverMessage = "An unexpected error occurred.";
      if (err.response) {
        if (typeof err.response.data === "string") {
          serverMessage = err.response.data;
        } else if (err.response.data?.message) {
          serverMessage = err.response.data.message;
        } else if (err.response.data?.error) {
          serverMessage = err.response.data.error;
        } else if (err.response.status === 500) {
          serverMessage = "Internal Server Error (500). Please try again or check your input data.";
        } else {
          serverMessage = `Submit failed (status ${err.response.status})`;
        }
      } else if (err.message) {
        serverMessage = err.message;
      }
      if (err.response?.status === 401) {
        alert("Unauthorized: Please login to add or update an experience.");
      } else {
        alert("Failed to submit experience: " + serverMessage);
      }
      setFormError(serverMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete an experience.");
        return;
      }
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setExperiences((prev) => prev.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error("Delete experience error:", err);
      const serverMessage = err.response?.data?.message || err.message;
      if (err.response?.status === 401) alert("Unauthorized: Please login.");
      else alert("Failed to delete experience: " + serverMessage);
    }
  };

  const handleEdit = (exp) => {
    setForm({
      title: exp.title || "",
      company: exp.company || "",
      location: exp.location || "",
      startDate: exp.startDate ? exp.startDate.slice(0, 10) : "",
      endDate: exp.endDate ? exp.endDate.slice(0, 10) : "",
      description: exp.description || "",
      logo: exp.logo || "",
      certificateUrl: exp.certificate?.url || "",
      certificateName: exp.certificate?.name || "",
    });
    setLogoFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview("");
    setEditId(exp._id);
    setShowForm(true);
    setFormError("");
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      logo: "",
      certificateUrl: "",
      certificateName: "",
    });
    setLogoFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview("");
    setFormError("");
  };

  return (
    <div className="w-full bg-white px-0 py-8">
      {/* LinkedIn style header */}
      <div className="flex items-center justify-between mb-6 px-4 md:px-6">
        <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-1 py-1 rounded shadow transition text-base"
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setForm({
              title: "",
              company: "",
              location: "",
              startDate: "",
              endDate: "",
              description: "",
              logo: "",
              certificateUrl: "",
              certificateName: "",
            });
            setLogoFile(null);
            if (preview) URL.revokeObjectURL(preview);
            setPreview("");
            setFormError("");
          }}
        >
          + Add Experience
        </button>
      </div>

      {/* Responsive Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2 py-6 overflow-y-auto md:py-16">
          <div
            className="bg-white rounded-lg shadow-lg w-full mx-auto max-w-md md:max-w-xl
              p-4 md:p-8 relative animate-fade-in"
            style={{
              maxHeight: "90vh",
              overflowY: "auto"
            }}
          >
            <button
              className="absolute top-2 md:top-3 right-2 md:right-3 text-gray-400 hover:text-gray-700 text-xl font-extrabold"
              onClick={handleCancel}
              aria-label="Close"
              type="button"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-800 tracking-tight">
              {editId ? "Edit Experience" : "Add Experience"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Title<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Company<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
                  placeholder="E.g. India (Optional)"
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-800 mb-1">Start Date<span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-800 mb-1">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400 resize-y"
                  placeholder="Describe your role, responsibilities, or achievements"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Company Logo <span className="text-xs text-gray-400">(optional)</span></label>
                <div className="flex flex-col xs:flex-row gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    name="logo"
                    placeholder="Logo URL"
                    value={form.logo}
                    onChange={handleChange}
                    className="flex-1 border border-gray-200 rounded px-3 py-2"
                  />
                </div>
                {(preview || form.logo) && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-gray-500">Preview:</span>
                    <img
                      src={preview || form.logo}
                      alt="Logo preview"
                      className="inline w-14 h-14 object-cover rounded border border-gray-400"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = NO_LOGO_DATAURI;
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-800 mb-1">Certificate URL</label>
                  <input
                    type="text"
                    name="certificateUrl"
                    placeholder="Certificate URL"
                    value={form.certificateUrl}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-800 mb-1">Certificate Name</label>
                  <input
                    type="text"
                    name="certificateName"
                    placeholder="Certificate Name"
                    value={form.certificateName}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>
              </div>
              {formError && (
                <div className="text-red-600 text-sm" aria-live="polite">
                  {formError}
                </div>
              )}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-base"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-800 transition disabled:opacity-70 text-base"
                  disabled={submitting}
                >
                  {submitting ? (editId ? "Updating..." : "Adding...") : editId ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LinkedIn-style experience list */}
      <div className="rounded-lg border-gray-200 p-0 w-full bg-white">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="text-gray-600">Loading experiences...</span>
          </div>
        ) : (
          <div>
            {experiences.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No experiences found.</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {experiences.map((exp) => (
                  <li
                    key={exp._id}
                    className="flex flex-row px-4 md:px-6 py-6 group relative items-start w-full"
                  >
                    {/* Left: Logo */}
                    <div className="flex-shrink-0 flex items-start pt-1">
                      <div className="w-14 h-14 rounded overflow-hidden border border-gray-300 bg-white flex items-center justify-center">
                        <img
                          src={exp.logo || NO_LOGO_DATAURI}
                          alt={exp.company ? String(exp.company) : "Logo"}
                          className="w-full h-full object-contain"
                          onError={e => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = NO_LOGO_DATAURI;
                          }}
                        />
                      </div>
                    </div>

                    {/* Middle: Main Details */}
                    <div className="flex-1 ml-5 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                            <span className="text-base text-gray-700">{exp.company}</span>
                            {exp.location && (
                              <span className="text-base text-gray-500">{exp.location}</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 mt-0.5">
                            {exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ""}
                            {" - "}
                            {exp.endDate
                              ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                              : "Present"}
                          </div>
                        </div>
                        {/* Edit/Delete: always visible on mobile, visible on desktop hover */}
                        <div
                          className="flex gap-2 ml-3
                            opacity-100
                            md:opacity-0 md:group-hover:opacity-100
                            transition-opacity
                            md:flex
                            md:items-start
                            relative
                            z-10
                          "
                        >
                          <button
                            onClick={() => handleEdit(exp)}
                            title="Edit"
                            className="p-1 rounded hover:bg-gray-200 focus:bg-gray-200 transition"
                            style={{ minWidth: 0, minHeight: 0 }}
                          >
                            <FaRegEdit size={18} color="currentColor" />
                          </button>
                          <button
                            onClick={() => handleDelete(exp._id)}
                            title="Delete"
                            className="p-1 rounded hover:bg-red-100 focus:bg-red-200 transition"
                            style={{ minWidth: 0, minHeight: 0 }}
                          >
                            <RiDeleteBin5Line size={18} color="red" />
                          </button>
                        </div>
                      </div>
                      {exp.description && (
                        <div className="text-gray-700 mt-2 text-sm whitespace-pre-line break-words">{exp.description}</div>
                      )}
                      {exp.certificate?.url && (
                        <a
                          href={exp.certificate.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-blue-700 hover:underline text-sm font-medium"
                        >
                          {exp.certificate.name ? exp.certificate.name : "View Certificate"}
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.24s; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(.97);} to { opacity: 1; transform: scale(1);} }
        @media (max-width: 767px) {
          .group > div.md\\:opacity-0 {
            opacity: 1 !important;
          }
          .fixed > div.max-w-md {
            width: 99vw !important;
            min-width: unset !important;
            max-width: 99vw !important;
          }
        }
        /* Make background always white and full width for main container and list */
        body {
          background: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default Experience;
