import { useState, useEffect } from "react";
import axios from "../../../api/axiosConfig";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function Allbatch() {
  const [batches, setBatches] = useState([]);
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal state
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Editable fields
  const [editForm, setEditForm] = useState({
    batch_name: "",
    student_limit: "",
    start_date: "",
    end_date: "",
  });
const fetchBatches = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/batches/show", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // ✅ Ensure it's always an array
    const batchList = Array.isArray(res.data)
      ? res.data
      : res.data.data || [];

    setBatches(batchList);
    setFilteredBatches(batchList);

    // ✅ extract unique branches
    const uniqueBranches = [];
    const branchMap = {};
    batchList.forEach((batch) => {
      if (batch.course?.branch_id && !branchMap[batch.course.branch_id]) {
        branchMap[batch.course.branch_id] = true;
        uniqueBranches.push({
          id: batch.course.branch_id,
          name: batch.course.course_name + " - Branch " + batch.course.branch_id,
        });
      }
    });
    setBranches(uniqueBranches);
  } catch (error) {
    console.error("Error fetching batches:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchBatches();
  }, []);
  // filter batches by branch
  useEffect(() => {
    if (selectedBranch) {
      const filtered = batches.filter(
        (b) => String(b.course?.branch_id) === String(selectedBranch)
      );
      setFilteredBatches(filtered);
    } else {
      setFilteredBatches(batches);
    }
  }, [selectedBranch, batches]);

  // ============ ACTION HANDLERS ============

  // View single batch
  const handleView = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/batches/show/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("VIEW RESPONSE:", res.data);

      const batchData = res.data.data ? res.data.data : res.data;
      setSelectedBatch(batchData);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error("Error fetching batch:", error);
    }
  };

  // Open edit modal with data
  const handleEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/batches/show/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("EDIT RESPONSE:", res.data);

      const batchData = res.data.data ? res.data.data : res.data;

      setSelectedBatch(batchData);
      setEditForm({
        batch_name: batchData.batch_name || "",
        student_limit: batchData.student_limit || "",
        start_date: batchData.start_date || "",
        end_date: batchData.end_date || "",
      });
      setIsEditModalOpen(true);
    } catch (error) {
      console.error("Error loading batch for edit:", error);
    }
  };

  // Submit edit form
  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/batches/update/${id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Batch updated successfully!");
      setIsEditModalOpen(false);
      fetchBatches();
    } catch (error) {
      console.error("Error updating batch:", error);
    }
  };

  // Delete batch
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this batch?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/batches/destroy/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Batch deleted successfully!");
      setBatches(batches.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting batch:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-[30px] mb-6 font-semibold font-nunito">
        All Batches
      </h1>
      {/* Branch Dropdown */}
      <div className="mb-6">
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          <option value="">Select Branch</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.course_id} {/* <-- yaha name dikhega */}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading batches...</p>
      ) : filteredBatches.length === 0 ? (
        <p>No batches available</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {filteredBatches.map((batch) => (
            <div
              key={batch.id}
              className="bg-white rounded-xl shadow-md p-6 w-[500px] flex flex-col justify-between"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {batch.batch_name}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  🎓 {batch.course?.course_name}
                </p>
                <p className="text-sm mt-4 text-gray-600 mb-2">
                  👥 Maximum Limit: {batch.student_limit}
                </p>
                <p className="text-sm mt-3 text-gray-600">
                  📅 Start Date {batch.start_date}
                </p>
                <p className="text-sm mt-3 text-gray-600">
                  📅 End Date {batch.end_date}
                </p>
              </div>

              <div className="flex justify-end gap-4 mt-auto">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleView(batch.id)}
                >
                  <FaEye size={18} />
                </button>
                <button
                  className="text-yellow-600 hover:text-yellow-800"
                  onClick={() => handleEdit(batch.id)}
                >
                  <FaEdit size={18} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(batch.id)}
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= VIEW MODAL ================= */}
      {isViewModalOpen && selectedBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[500px] relative">
            <button
              className="absolute top-2 right-3 text-gray-500 text-lg"
              onClick={() => setIsViewModalOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {selectedBatch.batch_name}
            </h2>
            <p>🎓 {selectedBatch.course?.course_name}</p>
            <p>👥 Limit: {selectedBatch.student_limit}</p>
            <p>📅 Start: {selectedBatch.start_date}</p>
            <p>📅 End: {selectedBatch.end_date}</p>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {isEditModalOpen && selectedBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[500px] relative">
            <button
              className="absolute top-2 right-3 text-gray-500 text-lg"
              onClick={() => setIsEditModalOpen(false)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Batch</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(selectedBatch.id);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Batch Name"
                value={editForm.batch_name}
                onChange={(e) =>
                  setEditForm({ ...editForm, batch_name: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Student Limit"
                value={editForm.student_limit}
                onChange={(e) =>
                  setEditForm({ ...editForm, student_limit: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="date"
                value={editForm.start_date}
                onChange={(e) =>
                  setEditForm({ ...editForm, start_date: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="date"
                value={editForm.end_date}
                onChange={(e) =>
                  setEditForm({ ...editForm, end_date: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
              >
                Update Batch
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Allbatch;
