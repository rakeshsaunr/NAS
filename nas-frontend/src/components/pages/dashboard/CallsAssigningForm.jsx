// =====================================
// src/components/pages/dashboard/CallEntryForm.jsx
// =====================================

import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FileText, X, Printer, Search, Download, RefreshCcw } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

// --- Utility function ---
function formatTime24to12(time24) {
  if (!time24) return "";
  const parts = time24.split(":");
  const hour = parts[0];
  const min = parts[1] ?? "00";
  let h = parseInt(hour, 10);
  const m = min;
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m.padStart(2, "0")} ${ampm}`;
}

// --- Helper: getStatusBadge ---
function getStatusBadge(status) {
  let color = "";
  switch (status) {
    case "Pending":
      color = "bg-yellow-100 text-yellow-800";
      break;
    case "Assigned":
      color = "bg-blue-100 text-blue-800";
      break;
    case "In Progress":
      color = "bg-purple-100 text-purple-800";
      break;
    case "Hold":
      color = "bg-orange-100 text-orange-800";
      break;
    case "Completed":
      color = "bg-green-100 text-green-800";
      break;
    case "Closed":
      color = "bg-gray-100 text-gray-800";
      break;
    default:
      color = "bg-gray-50 text-gray-400";
  }
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${color}`}
    >
      {status || "-"}
    </span>
  );
}

const API = "http://localhost:5000/api/v1/call-entry-form";
const EMPLOYEE_API = "http://localhost:5000/api/v1/employee-master";

