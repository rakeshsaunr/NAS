import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa"; // Edit icon (from Experiences.jsx)
import { RiDeleteBin5Line } from "react-icons/ri"; // Delete icon (from Experiences.jsx)

const API_BASE = "https://portfolio-backend-3nr9.onrender.com/api/v1/project";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setProjects(res.data?.data || []);
    } catch (err) {
      console.error("Fetch projects error:", err);
      alert("Failed to fetch projects — check console for details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === "image" && type === "file") {
      setForm((prev) => ({ ...prev, image: files[0] || null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!form.title.trim()) return setFormError("Title is required");
    if (!form.description.trim()) return setFormError("Description is required");
    if (!form.link.trim()) return setFormError("Link is required");
    if (!editId && !form.image) return setFormError("Image is required");

    setFormError("");
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("link", form.link);
    if (form.image) formData.append("image", form.image);

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to add or update a project.");
        setSubmitting(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (editId) {
        // UPDATE case
        const res = await axios.put(`${API_BASE}/${editId}`, formData, config);

        const updatedProject = res.data?.data || null;
        if (updatedProject) {
          setProjects((prev) => prev.map((p) => (p._id === editId ? updatedProject : p)));
        } else {
          fetchProjects();
        }
      } else {
        // CREATE case
        const res = await axios.post(API_BASE, formData, config);
        const newProject = res.data?.data || null;
        if (newProject) {
          setProjects((prev) => [newProject, ...prev]);
        } else {
          fetchProjects();
        }
      }

      // reset form
      setForm({ title: "", description: "", link: "", image: null });
      if (fileInputRef.current) fileInputRef.current.value = "";
      setShowForm(false);
      setEditId(null);
    } catch (err) {
      console.error("Project submit error:", err?.response || err);
      const serverMessage =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : "") ||
        err.message;
      if (err.response?.status === 401) {
        alert("Unauthorized: Please login to add or update a project.");
      } else {
        alert("Failed to submit project: " + serverMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete a project.");
        return;
      }
      await axios.delete(`${API_BASE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete project error:", err);
      const serverMessage = err.response?.data?.message || err.message;
      if (err.response?.status === 401) alert("Unauthorized: Please login.");
      else alert("Failed to delete project: " + serverMessage);
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title || "",
      description: project.description || "",
      link: project.link || "",
      image: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
    setEditId(project._id);
    setShowForm(true);
    setFormError("");
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm({ title: "", description: "", link: "", image: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
    setFormError("");
  };

  return (
    <div className="w-full min-h-screen bg-white px-0 py-0">
      <div className="w-full max-w-6xl mx-auto px-2 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
          <button
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-3 py-1.5 rounded shadow transition text-sm"
            onClick={() => {
              setShowForm(true);
              setEditId(null);
              setForm({ title: "", description: "", link: "", image: null });
              if (fileInputRef.current) fileInputRef.current.value = "";
              setFormError("");
            }}
          >
            Add Project
          </button>
        </div>

        {/* Popup Modal for Project Form */}
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
                {editId ? "Update Project" : "Add New Project"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div>
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="link"
                    placeholder="Link"
                    value={form.link}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-pink-50 file:text-pink-700"
                  />
                  {editId && (
                    <div className="text-xs text-gray-500 mt-1">
                      {`Leave blank to keep existing image.`}
                    </div>
                  )}
                </div>
                {formError && <div className="text-red-600 text-sm">{formError}</div>}
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
                    className="px-3 py-1.5 rounded bg-pink-600 text-white font-semibold hover:bg-pink-700 transition disabled:opacity-60 text-sm"
                    disabled={submitting}
                  >
                    {submitting ? (editId ? "Updating..." : "Adding...") : editId ? "Update Project" : "Add Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <svg className="animate-spin h-6 w-6 text-pink-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="text-gray-600">Loading projects...</span>
          </div>
        ) : (
          <div>
            {projects.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No projects found.</div>
            ) : (
              <div className="grid gap-6">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="relative border border-gray-200 bg-white rounded-lg transition p-6 flex flex-col md:flex-row gap-4 w-full"
                  >
                    {/* Buttons top, away from image */}
                    <div className="flex w-full justify-end gap-2 mb-2 md:mb-0 md:absolute md:top-2 md:right-2 z-10">
                      <button
                        onClick={() => handleEdit(project)}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 shadow transition h-8 w-8 flex items-center justify-center"
                        title="Update"
                      >
                        <FaRegEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow transition h-8 w-8 flex items-center justify-center"
                        title="Delete"
                      >
                        <RiDeleteBin5Line className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-col md:flex-row w-full gap-4">
                      {project.image && (
                        <div className="flex-shrink-0 w-full md:w-48 flex items-center justify-center">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="rounded-md object-cover w-full h-auto"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">{project.title}</h3>
                        <p className="text-gray-600 mb-2">{project.description}</p>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-pink-600 hover:underline font-medium"
                        >
                          Visit
                        </a>
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

export default Project;
