import SAAdminLayout from "../../../layouts/Sinfodeadmin";
import { useState, useEffect, useRef } from "react";
import axios from "../../../api/axiosConfig";
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
  FaList,
  FaThLarge,
  FaTimes,
} from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi"; // 3 dots icon

import { useNavigate } from "react-router-dom";

export default function Staff() {
  const [staffList, setStaffList] = useState([]);
  const [branches, setBranches] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [openMenuId, setOpenMenuId] = useState(null); // har staff ka menu control karne ke liye

  // Agar bahar click kare to menu close ho
 // Staff.js me
useEffect(() => {
  function handleClickOutside(event) {
    // Agar openMenuId set hai aur click kisi bhi menu ke andar nahi hua
    if (
      openMenuId !== null &&
      !event.target.closest(".menu-container") && // menu ke andar click check
      !event.target.closest(".menu-toggle") // 3 dots button ke andar click check
    ) {
      setOpenMenuId(null); // Close menu
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [openMenuId]);


  const [formData, setFormData] = useState({
    employee_name: "",
    employee_code: "",
    designation: "",
    joining_date: "",
    contact_number: "",
    email: "",
    department: "",
    attendance_status: "Present",
    branch_id: "",
    staffcreate_name: "",
    staffcreate_email: "",
    staffcreate_password: "",
  });

  const fetchBranches = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/branches", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBranches(
        res.data.map((branch) => ({
          id: branch.id,
          branch_name: branch.branch_name,
        }))
      );
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/staff", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaffList(res.data || []);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  useEffect(() => {
    fetchStaff();
    fetchBranches();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const toggleAttendance = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const newStatus = currentStatus === "Present" ? "Absent" : "Present";
      await axios.put(
        `/staff/update/${id}`,
        { attendance_status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStaffList(
        staffList.map((staff) =>
          staff.id === id ? { ...staff, attendance_status: newStatus } : staff
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteStaff = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/staff/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchStaff();
      } catch (error) {
        console.error("Error deleting staff:", error);
      }
    }
  };

  const filteredStaff = staffList.filter(
    (staff) =>
      (staff.employee_name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (staff.designation || "").toLowerCase().includes(search.toLowerCase()) ||
      (staff.employee_code || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (staff) => {
    setEditingStaffId(staff.id);
    setFormData({
      employee_name: staff.employee_name,
      employee_code: staff.employee_code,
      designation: staff.designation,
      joining_date: staff.joining_date,
      contact_number: staff.contact_number,
      email: staff.email,
      department: staff.department,
      attendance_status: staff.attendance_status,
      branch_id: staff.branch_id,
      staffcreate_name: staff.staffcreate_name,
      staffcreate_email: staff.staffcreate_email,
      staffcreate_password: "",
    });
    setIsModalOpen(true);
  };
  // Create/Update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (editingStaffId) {
        // Update
        await axios.put(`/staff/update/${editingStaffId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Staff updated successfully!");
      } else {
        // Create
        await axios.post("/staff/create", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Staff created successfully!");
      }
      fetchStaff();
      setIsModalOpen(false);
      setEditingStaffId(null);
      resetForm();
    } catch (error) {
      console.error(error);
      alert(editingStaffId ? "Error updating staff" : "Error creating staff");
    } finally {
      setLoading(false);
    }
  };
  // Reset form
  const resetForm = () => {
    setFormData({
      employee_name: "",
      employee_code: "",
      designation: "",
      joining_date: "",
      contact_number: "",
      email: "",
      department: "",
      attendance_status: "Present",
      branch_id: "",
      staffcreate_name: "",
      staffcreate_email: "",
      staffcreate_password: "",
    });
  };
  return (
    <SAAdminLayout>
      <div className="px-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {/* Left: Heading */}
          <h1 className="text-[34px] font-nunito">
            {" "}
            Employee{" "}
            <span className="text-[34px] font-nunito">
              ({filteredStaff.length})
            </span>
          </h1>

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

          {/* Right: Create Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#3F8CFF] hover:bg-blue-700 text-white px-4 py-2 rounded-3xl flex items-center gap-2"
          >
            <FaPlus /> Create Staff
          </button>
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
            {filteredStaff.map((staff) => (
              <div
                key={staff.id}
                className="bg-white shadow-sm hover:shadow-md transition rounded-xl px-5 py-4 flex items-center"
              >
                {/* Left: Profile + Details */}
                <div className="flex items-center gap-4">
                  {/* Profile Image */}
                  <img
                    src={
                      staff.profile_image ||
                      "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png"
                    }
                    alt={staff.employee_name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  {/* Details */}
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {staff.employee_name}
                    </h3>
                    <p className="text-gray-500 text-sm">{staff.email}</p>
                  </div>
                </div>

                {/* Middle: Extra Info */}
                {/* Middle: Extra Info */}
                <div className="hidden md:flex flex-col text-sm text-gray-600 flex-1 items-center">
                  <span className="font-medium">Position:</span>
                  <span>{staff.designation}</span>
                </div>

                {/* Right: 3 dots menu */}
                {/* Three dots menu */}
                {/* Right: 3 dots menu */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === staff.id ? null : staff.id)
                    }
                      className="menu-toggle p-2 hover:bg-gray-100 rounded-full"

                  >
                    <HiDotsVertical size={20} />
                  </button>

                  {openMenuId === staff.id && (
                    <div
    className="menu-container absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 py-2 z-50"
                      onClick={(e) => e.stopPropagation()} // 👈 yeh important hai
                    >
                      <button
                        onClick={() =>
                          toggleAttendance(staff.id, staff.attendance_status)
                        }
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      >
                        {staff.attendance_status === "Present" ? (
                          <FaToggleOn size={18} className="text-green-600" />
                        ) : (
                          <FaToggleOff size={18} className="text-red-600" />
                        )}
                        {staff.attendance_status}
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/sinfodeadmin/staff/${staff.id}`)
                        }
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-purple-600"
                      >
                        <FaEye size={16} /> View
                      </button>

                      <button
                        onClick={() => handleEditClick(staff)}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-blue-600"
                      >
                        <FaEdit size={16} /> Edit
                      </button>

                      <button
                        onClick={() => deleteStaff(staff.id)}
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
          /* Card View */
          <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredStaff.map((staff) => (
              <div
                key={staff.id}
                className="bg-white mt-6 rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center"
              >
                {/* Profile Image */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md -mt-10 mb-3">
                  <img
                    src={
                      staff.profile_image ||
                      "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png"
                    }
                    alt={staff.employee_name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-semibold">{staff.employee_name}</h3>
                <p className="text-gray-500">{staff.designation}</p>

                {/* Task Stats */}
                <div className="grid gap-3 mt-4 w-full text-sm">
                  <div className="bg-gray-50 rounded-lg py-2">
                    <p className="text-gray-800 font-bold">
                      Contact No: {staff.contact_number || 0}
                    </p>
                  </div>
                </div>

                {/* Attendance Badge */}
                <span
                  className={`mt-4 px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700`}
                >
                  Joined on: {staff.joining_date}
                </span>
              </div>
            ))}
          </div>
        )}
        {/* Modal */}{" "}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            {" "}
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
              {" "}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                {" "}
                <FaTimes />{" "}
              </button>{" "}
              <h2 className="text-[18px] font-nunito">
                {" "}
                {editingStaffId ? "Update Staff" : "Create Staff"}{" "}
              </h2>{" "}
              <form
                onSubmit={handleSubmit}
                className="grid mt-3 grid-cols-2 gap-4"
              >
                {" "}
                <input
                  name="employee_name"
                  value={formData.employee_name}
                  onChange={handleChange}
                  placeholder="Employee Name"
                  className="border p-2 rounded"
                  required
                />{" "}
  
                <input
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Designation"
                  className="border p-2 rounded"
                  required
                />{" "}
                <input
                  name="joining_date"
                  value={formData.joining_date}
                  onChange={handleChange}
                  type="date"
                  className="border p-2 rounded"
                  required
                />{" "}
                <input
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="border p-2 rounded"
                  required
                />{" "}
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  type="email"
                  className="border p-2 rounded"
                  required
                />{" "}
                <input
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Department"
                  className="border p-2 rounded"
                  required
                />{" "}
                <select
                  name="branch_id"
                  value={formData.branch_id}
                  onChange={handleBChange}
                  className="border p-2 rounded"
                  required
                >
                  {" "}
                  <option value="">Select Branch</option>{" "}
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {" "}
                      {branch.branch_name}{" "}
                    </option>
                  ))}{" "}
                </select>{" "}
                <input
                  name="staffcreate_name"
                  value={formData.staffcreate_name}
                  onChange={handleChange}
                  placeholder="Staff Create Name"
                  className="border p-2 rounded"
                  required
                />{" "}
                <input
                  name="staffcreate_email"
                  value={formData.staffcreate_email}
                  onChange={handleChange}
                  placeholder="Staff Create Email"
                  type="email"
                  className="border p-2 rounded"
                  required
                />{" "}
                <input
                  name="staffcreate_password"
                  value={formData.staffcreate_password}
                  onChange={handleChange}
                  placeholder="Staff Create Password"
                  type="password"
                  className="border p-2 rounded"
                  required={!editingStaffId}
                />{" "}
                <div className="col-span-2 flex justify-end">
                  {" "}
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#3F8CFF] hover:bg-blue-700 text-white px-4 py-2 rounded-3xl flex items-center gap-2"
                  >
                    {" "}
                    {loading ? "Saving..." : "Save Staff"}{" "}
                  </button>{" "}
                </div>{" "}
              </form>{" "}
            </div>{" "}
          </div>
        )}
      </div>
    </SAAdminLayout>
  );
}
