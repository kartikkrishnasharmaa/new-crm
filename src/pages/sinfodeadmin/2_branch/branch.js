import SAAdminLayout from "../../../layouts/Sinfodeadmin";
import { useState, useEffect } from "react";
import axios from "../../../api/axiosConfig";
import { HiDotsVertical } from "react-icons/hi"; // 3 dots icon

import {
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

export default function Branch() {
  const [branches, setBranches] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingBranchId, setEditingBranchId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null); // har staff ka menu control karne ke liye
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
  const handleEditClick = (branch) => {
    setEditingBranchId(branch.id);
    setFormData({
      branch_name: branch.branchName,
      address: branch.address || "",
      city: branch.city,
      state: branch.state,
      pin_code: branch.pin_code || "",
      contact_number: branch.contact,
      email: branch.email,
      opening_date: branch.opening_date || "",
      branch_type: branch.branch_type || "Main",
      status: branch.status,
      manager_name: branch.manager_name || "",
      manager_email: branch.manager_email || "",
      manager_password: "",
    });
    setIsModalOpen(true);
  };

  // Form data
  const [formData, setFormData] = useState({
    branch_name: "",
    address: "",
    city: "",
    state: "",
    pin_code: "",
    contact_number: "",
    email: "",
    opening_date: "",
    branch_type: "Main",
    status: "Active",
    manager_name: "",
    manager_email: "",
    manager_password: "",
  });
  const fetchBranches = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found! Please login again.");
        return;
      }
      const res = await axios.get("branches", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const branchData = res.data.map((branch) => ({
        id: branch.id,
        branchName: branch.branch_name,
        branch_code: branch.branch_code || "BR-" + branch.id,
        city: branch.city,
        state: branch.state,
        contact: branch.contact_number,
        email: branch.email,
        status: branch.status,
        opening_date: branch.opening_date, // 👈 yeh line add karo
        pin_code: branch.pin_code || "",
        address: branch.address || "",
        branch_type: branch.branch_type || "Main",
      }));

      setBranches(branchData);
    } catch (error) {
      console.error("Error fetching branches:", error);
      alert("Failed to load branches");
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

      await axios.patch(
        `branches/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBranches(
        branches.map((branch) =>
          branch.id === id ? { ...branch, status: newStatus } : branch
        )
      );
      alert(`Branch status changed to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const deleteBranch = async (id) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`branches/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Branch deleted successfully!");
        fetchBranches(); // Refresh list
      } catch (error) {
        console.error("Error deleting branch:", error);
        alert("Failed to delete branch");
      }
    }
  };

  const filteredBranches = branches.filter(
    (branch) =>
      (branch.branchName || "").toLowerCase().includes(search.toLowerCase()) ||
      (branch.city || "").toLowerCase().includes(search.toLowerCase()) ||
      (branch.branchCode || "").toLowerCase().includes(search.toLowerCase())
  );

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (editingBranchId) {
        // Update existing branch
        const res = await axios.put(`branches/${editingBranchId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBranches(
          branches.map((branch) =>
            branch.id === editingBranchId ? { ...branch, ...res.data } : branch
          )
        );
        alert("Branch updated successfully!");
      } else {
        // Create new branch
        const res = await axios.post("branches", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBranches([...branches, res.data]);
        alert("Branch created successfully!");
      }
      fetchBranches();

      setIsModalOpen(false);
      setEditingBranchId(null);
      resetForm();
    } catch (error) {
      console.error(error);
      alert(
        editingBranchId ? "Error updating branch" : "Error creating branch"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      branch_name: "",
      address: "",
      city: "",
      state: "",
      pin_code: "",
      contact_number: "",
      email: "",
      opening_date: "",
      branch_type: "Main",
      status: "Active",
      manager_name: "",
      manager_email: "",
      manager_password: "",
    });
  };

  return (
    <SAAdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[34px] font-nunito">
            Branches ({branches.length})
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#3F8CFF] hover:bg-blue-700 text-white px-4 py-2 rounded-3xl flex items-center gap-2"
          >
            <FaPlus /> Create Branch
          </button>
        </div>

        {/* Search Filter */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, city, or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full md:w-1/3"
          />
        </div>

        {/* Table */}
        <div className="shadow-md rounded-lg">
          <div className="space-y-3">
            {filteredBranches.length > 0 ? (
              filteredBranches.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-white shadow-sm hover:shadow-md transition rounded-xl px-5 py-4 flex items-center relative overflow-visible"
                >
                  {/* Left: Branch Icon + Details */}
                  <div className="flex items-center gap-4">
                    {/* Branch Icon (Dummy) */}
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                      alt={branch.branchName}
                      className="w-12 h-12 rounded-full object-cover border p-2 bg-gray-50"
                    />
                    {/* Branch Details */}
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {branch.branchName}
                      </h3>
                      <p className="text-gray-500 text-sm">{branch.city}</p>
                    </div>
                  </div>

                  {/* Middle: Extra Info */}
                  <div className="hidden md:flex flex-col text-sm text-gray-600 flex-1 items-center">
                    <span className="font-medium">Branch Code:</span>
                    <span>{branch.branch_code}</span>
                  </div>

                  <div className="hidden md:flex flex-col text-sm text-gray-600 flex-1 items-center">
                    <span className="font-medium">Opening Date:</span>
                    <span>
                      {branch.opening_date
                        ? new Date(branch.opening_date).toLocaleDateString(
                            "en-GB"
                          )
                        : ""}
                    </span>
                  </div>
                  <div className="hidden md:flex flex-col text-sm text-gray-600 flex-1 items-center">
                    <span className="font-medium">Email:</span>
                    <span>{branch.email}</span>
                  </div>
                  <div className="hidden md:flex flex-col text-sm text-gray-600 flex-1 items-center">
                    <span className="font-medium">Contact:</span>
                    <span>{branch.contact}</span>
                  </div>

                  {/* Status */}
                  <div className="hidden md:flex flex-col text-sm text-gray-600 flex-1 items-center">
                    <span className="font-medium">Status:</span>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        branch.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {branch.status}
                    </span>
                  </div>

                  {/* Right: 3 dots menu */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === branch.id ? null : branch.id
                        )
                      }
                      className="menu-toggle p-2 hover:bg-gray-100 rounded-full"
                    >
                      <HiDotsVertical size={20} />
                    </button>
                    {openMenuId === branch.id && (
                      <div
                        className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 py-2 z-50 menu-container"
                        onClick={(e) => e.stopPropagation()} // 👈 ye zaroori hai
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // 👈 isse menu close nahi hoga
                            toggleStatus(branch.id, branch.status);
                            setOpenMenuId(null); // 👈 optional: click ke baad menu close karna ho
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                        >
                          {branch.status === "Active" ? (
                            <FaToggleOn size={18} className="text-green-600" />
                          ) : (
                            <FaToggleOff size={18} className="text-red-600" />
                          )}
                          Toggle Status
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(branch);
                            setOpenMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-blue-600"
                        >
                          <FaEdit size={16} /> Edit
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteBranch(branch.id);
                            setOpenMenuId(null);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
                        >
                          <FaTrash size={16} /> Delete
                        </button>
                      </div>
                    )}

                    {/* 
                    {openMenuId === branch.id && (
                      <div
                        className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 py-2 z-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => toggleStatus(branch.id, branch.status)}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                        >
                          {branch.status === "Active" ? (
                            <FaToggleOn size={18} className="text-green-600" />
                          ) : (
                            <FaToggleOff size={18} className="text-red-600" />
                          )}
                          Toggle Status
                        </button>

                        <button
                          onClick={() => handleEditClick(branch)}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-blue-600"
                        >
                          <FaEdit size={16} /> Edit
                        </button>

                        <button
                          onClick={() => deleteBranch(branch.id)}
                          className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
                        >
                          <FaTrash size={16} /> Delete
                        </button>
                      </div>
                    )} */}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-4 text-gray-500">
                No branches found.
              </div>
            )}
          </div>

          {/* <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Sr. No.</th>
                <th className="p-3 border">Branch Name</th>
                <th className="p-3 border">Branch Code</th>
                <th className="p-3 border">City</th>
                <th className="p-3 border">Opening Date</th>
                <th className="p-3 border">Contact</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.length > 0 ? (
                filteredBranches.map((branch, index) => (
                  <tr key={branch.id} className="hover:bg-gray-50">
                    {/* Serial No. */}
          {/* <td className="p-3 border">{index + 1}</td>

                    <td className="p-3 border">{branch.branchName}</td>

                    <td className="p-3 border">{branch.branch_code}</td>

                    <td className="p-3 border">{branch.city}</td>

                    <td className="p-3 border">
                      {branch.opening_date
                        ? new Date(branch.opening_date).toLocaleDateString()
                        : ""}
                    </td>

                    <td className="p-3 border">{branch.contact}</td>

                    <td className="p-3 border">{branch.email}</td>

                    <td className="p-3 border">
                      <span
                        className={`px-2 py-1 text-sm rounded ${
                          branch.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {branch.status}
                      </span>
                    </td>

                    {/* Actions */}
          {/* <td className="p-3 border text-center flex justify-center gap-3">
                      <button
                        onClick={() => toggleStatus(branch.id, branch.status)}
                        className={`p-2 rounded ${
                          branch.status === "Active"
                            ? "text-green-600 hover:bg-green-100"
                            : "text-red-600 hover:bg-red-100"
                        }`}
                        title="Toggle Status"
                      >
                        {branch.status === "Active" ? (
                          <FaToggleOn size={20} />
                        ) : (
                          <FaToggleOff size={20} />
                        )}
                      </button>

                      <button
                        onClick={() => handleEditClick(branch)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                        title="Edit Branch"
                      >
                        <FaEdit size={18} />
                      </button>

                      <button
                        onClick={() => deleteBranch(branch.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded"
                        title="Delete Branch"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center p-4 text-gray-500">
                    No branches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table> */}
        </div>

        {/* Create Branch Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingBranchId(null); // Reset editing state
                  resetForm(); // Reset form fields
                }}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <FaTimes />
              </button>

              <h2 className="text-[20px] font-semibold mb-3 font-nunito">
                {editingBranchId ? "Update Branch" : "Create Branch"}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <input
                  name="branch_name"
                  value={formData.branch_name}
                  onChange={handleChange}
                  placeholder="Branch Name"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="pin_code"
                  value={formData.pin_code}
                  onChange={handleChange}
                  placeholder="Pin Code"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  type="email"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="opening_date"
                  value={formData.opening_date}
                  onChange={handleChange}
                  type="date"
                  className="border p-2 rounded"
                  required
                />
                <select
                  name="branch_type"
                  value={formData.branch_type}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option>Main</option>
                  <option>Franchise</option>
                </select>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <input
                  name="manager_name"
                  value={formData.manager_name}
                  onChange={handleChange}
                  placeholder="Manager Name"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="manager_email"
                  value={formData.manager_email}
                  onChange={handleChange}
                  placeholder="Manager Email"
                  type="email"
                  className="border p-2 rounded"
                  required
                />
                <input
                  name="manager_password"
                  value={formData.manager_password}
                  onChange={handleChange}
                  placeholder="Manager Password"
                  type="password"
                  className="border p-2 rounded"
                  required
                />
                <div className="col-span-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#3F8CFF] hover:bg-blue-700 text-white px-4 py-2 rounded-3xl flex items-center gap-2"
                  >
                    {loading ? "Saving..." : "Save Branch"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </SAAdminLayout>
  );
}
