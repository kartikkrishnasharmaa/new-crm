import { useState, useEffect, useRef } from "react";
import axios from "../../../api/axiosConfig";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function Allstudents() {
  const [students, setStudents] = useState([]);
  const [branches, setBranches] = useState([]);   // ✅ all branches
  const [selectedBranch, setSelectedBranch] = useState(""); // ✅ branch filter
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        openMenuId !== null &&
        !event.target.closest(".menu-container") &&
        !event.target.closest(".menu-toggle")
      ) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  // Fetch Students
  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/students/show", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  // ✅ Fetch Branches
  const fetchBranches = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/branches", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBranches(res.data || []);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchBranches();
  }, []);

  // ✅ Filter students by branch + search
  const filteredStudents = students.filter((s) => {
    const matchesBranch =
      selectedBranch === "" || s.branch_id === parseInt(selectedBranch);

    const matchesSearch =
      (s.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.admission_number || "").toLowerCase().includes(search.toLowerCase());

    return matchesBranch && matchesSearch;
  });

  return (
      <div className="px-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[34px] font-nunito">
            Students{" "}
            <span className="text-[34px] font-nunito">
              ({filteredStudents.length})
            </span>
          </h1>
  {/* ✅ Branch Dropdown */}
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="border p-2 rounded w-full md:w-60"
        >
          <option value="">All Branches</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.branch_name}
            </option>
          ))}
        </select>
          <div className="flex gap-2 bg-gray-200 p-1 rounded-full">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === "list"
                  ? "bg-[#3F8CFF] text-white"
                  : "bg-transparent text-gray-600 hover:bg-gray-300"
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === "card"
                  ? "bg-[#3F8CFF] text-white"
                  : "bg-transparent text-gray-600 hover:bg-gray-300"
              }`}
            >
              Card View
            </button>
          </div>

        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full md:w-1/3"
          />
        </div>

        {/* List View */}
        {viewMode === "list" ? (
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-white shadow-sm hover:shadow-md transition rounded-xl px-5 py-4 flex items-center"
              >
                {/* Left: Profile + Details */}
                <div className="flex items-center gap-4">
                  <img
                    src={
                      student.photo
                        ? `/uploads/${student.photo}`
                        : "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png"
                    }
                    alt={student.full_name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {student.full_name}
                    </h3>
                    <p className="text-gray-500 text-sm">{student.email}</p>
                  </div>
                </div>

                {/* Middle Info */}
                <div className="hidden md:flex flex-col text-sm text-gray-600 flex-1 items-center">
                  <span className="font-medium">Admission No:</span>
                  <span>{student.admission_number}</span>
                </div>

                {/* Right Menu */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === student.id ? null : student.id)
                    }
                    className="menu-toggle p-2 hover:bg-gray-100 rounded-full"
                  >
                    <HiDotsVertical size={20} />
                  </button>

                  {openMenuId === student.id && (
                    <div
                      className="menu-container absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 py-2 z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => alert("View API call yaha lagega")}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-purple-600"
                      >
                        <FaEye size={16} /> View
                      </button>

                      <button
                        onClick={() => alert("Edit API call yaha lagega")}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-blue-600"
                      >
                        <FaEdit size={16} /> Edit
                      </button>

                      <button
                        onClick={() => alert("Delete API call yaha lagega")}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        <FaTrash size={16} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Card View
          <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-white mt-6 rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md -mt-10 mb-3">
                  <img
                    src={
                      student.photo
                        ? `/uploads/${student.photo}`
                        : "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png"
                    }
                    alt={student.full_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">{student.full_name}</h3>
                <p className="text-gray-500">{student.email}</p>
                <div className="grid gap-3 mt-4 w-full text-sm">
                  <div className="bg-gray-50 rounded-lg py-2">
                    <p className="text-gray-800 font-bold">
                      Admission No: {student.admission_number}
                    </p>
                  </div>
                </div>
                <span className="mt-4 px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                  Admission Date: {student.admission_date}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
  );
}
