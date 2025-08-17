import SAAdminLayout from "../../../layouts/Sinfodemanager"; // Assuming you have a layout component for the admin dashboard

import { useState } from "react";
import axios from "../../../api/axiosConfig";
import {
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

export default function Branch() {
  const [branches, setBranches] = useState([
    {
      id: 1,
      branchName: "Main Branch",
      branchCode: "BR-1001",
      city: "Jaipur",
      state: "Rajasthan",
      contact: "9876543210",
      email: "main@branch.com",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const toggleStatus = (id) => {
    setBranches(
      branches.map((branch) =>
        branch.id === id
          ? {
              ...branch,
              status: branch.status === "Active" ? "Inactive" : "Active",
            }
          : branch
      )
    );
  };

  const deleteBranch = (id) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      setBranches(branches.filter((branch) => branch.id !== id));
    }
  };

 const filteredBranches = branches.filter((branch) =>
  (branch.branchName || "").toLowerCase().includes(search.toLowerCase()) ||
  (branch.city || "").toLowerCase().includes(search.toLowerCase()) ||
  (branch.branchCode || "").toLowerCase().includes(search.toLowerCase())
);


  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new branch
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("branches", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Branch created successfully!");
      setIsModalOpen(false);
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

      // Optional: add to list without refresh
     setBranches([
  ...branches,
  {
    id: res.data.id,
    branchName: res.data.branch_name,
    branchCode: res.data.branchCode || "BR-" + (branches.length + 1001),
    city: res.data.city,
    state: res.data.state,
    contact: res.data.contact_number,
    email: res.data.email,
    status: res.data.status,
  },
]);

    } catch (error) {
      console.error(error);
      alert("Error creating branch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SAAdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Branches</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
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
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Branch Name</th>
                <th className="p-3 border">Code</th>
                <th className="p-3 border">City</th>
                <th className="p-3 border">State</th>
                <th className="p-3 border">Contact</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.length > 0 ? (
                filteredBranches.map((branch) => (
                  <tr key={branch.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{branch.branchName}</td>
                    <td className="p-3 border">{branch.branchCode}</td>
                    <td className="p-3 border">{branch.city}</td>
                    <td className="p-3 border">{branch.state}</td>
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
                    <td className="p-3 border text-center flex justify-center gap-3">
                      {/* Toggle Status */}
                      <button
                        onClick={() => toggleStatus(branch.id)}
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

                      {/* Edit */}
                      <button
                        onClick={() =>
                          alert("Edit Branch: " + branch.branchName)
                        }
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                        title="Edit Branch"
                      >
                        <FaEdit size={18} />
                      </button>

                      {/* Delete */}
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
                  <td colSpan="8" className="text-center p-4 text-gray-500">
                    No branches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Create Branch Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <FaTimes />
              </button>
              <h2 className="text-xl font-bold mb-4">Create Branch</h2>
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
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
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
