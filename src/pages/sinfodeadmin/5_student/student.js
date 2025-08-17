import SAAdminLayout from "../../../layouts/Sinfodeadmin";
import { useState, useEffect } from "react";
import axios from "../../../api/axiosConfig";
import Allstudents from "./allstudents";
import Idcard from "./idcard";

// -------------------- Add Student --------------------
function AddStudent() {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);
  const [guardianName, setGuardianName] = useState("");
  const [guardianContact, setGuardianContact] = useState("");
  // ✅ New fields required by backend
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [courseId, setCourseId] = useState("");
  const [batchStart, setBatchStart] = useState("");
  const [batchEnd, setBatchEnd] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [branchId, setBranchId] = useState("");
  const [batchId, setBatchId] = useState("");

  // Dropdown data
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [batches, setBatches] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch Courses
    axios
      .get("/courses/index", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCourses(res.data || []))
      .catch((err) => console.error("Error fetching courses:", err));

    // Fetch Branches
    axios
      .get("/branches", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Branches API Response:", res.data); // 👀 Debug
        setBranches(res.data || []); // 🔥 Directly use res.data
      })
      .catch((err) => console.error("Error fetching branches:", err));

    // Fetch Batches
    axios
      .get("/batches/show", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBatches(res.data || []))
      .catch((err) => console.error("Error fetching batches:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("contact_number", contactNumber);
      formData.append("email", email);
      formData.append("address", address);
      if (photo) formData.append("photo", photo);
      formData.append("guardian_name", guardianName);
      formData.append("guardian_contact", guardianContact);

      // ✅ Backend required fields
      formData.append("admission_number", admissionNumber);
      formData.append("course_id", courseId);
      formData.append("batch_id", batchId); // sending batch id
      formData.append("admission_date", admissionDate);
      formData.append("branch_id", branchId);
      // 👇 ye dono add karo
      formData.append("batch_start_time", batchStart);
      formData.append("batch_end_time", batchEnd);

      await axios.post("/students/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Student created successfully!");

      // Reset form
      setFullName("");
      setDob("");
      setGender("");
      setContactNumber("");
      setEmail("");
      setAddress("");
      setPhoto(null);
      setGuardianName("");
      setGuardianContact("");
      setAdmissionNumber("");
      setCourseId("");
      setBatchId("");
      setAdmissionDate("");
      setBranchId("");
    } catch (error) {
      console.error("Error creating student:", error.response?.data || error);
      alert("❌ Failed to create student");
    }
  };

  return (
    <div className="p-6 w-full bg-[#F4F9FD]">
      <h1 className="text-[30px] mb-4 font-semibold font-nunito">
        Add Student
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Date of Birth *
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender *</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Contact Number *
            </label>
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter contact number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Photo Upload
            </label>
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full border rounded-lg px-3 py-2"
              accept="image/*"
            />
          </div>
        </div>

        {/* Parent/Guardian */}
        <div className="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Parent/Guardian Name
            </label>
            <input
              type="text"
              value={guardianName}
              onChange={(e) => setGuardianName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter parent/guardian name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Parent/Guardian Contact
            </label>
            <input
              type="text"
              value={guardianContact}
              onChange={(e) => setGuardianContact(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter contact number"
            />
          </div>
        </div>

        {/* Admission Details */}
        <div className="bg-white shadow-md rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Admission Number *
            </label>
            <input
              type="text"
              value={admissionNumber}
              onChange={(e) => setAdmissionNumber(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter admission number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Admission Date *
            </label>
            <input
              type="date"
              value={admissionDate}
              onChange={(e) => setAdmissionDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Batch Start Time *
            </label>
            <input
              type="time"
              value={batchStart}
              onChange={(e) => setBatchStart(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Batch End Time *
            </label>
            <input
              type="time"
              value={batchEnd}
              onChange={(e) => setBatchEnd(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Course *
            </label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Batch *
            </label>
            <select
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.batch_name} ({batch.course?.course_name})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium">Select Branch</label>
            <select
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            >
              <option value="">-- Select Branch --</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.branch_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#3F8CFF] hover:bg-blue-700 text-white px-4 py-2 rounded-3xl"
          >
            ✨ Add Student
          </button>
        </div>
      </form>{" "}
    </div>
  );
}

// -------------------- Parent Component --------------------
export default function Student() {
  const [activeTab, setActiveTab] = useState("addStudent");

  return (
    <SAAdminLayout>
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-60 bg-white rounded-xl shadow-md p-4 space-y-3">
          <button
            onClick={() => setActiveTab("addStudent")}
            className={`block w-full text-left px-4 py-5 rounded-lg ${
              activeTab === "addStudent"
                ? "bg-blue-100 text-black"
                : "hover:bg-blue-100 text-black"
            }`}
          >
            ➕ Add Student
          </button>

          <button
            onClick={() => setActiveTab("studentList")}
            className={`block w-full text-left px-4 py-5 rounded-lg ${
              activeTab === "studentList"
                ? "bg-blue-100 text-black"
                : "hover:bg-blue-100 text-black"
            }`}
          >
            📋 All Students
          </button>
           <button
            onClick={() => setActiveTab("idCard")}
            className={`block w-full text-left px-4 py-5 rounded-lg ${
              activeTab === "idCard"
                ? "bg-blue-100 text-black"
                : "hover:bg-blue-100 text-black"
            }`}
          >
            📋 ID Card
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 rounded-lg p-6 overflow-y-auto">
          {activeTab === "addStudent" && <AddStudent />}
          {activeTab === "studentList" && <Allstudents />}
          {activeTab === "idCard" && <Idcard/>}
        </div>
      </div>
    </SAAdminLayout>
  );
}