const statusOptions = [
  { label: "Pending", value: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  { label: "Assigned", value: "Assigned", color: "bg-blue-100 text-blue-800 border-blue-300" },
  { label: "In Progress", value: "In Progress", color: "bg-purple-100 text-purple-800 border-purple-300" },
  { label: "Hold", value: "Hold", color: "bg-orange-100 text-orange-800 border-orange-300" },
  { label: "Completed", value: "Completed", color: "bg-green-100 text-green-800 border-green-300" },
  { label: "Closed", value: "Closed", color: "bg-gray-200 text-gray-800 border-gray-300" },
];

function StatusBadge({ status }) {
  return getStatusBadge(status);
}

const CallEntryForm = () => {
  // =====================================
  // STATES
  // =====================================

  const [form, setForm] = useState({
    callDate: new Date().toISOString().split("T")[0],
    callTime: "",
    customer: "",
    customerType: "",
    endUser: "",
    department: "",
    callLoggedBy: "",
    warrantyInformation: "",
    callType: "",
    chargeAmount: 0,
    natureOfCall: "",
    instrument: "",
    problemDetails: "",
    preferredDate: "",
    preferredTimings: "",
    callAttempt: 1,
    callUrgency: "",
    callNotedBy: "",
    // New field for attachment (file upload)
    attachment: null,
  });

  // File upload state (keep only the File object, not string data)
  const [attachment, setAttachment] = useState(null);

  // Advanced time picker fields state
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timingError, setTimingError] = useState(""); // For validation display

  // showForm replaces modal logic
  const [showForm, setShowForm] = useState(false);

  // CRUD States
  const [callEntries, setCallEntries] = useState([]);
  const [editId, setEditId] = useState(null);

  // Assignment Modal State
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignError, setAssignError] = useState("");
  const [assignSuccess, setAssignSuccess] = useState("");
  const [engineers, setEngineers] = useState([]);
  const [assignData, setAssignData] = useState({
    engineerAssigned: "",
    assignRemark: "",
    callStatus: "Assigned",
  });
  const [assignSelectedCall, setAssignSelectedCall] = useState(null);

  // ===========================
  // Daily Call Sheet Report MODAL STATE
  // ===========================
  const [showReportModal, setShowReportModal] = useState(false);

  // Filter/Report States
  const todayString = useMemo(
    () =>
      new Date().toLocaleDateString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    []
  );
  const [reportDate, setReportDate] = useState(todayString);
  const [reportStatus, setReportStatus] = useState("All");
  const [reportEngineer, setReportEngineer] = useState("All");
  const [searchText, setSearchText] = useState("");

  // Print Section Ref
  const printReportRef = useRef();

  // =====================================
  // DROPDOWN DATA
  // =====================================

  const [customers, setCustomers] = useState([]);
  const [customerTypes, setCustomerTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [callTypes, setCallTypes] = useState([]);
  const [urgencies, setUrgencies] = useState([]);
  const [problems, setProblems] = useState([]);

  const navigate = useNavigate();

  // =====================================
  // FETCH DATA ON MOUNT USING useEffect
  // =====================================

  const fetchMasters = async () => {
    try {
      const [
        customerRes,
        customerTypeRes,
        departmentRes,
        callTypeRes,
        urgencyRes,
        problemRes,
      ] = await Promise.all([
        axios.get("http://localhost:5000/api/v1/customer-master"),
        axios.get("http://localhost:5000/api/v1/customer-type-master"),
        axios.get("http://localhost:5000/api/v1/department"),
        axios.get("http://localhost:5000/api/v1/call-master"),
        axios.get("http://localhost:5000/api/v1/call-urgency"),
        axios.get("http://localhost:5000/api/v1/problem"),
      ]);

      setCustomers(
        Array.isArray(customerRes.data)
          ? customerRes.data
          : customerRes.data.data || []
      );

      setCustomerTypes(
        Array.isArray(customerTypeRes.data)
          ? customerTypeRes.data
          : customerTypeRes.data.data || []
      );

      setDepartments(
        Array.isArray(departmentRes.data)
          ? departmentRes.data
          : departmentRes.data.data || []
      );

      setCallTypes(
        Array.isArray(callTypeRes.data)
          ? callTypeRes.data
          : callTypeRes.data.data || []
      );

      setUrgencies(
        Array.isArray(urgencyRes.data)
          ? urgencyRes.data
          : urgencyRes.data.data || []
      );

      setProblems(
        Array.isArray(problemRes.data)
          ? problemRes.data
          : problemRes.data.data || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch engineers for assignment
  const fetchEngineers = async () => {
    try {
      const res = await axios.get(EMPLOYEE_API);
      setEngineers(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (error) {
      setEngineers([]);
    }
  };

  // CRUD Fetch all call entries
  const fetchCallEntries = async () => {
    try {
      const res = await axios.get(API);
      setCallEntries(
        Array.isArray(res.data)
          ? res.data
          : res.data.data || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMasters();
    fetchCallEntries();
    fetchEngineers();
  }, []);

  // =====================================
  // ADVANCED PREFERRED TIMINGS HANDLING
  // =====================================

  useEffect(() => {
    if (form.preferredTimings && form.preferredTimings.includes("-")) {
      // placeholder/reserved for possible sync logic
    }
    // eslint-disable-next-line
  }, [form.preferredTimings]);

  function handleTimingsChange(type, value) {
    setTimingError("");
    let newStart = type === "start" ? value : startTime;
    let newEnd = type === "end" ? value : endTime;
    setStartTime(newStart);
    setEndTime(newEnd);

    if (newStart && newEnd) {
      if (newEnd <= newStart) {
        setTimingError("End Time must be after Start Time");
        setForm((f) => ({ ...f, preferredTimings: "" }));
        return;
      }
      const pretty = `${formatTime24to12(newStart)} - ${formatTime24to12(
        newEnd
      )}`;
      setForm((f) => ({ ...f, preferredTimings: pretty }));
    } else {
      setForm((f) => ({ ...f, preferredTimings: "" }));
    }
  }

  // Reset form when showForm becomes false (form is closed)
  useEffect(() => {
    if (!showForm) {
      setStartTime("");
      setEndTime("");
      setTimingError("");
      setAttachment(null);
      setForm((form) => ({ ...form, preferredTimings: "" }));
      setEditId(null);
    }
  }, [showForm]);

  // =====================================
  // HANDLE CHANGE for form AND file attachment
  // =====================================

  const handleChange = (e) => {
    if (e.target.type === "file" && e.target.name === "attachment") {
      // File change
      setAttachment(e.target.files[0]);
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  // =====================================
  // SUBMIT (CREATE / UPDATE) -- with attachment support (FormData)
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startTime || !endTime) {
      setTimingError("Please select valid start and end time.");
      return;
    }

    try {
      const cleanedData = {
        ...form,
        endUser: form.endUser || null,
        department: form.department || null,
        natureOfCall: form.natureOfCall || null,
        instrument: form.instrument || null,
        problemDetails: form.problemDetails || null,
        callUrgency: form.callUrgency || null,
      };

      // Attachment handling: build FormData if file present
      if (attachment) {
        const submitData = new FormData();
        Object.keys(cleanedData).forEach((key) => {
          if (
            cleanedData[key] !== "" &&
            cleanedData[key] !== null &&
            cleanedData[key] !== undefined
          ) {
            submitData.append(key, cleanedData[key]);
          }
        });
        submitData.append("attachment", attachment);

        if (editId) {
          await axios.put(`${API}/${editId}`, submitData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          alert("Call Entry Updated Successfully");
        } else {
          await axios.post(API, submitData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          alert("Call Entry Created Successfully");
        }
      } else {
        // No file, send as JSON
        if (editId) {
          await axios.put(`${API}/${editId}`, cleanedData);
          alert("Call Entry Updated Successfully");
        } else {
          await axios.post(API, cleanedData);
          alert("Call Entry Created Successfully");
        }
      }

      fetchCallEntries();

      setEditId(null);
      setStartTime("");
      setEndTime("");
      setTimingError("");
      setAttachment(null);

      setForm({
        callDate: new Date().toISOString().split("T")[0],
        callTime: "",
        customer: "",
        customerType: "",
        endUser: "",
        department: "",
        callLoggedBy: "",
        warrantyInformation: "",
        callType: "",
        chargeAmount: 0,
        natureOfCall: "",
        instrument: "",
        problemDetails: "",
        preferredDate: "",
        preferredTimings: "",
        callAttempt: 1,
        callUrgency: "",
        callNotedBy: "",
        attachment: null,
      });

      setShowForm(false);
    } catch (error) {
      console.log(error.response?.data || error);
      alert("Failed to save call entry");
    }
  };

  // =====================================
  // EDIT HANDLER with attachment
  // =====================================
  const handleEdit = (item) => {
    setEditId(item._id);

    setForm({
      callDate: item.callDate?.split("T")[0] || "",
      callTime: item.callTime || "",
      customer: item.customer?._id || "",
      customerType: item.customerType?._id || "",
      endUser: item.endUser?._id || "",
      department: item.department?._id || "",
      callLoggedBy: item.callLoggedBy || "",
      warrantyInformation: item.warrantyInformation || "",
      callType: item.callType?._id || "",
      chargeAmount: item.chargeAmount || 0,
      natureOfCall: item.natureOfCall?._id || "",
      instrument: item.instrument?._id || "",
      problemDetails: item.problemDetails?._id || "",
      preferredDate: item.preferredDate?.split("T")[0] || "",
      preferredTimings: item.preferredTimings || "",
      callAttempt: item.callAttempt || 1,
      callUrgency: item.callUrgency?._id || "",
      callNotedBy: item.callNotedBy || "",
      // attachment: null (do not populate; only used for upload)
    });

    setAttachment(null);

    // Preferred timings edit support: parse formatted string
    if (item.preferredTimings && item.preferredTimings.includes("-")) {
      const [from, to] = item.preferredTimings.split("-").map((s) => s.trim());
      const parseTo24 = (str) => {
        if (!str) return "";
        const [hm, ampm] = str.split(" ");
        if (!hm || !ampm) return "";
        let [h, m] = hm.split(":");
        h = parseInt(h, 10);
        if (ampm.toLowerCase() === "pm" && h !== 12) h += 12;
        if (ampm.toLowerCase() === "am" && h === 12) h = 0;
        return `${String(h).padStart(2, "0")}:${m.padStart(2, "0")}`;
      };
      setStartTime(parseTo24(from));
      setEndTime(parseTo24(to));
    } else {
      setStartTime("");
      setEndTime("");
    }

    setShowForm(true);
  };

  // =====================================
  // ASSIGNMENT HANDLING
  // =====================================
  const handleOpenAssign = (call) => {
    setAssignSelectedCall(call);
    setAssignData({
      engineerAssigned: call.engineerAssigned?._id || "",
      assignRemark: call.assignRemark || "",
      callStatus: call.callStatus || "Assigned",
    });
    setAssignError("");
    setAssignSuccess("");
    setShowAssignModal(true);
    // Engineers are already loaded in useEffect
  };

  const handleCloseAssign = () => {
    setShowAssignModal(false);
    setAssignSelectedCall(null);
    setAssignData({
      engineerAssigned: "",
      assignRemark: "",
      callStatus: "Assigned",
    });
    setAssignLoading(false);
    setAssignError("");
    setAssignSuccess("");
  };

  const handleAssignChange = (e) => {
    setAssignData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
    setAssignError("");
  };

  const handleSaveAssign = async (e) => {
    e.preventDefault();
    if (!assignData.engineerAssigned || !assignData.callStatus) {
      setAssignError("Engineer and Status are required!");
      return;
    }
    setAssignLoading(true);
    setAssignError("");
    try {
      await axios.put(
        `${API}/${assignSelectedCall._id}`,
        {
          engineerAssigned: assignData.engineerAssigned,
          assignedDate: new Date().toISOString(),
          assignRemark: assignData.assignRemark,
          callStatus: assignData.callStatus,
        }
      );
      setAssignSuccess("Call successfully assigned.");
      await fetchCallEntries();
      setTimeout(() => {
        setAssignLoading(false);
        setShowAssignModal(false);
      }, 600);
    } catch (err) {
      setAssignError(
        err.response?.data?.message || "Assignment failed. Try again."
      );
      setAssignLoading(false);
    }
  };

  // =====================================
  // DELETE HANDLER
  // =====================================

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this call entry?"
      )
    ) {
      return;
    }

    try {
      await axios.delete(`${API}/${id}`);
      fetchCallEntries();
      alert("Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  // =====================================
  // --- Daily Call Sheet Report LOGIC ---
  // =====================================

  // Engineer filter options for report, derived from filtered calls
  const engineerOptions = useMemo(() => {
    const allEngineers = [];
    callEntries.forEach((call) => {
      if (call.engineerAssigned && call.engineerAssigned._id) {
        if (
          !allEngineers.some(
            (eng) => eng._id === call.engineerAssigned._id
          )
        ) {
          allEngineers.push(call.engineerAssigned);
        }
      }
    });
    // Sort by employeeName
    return allEngineers.sort((a, b) =>
      (a.employeeName || "").localeCompare(b.employeeName || "")
    );
  }, [callEntries]);

  // --- Filter, Search and Sort logic for report
  const filteredReportCalls = useMemo(() => {
    // 1. Filter: by Date
    let result = callEntries.filter((call) => {
      let dateMatched = true;
      if (reportDate) {
        if (!call.callDate) return false;
        // compare yyyy-mm-dd
        const callD = call.callDate.split("T")[0];
        dateMatched = callD === reportDate;
      }

      // 2. Status
      let statusMatched =
        reportStatus === "All" ||
        (call.callStatus || call.status) === reportStatus;

      // 3. Engineer
      let engineerMatched =
        reportEngineer === "All" ||
        (call.engineerAssigned?._id || "") === reportEngineer;

      return dateMatched && statusMatched && engineerMatched;
    });

    // 4. Search
    if (searchText?.trim()) {
      const searchLC = searchText.toLowerCase();
      result = result.filter((call) => {
        return (
          (call.callNo || "")
            .toString()
            .toLowerCase()
            .includes(searchLC) ||
          (call.customer?.customerName ||
            call.customer?.name ||
            call.customer?.customer ||
            call.customer?.title ||
            ""
          )
            .toString()
            .toLowerCase()
            .includes(searchLC) ||
          (call.engineerAssigned?.employeeName || "")
            .toString()
            .toLowerCase()
            .includes(searchLC) ||
          (call.department?.departmentName ||
            call.department?.name ||
            call.department?.title ||
            ""
          )
            .toString()
            .toLowerCase()
            .includes(searchLC) ||
          (call.problemDetails?.problemName ||
            call.problemDetails?.title ||
            ""
          )
            .toString()
            .toLowerCase()
            .includes(searchLC)
        );
      });
    }

    // 5. Default sorting: callNo desc (latest on top)
    result.sort((a, b) => {
      // If callNo is string/number, sort by it
      return (b.callNo?.toString() || "").localeCompare(
        a.callNo?.toString() || ""
      );
    });

    return result;
  }, [callEntries, reportDate, reportStatus, reportEngineer, searchText]);

  // -------------------------------------
  // Summary/report calculations
  // -------------------------------------
  const totalCalls = filteredReportCalls.length;
  const pendingCalls = filteredReportCalls.filter(
    (call) => (call.callStatus || call.status) === "Pending"
  ).length;
  const assignedCalls = filteredReportCalls.filter(
    (call) => (call.callStatus || call.status) === "Assigned"
  ).length;
  const inProgressCalls = filteredReportCalls.filter(
    (call) => (call.callStatus || call.status) === "In Progress"
  ).length;
  const completedCalls = filteredReportCalls.filter(
    (call) => (call.callStatus || call.status) === "Completed"
  ).length;
  const closedCalls = filteredReportCalls.filter(
    (call) => (call.callStatus || call.status) === "Closed"
  ).length;

  // --- Export: Excel ---
  const handleExportExcel = () => {
    let wb = XLSX.utils.book_new();

    // Sheet title
    let wsRows = [
      [`Daily Call Sheet Report`],
      [`Date: ${formatReportDate(reportDate)}`],
      [],
      [
        "Summary",
        `Total: ${totalCalls}`,
        `Pending: ${pendingCalls}`,
        `Assigned: ${assignedCalls}`,
        `In Progress: ${inProgressCalls}`,
        `Completed: ${completedCalls}`,
        `Closed: ${closedCalls}`,
      ],
      [],
    ];

    // Table header
    wsRows.push([
      "Sr No",
      "Call No",
      "Call Date",
      "Call Time",
      "Customer Name",
      "Department",
      "Call Type",
      "Problem Details",
      "Engineer Assigned",
      "Call Status",
      "Call Urgency",
      "Preferred Date",
      "Preferred Timings",
      "Assign Remark",
    ]);

    filteredReportCalls.forEach((item, idx) => {
      wsRows.push([
        idx + 1,
        item.callNo || "",
        item.callDate ? formatDisplayDate(item.callDate) : "",
        item.callTime ? formatTime24to12(item.callTime) : "",
        item.customer?.customerName ||
          item.customer?.name ||
          item.customer?.customer ||
          item.customer?.title ||
          "",
        item.department?.departmentName || "",
        item.callType?.callType || "",
        item.problemDetails?.problemName || "",
        item.engineerAssigned?.employeeName || "",
        item.callStatus || item.status || "",
        item.callUrgency?.urgencyType ||
          item.callUrgency?.urgencyLevel ||
          item.callUrgency?.name ||
          item.callUrgency?.title ||
          "",
        item.preferredDate ? formatDisplayDate(item.preferredDate) : "",
        item.preferredTimings || "",
        item.assignRemark || "",
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsRows);

    XLSX.utils.book_append_sheet(wb, ws, "Daily_Call_Sheet");

    const fileName = `Daily_Call_Sheet_${reportDate}.xlsx`;

    const wbout = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), fileName);
  };

  // --- Export: PDF ---
  const handleExportPdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "A4",
    });

    const margin = 36;
    let line = margin;
    doc.setFontSize(22);
    doc.text("Daily Call Sheet Report", margin, line);
    line += 22;

    doc.setFontSize(14);
    doc.text(`Date: ${formatReportDate(reportDate)}`, margin, line);
    line += 20;

    // Summary
    doc.setFontSize(12);
    doc.text(
      `Summary: Total: ${totalCalls}, Pending: ${pendingCalls}, Assigned: ${assignedCalls}, In Progress: ${inProgressCalls}, Completed: ${completedCalls}, Closed: ${closedCalls}`,
      margin,
      line
    );
    line += 24;

    // Table data
    const tableData = filteredReportCalls.map((item, idx) => [
      idx + 1,
      item.callNo || "",
      item.callDate ? formatDisplayDate(item.callDate) : "",
      item.callTime ? formatTime24to12(item.callTime) : "",
      item.customer?.customerName ||
        item.customer?.name ||
        item.customer?.customer ||
        item.customer?.title ||
        "",
      item.department?.departmentName || "",
      item.callType?.callType || "",
      item.problemDetails?.problemName || "",
      item.engineerAssigned?.employeeName || "",
      item.callStatus || item.status || "",
      item.callUrgency?.urgencyType ||
        item.callUrgency?.urgencyLevel ||
        item.callUrgency?.name ||
        item.callUrgency?.title ||
        "",
      item.preferredDate ? formatDisplayDate(item.preferredDate) : "",
      item.preferredTimings || "",
      item.assignRemark || "",
    ]);

    doc.autoTable({
      startY: line,
      styles: { fontSize: 9 },
      head: [
        [
          "Sr No",
          "Call No",
          "Call Date",
          "Call Time",
          "Customer Name",
          "Department",
          "Call Type",
          "Problem Details",
          "Engineer Assigned",
          "Call Status",
          "Call Urgency",
          "Preferred Date",
          "Preferred Timings",
          "Assign Remark",
        ],
      ],
      body: tableData,
      theme: "grid",
      tableWidth: "auto",
      headStyles: { fillColor: [22, 73, 164] },
      margin: { left: margin, right: margin },
    });

    const fileName = `Daily_Call_Sheet_${reportDate}.pdf`;
    doc.save(fileName);
  };

  // --- Export: Print ---
  const handlePrint = () => {
    // Hide unprintable elements via 'print-visible' class used in CSS
    window.print();
  };

  function formatDisplayDate(dateStr) {
    if (!dateStr) return "-";
    // dateStr: yyyy-mm-dd or ISO
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  function formatReportDate(reportDate_) {
    // reportDate: yyyy-mm-dd
    if (!reportDate_) return "-";
    const d = new Date(reportDate_);
    if (isNaN(d.getTime())) return reportDate_;
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  // --- Sorting Support (Table: click header) ---
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "desc" });
  const sortedReportCalls = useMemo(() => {
    let items = [...filteredReportCalls];
    if (sortConfig.key) {
      items.sort((a, b) => {
        let valA = "";
        let valB = "";
        switch (sortConfig.key) {
          case "callNo":
            valA = a.callNo || "";
            valB = b.callNo || "";
            break;
          case "callDate":
            valA = a.callDate || "";
            valB = b.callDate || "";
            break;
          case "customer":
            valA =
              a.customer?.customerName ||
              a.customer?.name ||
              a.customer?.customer ||
              a.customer?.title ||
              "";
            valB =
              b.customer?.customerName ||
              b.customer?.name ||
              b.customer?.customer ||
              b.customer?.title ||
              "";
            break;
          case "department":
            valA = a.department?.departmentName || "";
            valB = b.department?.departmentName || "";
            break;
          case "engineerAssigned":
            valA = a.engineerAssigned?.employeeName || "";
            valB = b.engineerAssigned?.employeeName || "";
            break;
          case "callStatus":
            valA = a.callStatus || a.status || "";
            valB = b.callStatus || b.status || "";
            break;
          case "problemDetails":
            valA = a.problemDetails?.problemName || "";
            valB = b.problemDetails?.problemName || "";
            break;
          default:
            valA = (a[sortConfig.key] || "").toString();
            valB = (b[sortConfig.key] || "").toString();
        }
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [filteredReportCalls, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // toggle direction
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  // --- Reset
  const handleResetReportFilters = () => {
    setReportDate(todayString);
    setReportStatus("All");
    setReportEngineer("All");
    setSearchText("");
    setSortConfig({ key: null, direction: "desc" });
  };

  // =====================================
  // RENDER ASSIGN MODAL
  // =====================================
  const renderAssignModal = () => {
    if (!showAssignModal || !assignSelectedCall) return null;
    const { callNo, customer, department } = assignSelectedCall;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 print:hidden">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative border border-gray-200 transition-all">
          {/* Close button */}
          <button
            className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl"
            onClick={handleCloseAssign}
            type="button"
            aria-label="Close"
          >
            ×
          </button>
          {/* Header */}
          <div className="mb-4 border-b pb-2">
            <h2 className="text-xl font-bold text-gray-900 flex gap-2 items-center">
              <span className="text-green-700">Assign Call</span>
              <span className="text-gray-500 font-semibold"> {callNo}</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Assign engineer and set status for this call.
            </p>
          </div>
          <form onSubmit={handleSaveAssign} className="space-y-4">
            {/* Call No (readonly) */}
            <div>
              <label className="block text-sm mb-1 font-medium text-gray-700">Call No</label>
              <input
                type="text"
                value={callNo || ""}
                disabled
                className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2 font-semibold"
                readOnly
              />
            </div>
            {/* Customer (readonly) */}
            <div>
              <label className="block text-sm mb-1 font-medium text-gray-700">Customer</label>
              <input
                type="text"
                value={
                  customer?.customerName ||
                  customer?.name ||
                  customer?.customer ||
                  customer?.title ||
                  "-"
                }
                disabled
                className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2"
                readOnly
              />
            </div>
            {/* Department (readonly) */}
            <div>
              <label className="block text-sm mb-1 font-medium text-gray-700">Department</label>
              <input
                type="text"
                value={
                  department?.departmentName ||
                  department?.name ||
                  department?.title ||
                  "-"
                }
                disabled
                className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2"
                readOnly
              />
            </div>
            {/* Engineer Dropdown */}
            <div>
              <label className="block text-sm mb-1 font-medium text-gray-700">
                Engineer <span className="text-red-600">*</span>
              </label>
              <select
                name="engineerAssigned"
                value={assignData.engineerAssigned}
                onChange={handleAssignChange}
                className="w-full border p-2 rounded-lg"
                required
              >
                <option value="">Select Engineer</option>
                {engineers.map((eng) => (
                  <option key={eng._id} value={eng._id}>
                    {eng.employeeName || eng.name || eng.username}
                  </option>
                ))}
              </select>
            </div>
            {/* Assign Remark */}
            <div>
              <label className="block text-sm mb-1 font-medium text-gray-700">Assign Remark</label>
              <textarea
                name="assignRemark"
                value={assignData.assignRemark}
                onChange={handleAssignChange}
                className="w-full border p-2 rounded-lg"
                rows={2}
              />
            </div>
            {/* Status Dropdown */}
            <div>
              <label className="block text-sm mb-1 font-medium text-gray-700">
                Status <span className="text-red-600">*</span>
              </label>
              <select
                name="callStatus"
                value={assignData.callStatus}
                onChange={handleAssignChange}
                className="w-full border p-2 rounded-lg"
                required
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {assignError && (
              <div className="text-red-600 text-sm mb-1">{assignError}</div>
            )}
            {assignSuccess && (
              <div className="text-green-600 text-sm mb-1">{assignSuccess}</div>
            )}

            {/* Save & Cancel Buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleCloseAssign}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
                disabled={assignLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow disabled:opacity-50"
                disabled={assignLoading}
              >
                {assignLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // =====================================
  // RENDER: Daily Call Sheet Modal
  // =====================================
  const renderDailyCallSheetModal = () => {
    if (!showReportModal) return null;

    // Print styling: ensure no scrollbars on print, hide buttons
    // See print styling below the component

    // Modal scrollable, large size
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-30 transition-all print:static print:bg-white"
        style={{ zIndex: 3000 }}
      >
        {/* Outer Modal - Scroll and Center; handle print mode */}
        <div
          className={`bg-white max-w-[95vw] max-h-[95vh] w-full rounded-2xl shadow-2xl border border-gray-200 flex flex-col relative overflow-y-auto p-0 transition-all ring-1 ring-black/10 print:rounded-none print:shadow-none print:max-w-full print:max-h-full`}
          ref={printReportRef}
          id="print-daily-call-sheet"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setShowReportModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 z-10 text-2xl transition print:hidden"
            aria-label="Close"
          >
            <X />
          </button>
          {/* Header */}
          <div className="px-8 pt-8 pb-0 border-b border-gray-100 flex flex-col gap-1 bg-white sticky top-0 z-10 print:static print:p-4 print:border-0">
            <h2 className="text-3xl font-bold">Daily Call Sheet Report</h2>
            <div className="text-gray-600 text-lg font-medium">
              Date: {formatReportDate(reportDate)}
            </div>
          </div>
          {/* Summary Chips */}
          <div className="px-8 py-4 border-b border-gray-100 bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sticky top-[75px] z-9 print:bg-white print:border-0 print:static">
            <SummaryCard title="Total Calls" value={totalCalls} />
            <SummaryCard title="Pending" value={pendingCalls} color="yellow" />
            <SummaryCard title="Assigned" value={assignedCalls} color="blue" />
            <SummaryCard title="In Progress" value={inProgressCalls} color="purple" />
            <SummaryCard title="Completed" value={completedCalls} color="green" />
            <SummaryCard title="Closed" value={closedCalls} color="gray" />
          </div>
          {/* Filter Bar & Actions */}
          <div className="px-8 py-3 border-b bg-gray-50 flex flex-wrap items-center gap-4 sticky top-[149px] z-8 print:hidden">
            {/* Date Filter */}
            <div className="flex flex-col min-w-[130px]">
              <label className="text-xs text-gray-600 font-medium mb-1">Date</label>
              <input
                type="date"
                className="rounded-md border-gray-300 px-2 py-1 text-sm"
                value={reportDate}
                onChange={e => setReportDate(e.target.value)}
                max={todayString}
                style={{ minWidth: 125 }}
              />
            </div>
            {/* Status Filter */}
            <div className="flex flex-col min-w-[140px]">
              <label className="text-xs text-gray-600 font-medium mb-1">Status</label>
              <select
                className="rounded-md border-gray-300 px-2 py-1 text-sm"
                value={reportStatus}
                onChange={e => setReportStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Assigned">Assigned</option>
                <option value="In Progress">In Progress</option>
                <option value="Hold">Hold</option>
                <option value="Completed">Completed</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            {/* Engineer Filter */}
            <div className="flex flex-col min-w-[130px]">
              <label className="text-xs text-gray-600 font-medium mb-1">Engineer</label>
              <select
                className="rounded-md border-gray-300 px-2 py-1 text-sm"
                value={reportEngineer}
                onChange={e => setReportEngineer(e.target.value)}
              >
                <option value="All">All</option>
                {engineerOptions.map((eng) => (
                  <option key={eng._id} value={eng._id}>
                    {eng.employeeName || eng.name || eng.username}
                  </option>
                ))}
              </select>
            </div>
            {/* Search */}
            <div className="flex flex-col grow min-w-[180px]">
              <label className="text-xs text-gray-600 font-medium mb-1">Search</label>
              <div className="relative">
                <input
                  type="text"
                  className="rounded-md border-gray-300 pl-8 pr-2 py-1 text-sm w-full"
                  placeholder="Search Call No, Customer, Engineer, Problem..."
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                />
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            {/* Reset */}
            <div className="flex flex-col min-w-[90px] justify-end pt-5">
              <button
                type="button"
                onClick={handleResetReportFilters}
                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg flex items-center gap-2 text-sm text-gray-700"
              >
                <RefreshCcw className="w-4 h-4" /> Reset
              </button>
            </div>
            {/* Actions */}
            <div className="flex flex-col min-w-[220px] gap-1 items-end justify-end shrink-0 ml-auto">
              <div className="flex gap-2">
                <button
                  onClick={handleExportExcel}
                  type="button"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg font-semibold flex items-center gap-2 transition"
                  title="Export Excel"
                  tabIndex={-1}
                >
                  <Download className="w-4 h-4" /> Export Excel
                </button>
                <button
                  onClick={handleExportPdf}
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg font-semibold flex items-center gap-2 transition"
                  title="Download PDF"
                  tabIndex={-1}
                >
                  <FileText className="w-4 h-4" /> Download PDF
                </button>
                <button
                  onClick={handlePrint}
                  type="button"
                  className="bg-gray-700 hover:bg-gray-900 text-white px-4 py-1.5 rounded-lg font-semibold flex items-center gap-2 transition"
                  title="Print"
                  tabIndex={-1}
                >
                  <Printer className="w-4 h-4" /> Print
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1 bg-white print:overflow-visible">
            <table className="min-w-max w-full border-collapse text-[15px]">
              <thead className="bg-gray-100 sticky top-[210px] z-10 print:static print:bg-gray-100">
                <tr>
                  <th className="p-2 text-left border-b font-semibold sticky left-0 bg-gray-100 z-10 min-w-[42px]">Sr No</th>
                  <ReportTh
                    label="Call No"
                    sortKey="callNo"
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                  />
                  <ReportTh
                    label="Call Date"
                    sortKey="callDate"
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                  />
                  <th className="p-2 text-left border-b min-w-[105px]">Call Time</th>
                  <ReportTh
                    label="Customer Name"
                    sortKey="customer"
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                  />
                  <ReportTh
                    label="Department"
                    sortKey="department"
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                  />
                  <th className="p-2 text-left border-b min-w-[90px]">Call Type</th>
                  <ReportTh
                    label="Problem Details"
                    sortKey="problemDetails"
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                  />
                  <ReportTh
                    label="Engineer Assigned"
                    sortKey="engineerAssigned"
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                  />
                  <ReportTh
                    label="Call Status"
                    sortKey="callStatus"
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                  />
                  <th className="p-2 text-left border-b min-w-[96px]">Call Urgency</th>
                  <th className="p-2 text-left border-b min-w-[108px]">Preferred Date</th>
                  <th className="p-2 text-left border-b min-w-[112px]">Preferred Timings</th>
                  <th className="p-2 text-left border-b min-w-[122px]">Assign Remark</th>
                </tr>
              </thead>
              <tbody>
                {sortedReportCalls.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="py-7 text-gray-500 text-lg text-center font-semibold">
                      No call entries found for this criteria
                    </td>
                  </tr>
                ) : (
                  sortedReportCalls.map((item, idx) => (
                    <tr
                      key={item._id || idx}
                      className="border-b last:border-0 hover:bg-gray-50 transition"
                    >
                      <td className="p-2 font-semibold sticky left-0 bg-white z-10">{idx + 1}</td>
                      <td className="p-2">{item.callNo || "-"}</td>
                      <td className="p-2">{item.callDate ? formatDisplayDate(item.callDate) : "-"}</td>
                      <td className="p-2">{item.callTime ? formatTime24to12(item.callTime) : "-"}</td>
                      <td className="p-2">
                        {item.customer?.customerName ||
                          item.customer?.name ||
                          item.customer?.customer ||
                          item.customer?.title ||
                          "-"}
                      </td>
                      <td className="p-2">{item.department?.departmentName || "-"}</td>
                      <td className="p-2">{item.callType?.callType || "-"}</td>
                      <td className="p-2">{item.problemDetails?.problemName || "-"}</td>
                      <td className="p-2">{item.engineerAssigned?.employeeName || "-"}</td>
                      <td className="p-2">
                        {getStatusBadge(item.callStatus || item.status)}
                      </td>
                      <td className="p-2">
                        {item.callUrgency?.urgencyType ||
                          item.callUrgency?.urgencyLevel ||
                          item.callUrgency?.name ||
                          item.callUrgency?.title ||
                          "-"}
                      </td>
                      <td className="p-2">
                        {item.preferredDate ? formatDisplayDate(item.preferredDate) : "-"}
                      </td>
                      <td className="p-2">{item.preferredTimings || "-"}</td>
                      <td className="p-2">{item.assignRemark || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* Mobile/cards? Simple: fallback below */}
            {sortedReportCalls.length === 0 && (
              <div className="sm:hidden p-6 text-gray-600">
                <div>No results found.</div>
              </div>
            )}
          </div>
        </div>
        {/* Print styles inside component */}
        <style>{`
          @media print {
            body * {
              box-shadow: none !important;
            }
            #print-daily-call-sheet {
              box-shadow: none !important;
              border: none !important;
              max-width: 100vw !important;
              max-height: 100vh !important;
              position: static !important;
            }
            #print-daily-call-sheet button, 
            #print-daily-call-sheet .print\\:hidden, 
            .print\\:hidden, 
            .lucide {
              display: none !important;
            }
            #print-daily-call-sheet {
              background: white !important;
            }
            #print-daily-call-sheet th,
            #print-daily-call-sheet td {
              background-color: white !important;
              color: #222 !important;
              font-size: 13px !important;
              border-color: #aaa !important;
            }
          }
        `}</style>
      </div>
    );
  };

  // -------------------------------
  // Simple summary card component
  // -------------------------------
  function SummaryCard({ title, value, color }) {
    let cardColor = "bg-gray-50 text-gray-700";
    if (color === "yellow") cardColor = "bg-yellow-100 text-yellow-800";
    if (color === "blue") cardColor = "bg-blue-100 text-blue-800";
    if (color === "green") cardColor = "bg-green-100 text-green-800";
    if (color === "purple") cardColor = "bg-purple-100 text-purple-800";
    if (color === "gray") cardColor = "bg-gray-100 text-gray-800";
    return (
      <div className={`rounded-lg p-4 flex flex-col items-center shadow-sm border ${cardColor}`}>
        <div className="text-xl font-extrabold">{value}</div>
        <div className="text-xs font-semibold mt-0.5 uppercase tracking-wide">{title}</div>
      </div>
    );
  }
  // Table Header with sorting
  function ReportTh({ label, sortKey, sortConfig, handleSort }) {
    return (
      <th
        className={`p-2 text-left border-b cursor-pointer select-none whitespace-nowrap`}
        onClick={() => handleSort(sortKey)}
        title={`Sort by ${label}`}
      >
        <span className="flex gap-1 items-center">
          {label}
          {sortConfig.key === sortKey ? (
            sortConfig.direction === "asc" ? (
              <span aria-label="Asc">▲</span>
            ) : (
              <span aria-label="Desc">▼</span>
            )
          ) : (
            <span className="opacity-40 text-xs pb-0.5">↕</span>
          )}
        </span>
      </th>
    );
  }

  // =====================================
  // RENDER
  // =====================================
  return (
    <div>
      {/* Button Row: Add Call Entry Button + Daily Call Sheet Button */}
      <div className="flex justify-end mb-4 gap-2">
        {/* Add Call Entry Button */}
        <button
          onClick={() => {
            setEditId(null);
            setForm({
              callDate: new Date().toISOString().split("T")[0],
              callTime: "",
              customer: "",
              customerType: "",
              endUser: "",
              department: "",
              callLoggedBy: "",
              warrantyInformation: "",
              callType: "",
              chargeAmount: 0,
              natureOfCall: "",
              instrument: "",
              problemDetails: "",
              preferredDate: "",
              preferredTimings: "",
              callAttempt: 1,
              callUrgency: "",
              callNotedBy: "",
              attachment: null,
            });
            setStartTime("");
            setEndTime("");
            setTimingError("");
            setAttachment(null);
            setShowForm(true);
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-xl shadow transition"
        >
          Add Call Entry
        </button>

        {/* Daily Call Sheet Button */}
        <button
          onClick={() => {
            setShowReportModal(true);
            setReportDate(todayString);
            setReportStatus("All");
            setReportEngineer("All");
            setSearchText("");
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-xl flex gap-2 items-center font-semibold shadow transition print:hidden"
        >
          <FileText className="w-5 h-5" />
          Daily Call Sheet
        </button>
      </div>

      {/* Assignment Modal */}
      {renderAssignModal()}

      {/* Daily Call Sheet Modal */}
      {renderDailyCallSheetModal()}

      {/* Form rendered as card on the page, not modal */}
      {showForm && (
        <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl mx-auto my-4 p-0 relative flex flex-col overflow-hidden transition-all duration-300" style={{ boxShadow: "0 10px 32px 0 rgb(0 0 0 / 0.15)" }}>
          {/* Close Button */}
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-red-500 transition"
            aria-label="Close"
            type="button"
          >
            ×
          </button>
          {/* Header */}
          <div className="px-6 pt-6 pb-0 border-b border-gray-100 flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Call Entry Form</h1>
            <p className="text-gray-500">Service Call Management</p>
          </div>
          {/* Form - scrollable */}
          <div className="overflow-y-auto p-6 flex-1">
            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-5"
            >
              {/* CALL DATE */}
              <div>
                <label className="block mb-2 font-medium">
                  Call Date
                </label>
                <input
                  type="date"
                  name="callDate"
                  value={form.callDate}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
              </div>

              {/* CALL TIME */}
              <div>
                <label className="block mb-2 font-medium">
                  Call Time
                </label>
                <input
                  type="time"
                  name="callTime"
                  value={form.callTime}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
                {form.callTime && (
                  <p className="text-sm text-green-600 mt-1">
                    {formatTime24to12(form.callTime)}
                  </p>
                )}
              </div>

              {/* CUSTOMER */}
              <div>
                <label className="block mb-2 font-medium">
                  Customer
                </label>
                <select
                  name="customer"
                  value={form.customer}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                  required
                >
                  <option value="">
                    Select Customer
                  </option>
                  {customers.map((item) => {
                    const label =
                      item.customerName ||
                      item.name ||
                      item.customer ||
                      item.title ||
                      `Customer (${item._id || "?"})`;

                    return (
                      <option
                        key={item._id || item.id || item.value || label}
                        value={item._id || item.id || item.value || label}
                      >
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* CUSTOMER TYPE */}
              <div>
                <label className="block mb-2 font-medium">
                  Customer Type
                </label>
                <select
                  name="customerType"
                  value={form.customerType}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                  required
                >
                  <option value="">
                    Select Type
                  </option>
                  {customerTypes.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.customerTypeName}
                    </option>
                  ))}
                </select>
              </div>

              {/* DEPARTMENT */}
              <div>
                <label className="block mb-2 font-medium">
                  Department
                </label>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                >
                  <option value="">
                    Select Department
                  </option>
                  {departments.map((item) => {
                    const label =
                      item.departmentName ||
                      item.name ||
                      item.department ||
                      item.title ||
                      `Department (${item._id || "?"})`;
                    return (
                      <option
                        key={item._id || item.id || item.value || label}
                        value={item._id || item.id || item.value || label}
                      >
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* CALL TYPE */}
              <div>
                <label className="block mb-2 font-medium">
                  Call Type
                </label>
                <select
                  name="callType"
                  value={form.callType}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                  required
                >
                  <option value="">
                    Select Call Type
                  </option>
                  {callTypes.map((item) => {
                    const label =
                      item.callTypeName ||
                      item.name ||
                      item.callType ||
                      item.title ||
                      `Call Type (${item._id || "?"})`;
                    return (
                      <option
                        key={item._id || item.id || item.value || label}
                        value={item._id || item.id || item.value || label}
                      >
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* CHARGE */}
              <div>
                <label className="block mb-2 font-medium">
                  Charge Amount
                </label>
                <input
                  type="number"
                  name="chargeAmount"
                  value={form.chargeAmount}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
              </div>

              {/* PREFERRED DATE */}
              <div>
                <label className="block mb-2 font-medium">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={form.preferredDate}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
              </div>

              {/* ADVANCED PREFERRED TIMINGS FIELD */}
              <div className="flex flex-col space-y-2">
                <label className="block font-medium mb-1">
                  Preferred Timings <span className="text-red-600">*</span>
                </label>
                <div className="flex items-center gap-3 w-full">
                  <div className="flex flex-col w-1/2">
                    <span className="text-xs text-gray-500 mb-1">Start Time</span>
                    <input
                      type="time"
                      value={startTime}
                      onChange={e => handleTimingsChange("start", e.target.value)}
                      className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-indigo-200 transition"
                      required
                    />
                  </div>
                  <span className="text-lg font-semibold text-gray-400 select-none">—</span>
                  <div className="flex flex-col w-1/2">
                    <span className="text-xs text-gray-500 mb-1">End Time</span>
                    <input
                      type="time"
                      value={endTime}
                      onChange={e => handleTimingsChange("end", e.target.value)}
                      className="border rounded-xl p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-200 transition"
                      required
                      min={startTime || undefined}
                    />
                  </div>
                </div>
                {form.preferredTimings && !timingError && (
                  <div className="text-green-600 text-sm mt-1 italic">
                    {form.preferredTimings}
                  </div>
                )}
                {timingError && (
                  <div className="text-red-600 text-sm mt-1">
                    {timingError}
                  </div>
                )}
              </div>

              {/* CALL ATTEMPT */}
              <div>
                <label className="block mb-2 font-medium">
                  Call Attempt
                </label>
                <input
                  type="number"
                  name="callAttempt"
                  value={form.callAttempt}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
              </div>

              {/* CALL URGENCY */}
              <div>
                <label className="block mb-2 font-medium">
                  Call Urgency
                </label>
                <select
                  name="callUrgency"
                  value={form.callUrgency}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                >
                  <option value="">
                    Select Urgency
                  </option>
                  {urgencies.map((item) => (
                    <option key={item._id} value={item._id}>
                      {
                        item.urgencyType ||
                        item.urgencyLevel ||
                        item.name ||
                        item.title ||
                        "Urgency"
                      }
                    </option>
                  ))}
                </select>
              </div>

              {/* CALL LOGGED BY */}
              <div>
                <label className="block mb-2 font-medium">
                  Call Logged By
                </label>
                <input
                  type="text"
                  name="callLoggedBy"
                  value={form.callLoggedBy}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
              </div>

              {/* CALL NOTED BY */}
              <div>
                <label className="block mb-2 font-medium">
                  Call Noted By
                </label>
                <input
                  type="text"
                  name="callNotedBy"
                  value={form.callNotedBy}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
              </div>

              {/* WARRANTY */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Warranty Information
                </label>
                <textarea
                  name="warrantyInformation"
                  value={form.warrantyInformation}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                  rows={3}
                />
              </div>

              {/* PROBLEM DETAILS DROPDOWN */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Problem Details
                </label>
                <select
                  name="problemDetails"
                  value={form.problemDetails}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                >
                  <option value="">Select Problem</option>
                  {problems.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.problemName}
                    </option>
                  ))}
                </select>
              </div>

              {/* ATTACHMENT INPUT */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Attachment (Image or File)
                </label>
                <input
                  type="file"
                  name="attachment"
                  accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl"
                />
                {attachment && (
                  <p className="text-sm text-blue-600 mt-1">
                    Selected: {attachment.name}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={
                    !startTime ||
                    !endTime ||
                    !!timingError ||
                    endTime <= startTime
                  }
                >
                  {editId ? "Update Call Entry" : "Save Call Entry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CRUD TABLE */}
      <div className="bg-white rounded-2xl shadow p-6 mt-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">
          Call Entry List
        </h2>
        <table className="w-full min-w-max border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Call No</th>
              <th className="p-3 text-left">Call Date</th>
              <th className="p-3 text-left">Call Time</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Customer Type</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Call Type</th>
              <th className="p-3 text-left">Problem</th>
              <th className="p-3 text-left">Urgency</th>
              <th className="p-3 text-left">Charge Amount</th>
              <th className="p-3 text-left">Preferred Date</th>
              <th className="p-3 text-left">Preferred Timings</th>
              <th className="p-3 text-left">Call Attempt</th>
              <th className="p-3 text-left">Call Logged By</th>
              <th className="p-3 text-left">Call Noted By</th>
              <th className="p-3 text-left">Warranty Information</th>
              <th className="p-3 text-left">Attachment</th>
              {/* New Assignment Columns */}
              <th className="p-3 text-left">Engineer Assigned</th>
              <th className="p-3 text-left">Assigned Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Assign Remark</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {callEntries.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">
                  {item.callNo}
                </td>
                <td className="p-3">
                  {item.callDate
                    ? new Date(item.callDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="p-3">
                  {
                    item.callTime
                      ? formatTime24to12(item.callTime)
                      : "-"
                  }
                </td>
                <td className="p-3">
                  {
                    item.customer?.customerName ||
                    item.customer?.name ||
                    item.customer?.customer ||
                    item.customer?.title ||
                    "-"
                  }
                </td>
                <td className="p-3">
                  {
                    item.customerType?.customerTypeName ||
                    item.customerType?.name ||
                    item.customerType?.title ||
                    "-"
                  }
                </td>
                <td className="p-3">
                  {item.department?.departmentName || "-"}
                </td>
                <td className="p-3">
                  {item.callType?.callType || "-"}
                </td>
                <td className="p-3">
                  {item.problemDetails?.problemName || "-"}
                </td>
                <td className="p-3">
                  {
                    item.callUrgency?.urgencyType ||
                    item.callUrgency?.urgencyLevel ||
                    item.callUrgency?.name ||
                    item.callUrgency?.title ||
                    "-"
                  }
                </td>
                <td className="p-3">
                  ₹{item.chargeAmount || 0}
                </td>
                <td className="p-3">
                  {item.preferredDate
                    ? new Date(item.preferredDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="p-3">
                  {item.preferredTimings || "-"}
                </td>
                <td className="p-3">
                  {item.callAttempt || "-"}
                </td>
                <td className="p-3">
                  {item.callLoggedBy || "-"}
                </td>
                <td className="p-3">
                  {item.callNotedBy || "-"}
                </td>
                <td className="p-3 max-w-xs break-words">
                  {item.warrantyInformation || "-"}
                </td>
                {/* ATTACHMENT CELL */}
                <td className="p-3">
                  {item.attachment?.url ? (
                    /\.(jpg|jpeg|png|gif|webp)$/i.test(item.attachment.url) ? (
                      <img
                        src={item.attachment.url}
                        alt="Attachment"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <a
                        href={item.attachment.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        Download
                      </a>
                    )
                  ) : (
                    "-"
                  )}
                </td>
                {/* --- Assignment Columns --- */}
                <td className="p-3">
                  {item.engineerAssigned?.employeeName || "-"}
                </td>
                <td className="p-3">
                  {item.assignedDate
                    ? new Date(item.assignedDate).toLocaleString("en-IN", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })
                    : "-"}
                </td>
                <td className="p-3">
                  <StatusBadge status={item.callStatus} />
                </td>
                <td className="p-3 max-w-xs break-words">
                  {item.assignRemark || "-"}
                </td>
                <td className="p-3 flex gap-2 justify-center">
                  {/* Assign/Reassign Button */}
                  <button
                    onClick={() => handleOpenAssign(item)}
                    type="button"
                    className={`${
                      item.callStatus === "Pending"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white px-4 py-1 rounded-lg font-medium transition`}
                  >
                    {item.callStatus === "Pending" ? "Assign" : "Reassign"}
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CallEntryForm;