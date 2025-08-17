import SAAdminLayout from "../../../layouts/Sinfodeadmin";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../api/axiosConfig";

export default function StaffDetail() {
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");

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
      <SAAdminLayout>
        <div className="p-6">Loading staff details...</div>
      </SAAdminLayout>
    );
  }

  if (!staff) {
    return (
      <SAAdminLayout>
        <div className="p-6 text-red-500">No staff found</div>
      </SAAdminLayout>
    );
  }

  return (
    <SAAdminLayout>
      <div className="p-6 flex flex-col lg:flex-row gap-6">
        {/* Left Profile Section */}
        <div className="w-[250px] bg-white shadow-md rounded-xl p-4">
          {/* Profile Image + Name */}
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
              {staff.employee_name?.charAt(0) || "?"}
            </div>
            <h2 className="mt-3 text-xl font-semibold">
              {staff.employee_name}
            </h2>
            <p className="text-gray-500">{staff.designation}</p>
            <span className="mt-2 bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
              {staff.employee_code}
            </span>
          </div>

          {/* Main Info */}
          <div>
            <h3 className="text-sm mt-7 font-semibold text-gray-700 mb-2">
              Main Info
            </h3>
            <div className="space-y-4 text-sm text-gray-600">
              <p>🏢 Department : {staff.department || "Department"}</p>
              <p>📍 {staff.branch_id || "Branch"}</p>
              <p>📅 {staff.joining_date || "Joining Date"}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm mt-7 font-semibold text-gray-700 mb-2">
              Contact Info
            </h3>
            <div className="space-y-4 text-sm text-gray-600">
              <p>📧 {staff.email}</p>
              <p>📞 {staff.contact_number}</p>
            </div>
          </div>
        </div>

        {/* Right Content Section */}
        <div className="flex-1 bg-white shadow-md rounded-xl p-6">
          {/* Tabs */}
          <div className="flex gap-4 mb-4 border-b">
            {["projects", "team", "vacations"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 px-3 font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {activeTab === "projects" && (
              <>
                {/* Example Project Card */}
                <div className="bg-white shadow rounded-xl p-5 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Internal Project</h4>
                    <p className="text-sm text-gray-500">
                      Created on May 28, 2020
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-700">Tasks: 23</p>
                    <p className="text-sm text-gray-400">Active: 20</p>
                  </div>
                </div>
                <div className="bg-white shadow rounded-xl p-5 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Food Delivery Service</h4>
                    <p className="text-sm text-gray-500">
                      Created on Sep 10, 2020
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-700">Tasks: 50</p>
                    <p className="text-sm text-gray-400">Active: 24</p>
                  </div>
                </div>
              </>
            )}

            {activeTab === "team" && (
              <div className="bg-white shadow rounded-xl p-6">
                <p className="text-gray-600">Team details will go here...</p>
              </div>
            )}

            {activeTab === "vacations" && (
              <div className="bg-white shadow rounded-xl p-6">
                <p className="text-gray-600">
                  Vacation records will go here...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SAAdminLayout>
  );
}
