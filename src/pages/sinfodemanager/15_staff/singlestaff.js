import SAManagerLayout from "../../../layouts/Sinfodemanager"; // Assuming you have a layout component for the admin dashboard
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../api/axiosConfig";

export default function StaffDetail() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStaffDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/staff/show/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaff(res.data);
    } catch (error) {
      console.error("Error fetching staff details:", error);
      alert("Failed to load staff details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffDetails();
  }, [id]);

  if (loading) {
    return (
      <SAManagerLayout>
        <div className="p-6">Loading staff details...</div>
      </SAManagerLayout>
    );
  }

  if (!staff) {
    return (
      <SAManagerLayout>
        <div className="p-6 text-red-500">No staff found</div>
      </SAManagerLayout>
    );
  }

  return (
    <SAManagerLayout>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-4 bg-white shadow rounded-xl p-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl font-bold">
            {staff.employee_name?.charAt(0) || "?"}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{staff.employee_name}</h2>
              <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
                {staff.employee_code}
              </span>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  staff.attendance_status === "Present"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {staff.attendance_status}
              </span>
            </div>
            <p className="text-gray-500">{staff.designation}</p>
            <p className="text-sm text-gray-400">{staff.department}</p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <p className="flex items-center gap-2 text-gray-700">
              📧 {staff.email}
            </p>
            <p className="flex items-center gap-2 text-gray-700 mt-2">
              📞 {staff.contact_number}
            </p>
          </div>

          {/* Employment Details */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Employment Details</h3>
            <p className="flex items-center gap-2 text-gray-700">
              📅 {staff.joining_date}
            </p>
            <p className="flex items-center gap-2 text-gray-700 mt-2">
              🏢 Branch ID: {staff.branch_id}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-3 rounded-lg shadow">
            View Attendance
          </button>
          <button className="bg-green-50 hover:bg-green-100 text-green-600 font-medium py-3 rounded-lg shadow">
            View Payroll
          </button>
          <button className="bg-orange-50 hover:bg-orange-100 text-orange-600 font-medium py-3 rounded-lg shadow">
            View Leaves
          </button>
          <button className="bg-purple-50 hover:bg-purple-100 text-purple-600 font-medium py-3 rounded-lg shadow">
            Generate Report
          </button>
        </div>
      </div>
    </SAManagerLayout>
  );
}
