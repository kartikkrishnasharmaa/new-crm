import { useState, useEffect } from "react";
import axios from "../../../api/axiosConfig";

function AllCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("No token found! Please login again.");
          return;
        }

        const res = await axios.get("/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex mt-10">
      <div className="shadow-lg rounded-2xl p-8 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">All Categories</h2>

        {loading ? (
          <p className="text-center">⏳ Loading...</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Branch ID</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{cat.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{cat.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{cat.branch_id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(cat.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AllCategory;
