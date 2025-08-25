import { useEffect, useState } from "react";
import axios from "../../../api/axiosConfig";
import SAAdminLayout from "../../../layouts/Sinfodeadmin";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);

  // ✅ Courses API fetch
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/courses/index", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data || [];
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const workload = [
    {
      name: "Shawn Stone",
      role: "UI/UX Designer",
      img: "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png",
    },
    {
      name: "Randy Delgado",
      role: "UI/UX Designer",
      img: "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png",
    },
    {
      name: "Emily Tyler",
      role: "Copywriter",
      img: "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png",
    },
    {
      name: "Louis Castro",
      role: "Copywriter",
      img: "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png",
    },
  ];

  const events = [
    {
      title: "Presentation of the new department",
      time: "Today | 5:00 PM",
      up: true,
    },
    { title: "Anna’s Birthday", time: "Today | 6:00 PM", down: true },
    { title: "Ray’s Birthday", time: "Tomorrow | 2:00 PM", down: true },
  ];

  const activity = [
    {
      name: "Oscar Holloway",
      role: "UI/UX Designer",
      action: "Updated the status of Mind Map task to In Progress",
    },
    {
      name: "Oscar Holloway",
      role: "UI/UX Designer",
      action: "Attached files to the task",
    },
    {
      name: "Emily Tyler",
      role: "Copywriter",
      action: "Updated the status of Mind Map task to In Progress",
    },
  ];

  return (
    <SAAdminLayout>
      <div className="p-6 bg-[#F4F9FD] min-h-screen">
        <p className="text-gray-500">Welcome Back,</p>
        <h1 className="text-[30px] mb-2 font-nunito">Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Workload */}
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg font-nunito">Workload</h2>
                <button className="text-blue-500 text-sm">View all</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {workload.map((person, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-3 flex flex-col items-center text-center hover:shadow"
                  >
                    <img
                      src={person.img}
                      alt={person.name}
                      className="w-12 h-12 rounded-full mb-2"
                    />
                    <p className="font-medium text-sm">{person.name}</p>
                    <p className="text-xs text-gray-500">{person.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Courses (from API) */}
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg font-nunito">Courses</h2>
                <button className="text-blue-500 text-sm">
                  <a href="/sinfodeadmin/courses">View all</a>
                </button>
              </div>
              <div className="space-y-4">
                {courses.length > 0 ? (
                  courses.map((c, i) => (
                    <div key={i} className="border rounded-lg p-4 hover:shadow">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{c.course_name}</h3>
                          Trainer: {c.trainer?.employee_name || "N/A"}
                        </div>
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                          {c.course_level || "General"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3 text-sm">
                        <p>Duration: {c.duration || "N/A"}</p>
                        <p>
                        Students Enrolled:{" "}
                        <span className="font-semibold">
                          {c.students?.length || 0}
                        </span>
                      </p>
                        <p>Fee: ₹{c.actual_price || "0"}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No courses available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Nearest Events */}
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg font-nunito">
                  Nearest Events
                </h2>
                <button className="text-blue-500 text-sm">View all</button>
              </div>
              <ul className="space-y-6">
                {events.map((e, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center border-b pb-2 last:border-none"
                  >
                    <div className="space-y-6">
                      <p className="font-medium text-sm">{e.title}</p>
                      <p className="text-xs text-gray-500">{e.time}</p>
                    </div>
                    {e.up && <FaArrowUp className="text-green-500" />}
                    {e.down && <FaArrowDown className="text-red-500" />}
                  </li>
                ))}
              </ul>
            </div>

            {/* Activity Stream */}
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="font-semibold text-lg font-nunito">
                Activity Stream
              </h2>
              <div className="space-y-14">
                {activity.map((a, i) => (
                  <div
                    key={i}
                    className="border space-y-4 rounded-lg p-3 hover:shadow"
                  >
                    <p className="text-sm font-nunito font-medium">
                      {a.name}{" "}
                      <span className="text-gray-500 text-xs">({a.role})</span>
                    </p>
                    <p className="text-xs text-gray-500">{a.action}</p>
                  </div>
                ))}
              </div>
              <button className="mt-3 text-blue-500 text-sm">View more</button>
            </div>
          </div>
        </div>
      </div>
    </SAAdminLayout>
  );
}
