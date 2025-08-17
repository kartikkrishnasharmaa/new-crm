import React, { useState, useEffect } from "react";
import axios from "../../../api/axiosConfig";

function StudentIDCardGenerator() {
  const [branches, setBranches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  // 🔹 Fetch Branches
  const fetchBranches = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/branches", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const branchData = res.data.map((branch) => ({
        id: branch.id,
        name: branch.branch_name,
      }));

      setBranches(branchData);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  // 🔹 Fetch Courses based on Branch
  const fetchCourses = async (branchId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/courses/index?branch_id=${branchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // 🔹 Fetch Students based on Branch + Course
  const fetchStudents = async (branchId, courseId) => {
    try {
      const token = localStorage.getItem("token");

      // ✅ Agar backend filter support karta hai
      const res = await axios.get(
        `/students/show?branch_id=${branchId}&course_id=${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      let data = res.data || [];

      // ✅ Agar backend filter support nahi karta, to frontend pe filter
      if (
        !res.data.some(
          (s) =>
            s.branch_id === parseInt(branchId) &&
            s.course_id === parseInt(courseId)
        )
      ) {
        data = data.filter(
          (s) =>
            s.branch_id === parseInt(branchId) &&
            s.course_id === parseInt(courseId)
        );
      }

      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // 🔹 On Mount
  useEffect(() => {
    fetchBranches();
  }, []);

  // 🔹 Handlers
  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);
    setSelectedCourse("");
    setCourses([]);
    setStudents([]);
    if (branchId) fetchCourses(branchId);
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    setStudents([]);
    if (courseId && selectedBranch) fetchStudents(selectedBranch, courseId);
  };

  // 🔹 Generate ID Card
  const handleGenerateIDCard = (student) => {
    // Yaha aap PDF generate kar sakte ho ya backend API hit kar sakte ho
    alert(`Generate ID Card for: ${student.full_name} (ID: ${student.id})`);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Student ID Card Generator</h2>

      {/* Branch Dropdown */}
      <select
        value={selectedBranch}
        onChange={handleBranchChange}
        className="border p-2 m-2"
      >
        <option value="">-- Select Branch --</option>
        {branches.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      {/* Course Dropdown */}
      <select
        value={selectedCourse}
        onChange={handleCourseChange}
        className="border p-2 m-2"
      >
        <option value="">-- Select Course --</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.course_name}
          </option>
        ))}
      </select>

      {/* Student List */}
      {students.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Students List</h3>
          <table className="border w-full mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Course</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td className="p-2 border">{s.full_name}</td>
                  <td className="p-2 border">{s.email}</td>
                  <td className="p-2 border">{s.course_name}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleGenerateIDCard(s)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Generate ID Card
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentIDCardGenerator;
