import { useState, useEffect } from "react";
import axios from "../../../api/axiosConfig";

function Batch() {
  const [formData, setFormData] = useState({
    batch_name: "",   // backend expects batch_name
    course_id: "",    // backend expects course_id
    start_date: "",
    end_date: "",
    student_limit: "",
  });
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/courses/index", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post("/batches/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Batch created successfully!");
      setFormData({
        batch_name: "",
        course_id: "",
        start_date: "",
        end_date: "",
        student_limit: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error creating batch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-[30px] mb-6 font-semibold font-nunito">
        Batch Management
      </h1>

      <div className="max-w-xl w-[500px] bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
  
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Batch Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Batch Name
            </label>
            <input
              type="text"
              name="batch_name"
              value={formData.batch_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
            />
          </div>

          {/* Course Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Course
            </label>
            {courses.length === 0 ? (
              <p className="text-gray-500 text-sm">No courses available</p>
            ) : (
              <select
                name="course_id"
                value={formData.course_id}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
              >
                <option value="">-- Select Course --</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.course_name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Start Date
            </label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              End Date
            </label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
            />
          </div>

          {/* Student Limit */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Student Limit
            </label>
            <input
              type="number"
              name="student_limit"
              value={formData.student_limit}
              onChange={handleChange}
              required
              min="1"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 p-2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Create Batch"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Batch;
