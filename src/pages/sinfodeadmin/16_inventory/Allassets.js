import { useEffect, useState } from "react";
import axios from "../../../api/axiosConfig";
import { FaEdit, FaTrash } from "react-icons/fa";

function Allassets() {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [branches, setBranches] = useState([]);
  const [staffs, setStaffs] = useState([]);

  // Form fields
  const [formData, setFormData] = useState({
    asset_name: "",
    asset_code: "",
    purchase_date: "",
    current_status: "",
    quantity_available: "",
    assigned_staff_id: "",
    branch_id: "",
  });

  // ✅ Fetch assets
  const fetchAssets = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/assets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssets(res.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  // ✅ Fetch branches
  const fetchBranches = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/branches", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const branchData = res.data.map((branch) => ({
        id: branch.id,
        branchName: branch.branch_name,
      }));
      setBranches(branchData);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  // ✅ Fetch staff
  const fetchStaffs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/staff", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const staffData = res.data.map((s) => ({
        id: s.id,
        name: s.employee_name,
      }));

      setStaffs(staffData);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  useEffect(() => {
    fetchAssets();
    fetchBranches();
    fetchStaffs();
  }, []);

  // ✅ Open Update Modal
  const handleEdit = (asset) => {
    setSelectedAsset(asset);
    setFormData({
      asset_name: asset.asset_name,
      asset_code: asset.asset_code,
      purchase_date: asset.purchase_date,
      current_status: asset.current_status,
      quantity_available: asset.quantity_available,
      assigned_staff_id: asset.assigned_staff_id || "",
      branch_id: asset.branch_id || "",
    });
    setShowModal(true);
  };

  // ✅ Update API
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/assets/${selectedAsset.id}/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      fetchAssets();
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };

  // ✅ Delete API
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this asset?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/assets/${id}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAssets();
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Assets</h1>

      {assets.length === 0 ? (
        <p className="text-gray-500">No assets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-100 hover:shadow-lg transition relative"
            >
              {/* Action Icons */}
              <div className="absolute top-3 right-3 flex space-x-3">
                <FaEdit
                  className="text-blue-600 cursor-pointer hover:scale-110"
                  onClick={() => handleEdit(asset)}
                />
                <FaTrash
                  className="text-red-600 cursor-pointer hover:scale-110"
                  onClick={() => handleDelete(asset.id)}
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {asset.asset_name}
              </h2>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Code:</span> {asset.asset_code}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Purchase Date:</span>{" "}
                {asset.purchase_date}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    asset.current_status === "in_use"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {asset.current_status}
                </span>
              </p>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Quantity:</span>{" "}
                {asset.quantity_available}
              </p>

              {/* Branch Info */}
              {asset.branch && (
                <p className="text-gray-600 text-sm mt-2">
                  <span className="font-medium">Branch:</span>{" "}
                  {asset.branch.branch_name} ({asset.branch.city})
                </p>
              )}

              {/* Staff Info */}
              {asset.staff && (
                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-medium">Assigned To:</span>{" "}
                  {asset.staff.employee_name} ({asset.staff.designation})
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ✅ Update Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Update Asset</h2>

            {/* Normal Inputs */}
            <input
              type="text"
              value={formData.asset_name}
              placeholder="Asset Name"
              onChange={(e) =>
                setFormData({ ...formData, asset_name: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="text"
              value={formData.asset_code}
              placeholder="Asset Code"
              onChange={(e) =>
                setFormData({ ...formData, asset_code: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="date"
              value={formData.purchase_date}
              onChange={(e) =>
                setFormData({ ...formData, purchase_date: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            />

            {/* Status */}
            <select
              value={formData.current_status}
              onChange={(e) =>
                setFormData({ ...formData, current_status: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            >
              <option value="">Select Status</option>
              <option value="in_use">In Use</option>
              <option value="available">Available</option>
              <option value="maintenance">Maintenance</option>
            </select>

            <input
              type="number"
              value={formData.quantity_available}
              placeholder="Quantity"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity_available: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-3"
            />

            {/* ✅ Branch Dropdown */}
            <select
              value={formData.branch_id}
              onChange={(e) =>
                setFormData({ ...formData, branch_id: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            >
              <option value="">Select Branch</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.branchName}
                </option>
              ))}
            </select>

            {/* ✅ Staff Dropdown */}
            <select
              value={formData.assigned_staff_id}
              onChange={(e) =>
                setFormData({ ...formData, assigned_staff_id: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
            >
              <option value="">Select Staff</option>
              {staffs.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Allassets;
