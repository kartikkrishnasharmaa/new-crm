import { useState, useEffect } from "react";
import axios from "../../../api/axiosConfig";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function Allbatch() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all batches
  const fetchBatches = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/batches/show", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBatches(res.data || []);
    } catch (error) {
      console.error("Error fetching batches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // Action handler (view/edit/delete)
  const handleAction = (id, action) => {
    if (action === "view") {
      alert(`View Batch ID: ${id}`);
    } else if (action === "edit") {
      alert(`Edit Batch ID: ${id}`);
    } else if (action === "delete") {
      alert(`Delete Batch ID: ${id}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-[30px] mb-6 font-semibold font-nunito">
        All Batches
      </h1>

      {loading ? (
        <p>Loading batches...</p>
      ) : batches.length === 0 ? (
        <p>No batches available</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {batches.map((batch) => (
            <div
              key={batch.id}
              className="bg-white rounded-xl shadow-md p-6 w-[500px] flex flex-col justify-between"
            >
              <div className="mb-4">
                {/* Batch Name */}
                <h2 className="text-xl space-y-5 font-semibold mb-2 text-gray-800">
                  {batch.batch_name}
                </h2>
                {/* Course Name from nested object */}
                <p className="text-sm text-gray-600 mb-2">
                  🎓 {batch.course?.course_name}
                </p>
                {/* Student Limit */}
                <p className="text-sm mt-4 text-gray-600 mb-2">
                  👥 Maximum Limit: {batch.student_limit}
                </p>
                {/* Dates */}
                <p className="text-sm mt-3 text-gray-600">
                  📅 Start Date {batch.start_date}
                </p>
                <p className="text-sm mt-3 text-gray-600">
                  📅 End Date {batch.end_date}
                </p>{" "}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-auto">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleAction(batch.id, "view")}
                >
                  <FaEye size={18} />
                </button>
                <button
                  className="text-yellow-600 hover:text-yellow-800"
                  onClick={() => handleAction(batch.id, "edit")}
                >
                  <FaEdit size={18} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleAction(batch.id, "delete")}
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Allbatch;
