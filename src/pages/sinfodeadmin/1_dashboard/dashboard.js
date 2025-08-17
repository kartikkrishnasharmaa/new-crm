import SAAdminLayout from "../../../layouts/Sinfodeadmin";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function Dashboard() {
  const workload = [
    { name: "Shawn Stone", role: "UI/UX Designer", img: "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png" },
    { name: "Randy Delgado", role: "UI/UX Designer", img: "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png" },
    { name: "Emily Tyler", role: "Copywriter", img: "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png" },
    { name: "Louis Castro", role: "Copywriter", img: "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png" },
    { name: "Blake Silva", role: "iOS Developer", img: "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png" },
    { name: "Joel Phillips", role: "UI/UX Designer", img: "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png" },
    { name: "Wayne Marsh", role: "Copywriter", img: "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png" },
    { name: "Oscar Holloway", role: "UI/UX Designer", img: "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png" },
  ];

  const events = [
    { title: "Presentation of the new department", time: "Today | 5:00 PM", up: true },
    { title: "Anna’s Birthday", time: "Today | 6:00 PM", down: true },
    { title: "Ray’s Birthday", time: "Tomorrow | 2:00 PM", down: true },
  ];

  const projects = [
  {
    name: "Data Structures & Algorithms",
    date: "Aug 1, 2025",
    priority: "High",
    allTasks: 40,
    activeTasks: 28,
    assignees: [
      "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png", 
      "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png"
    ],
  },
  {
    name: "Web Development (HTML, CSS, JS)",
    date: "Jul 20, 2025",
    priority: "Medium",
    allTasks: 35,
    activeTasks: 18,
    assignees: [
      "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png", 
      "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png"
    ],
  },
  {
    name: "Database Management Systems (DBMS)",
    date: "Jul 10, 2025",
    priority: "Low",
    allTasks: 25,
    activeTasks: 12,
    assignees: [
      "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png", 
      "https://sipl.ind.in/wp-content/uploads/2022/07/dummy-user.png"
    ],
  },
];


  const activity = [
    { name: "Oscar Holloway", role: "UI/UX Designer", action: "Updated the status of Mind Map task to In Progress" },
    { name: "Oscar Holloway", role: "UI/UX Designer", action: "Attached files to the task" },
    { name: "Emily Tyler", role: "Copywriter", action: "Updated the status of Mind Map task to In Progress" },
  ];

  return (
    <SAAdminLayout>
      <div className="p-6 bg-[#F4F9FD] min-h-screen">
        <p className="text-gray-500">Welcome Back,</p>
        <h1 className="text-[30px] mb-2 font-nunito">
            Dashboard
          </h1>
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
                  <div key={i} className="border rounded-lg p-3 flex flex-col items-center text-center hover:shadow">
                    <img src={person.img} alt={person.name} className="w-12 h-12 rounded-full mb-2" />
                    <p className="font-medium text-sm">{person.name}</p>
                    <p className="text-xs text-gray-500">{person.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg font-nunito">Courses</h2>
                <button className="text-blue-500 text-sm">View all</button>
              </div>
              <div className="space-y-4">
                {projects.map((p, i) => (
                  <div key={i} className="border rounded-lg p-4 hover:shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{p.name}</h3>
                        <p className="text-xs text-gray-500">Created {p.date}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${p.priority === "Low" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                        {p.priority}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-3 text-sm">
                      <p>All tasks: {p.allTasks}</p>
                      <p>Active tasks: {p.activeTasks}</p>
                      <div className="flex -space-x-2">
                        {p.assignees.map((a, j) => (
                          <img key={j} src={a} alt="assignee" className="w-8 h-8 rounded-full border" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            
            {/* Nearest Events */}
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg font-nunito">Nearest Events</h2>
                <button className="text-blue-500 text-sm">View all</button>
              </div>
              <ul className="space-y-6">
                {events.map((e, i) => (
                  <li key={i} className="flex justify-between items-center border-b pb-2 last:border-none">
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
              <h2 className="font-semibold text-lg font-nunito">Activity Stream</h2>
              <div className="space-y-14">
                {activity.map((a, i) => (
                  <div key={i} className="border space-y-4 rounded-lg p-3 hover:shadow">
                    <p className="text-sm font-nunito font-medium">{a.name} <span className="text-gray-500 text-xs">({a.role})</span></p>
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

// // src/pages/Dashboard.jsx
// import React, { useState, useEffect } from "react";
// import {
//   FaUserGraduate,
//   FaBook,
//   FaRupeeSign,
//   FaMoneyBillWave,
//   FaTasks,
//   FaUsers,
//   FaCalendarAlt,
//   FaClipboardList,
//   FaPlusCircle,
// } from "react-icons/fa";
// import { Line, Bar } from "react-chartjs-2";
// import SAAdminLayout from "../../../layouts/Sinfodeadmin"; // Assuming you have a layout component for the admin dashboard
// import BranchSelector from "../../../components/BranchSelector";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function Dashboard() {
//   const [timeRange, setTimeRange] = useState("daily");
//   const [branch, setBranch] = useState("All");
//   const [course, setCourse] = useState("All");
//   const [batch, setBatch] = useState("All");
//   const [stats, setStats] = useState({});

//   // Dummy Data Simulation
//   const fetchData = () => {
//     const dummy = {
//       daily: {
//         pendingFees: 25000,
//         upcomingBatches: 3,
//         activeLeads: 12,
//         pendingTasks: 5,
//         totalStudents: 120,
//         totalCourses: 8,
//         monthlyRevenue: 85000,
//         totalExpenses: 42000,
//       },
//       weekly: {
//         pendingFees: 150000,
//         upcomingBatches: 10,
//         activeLeads: 35,
//         pendingTasks: 18,
//         totalStudents: 120,
//         totalCourses: 8,
//         monthlyRevenue: 510000,
//         totalExpenses: 210000,
//       },
//       monthly: {
//         pendingFees: 400000,
//         upcomingBatches: 25,
//         activeLeads: 80,
//         pendingTasks: 40,
//         totalStudents: 120,
//         totalCourses: 8,
//         monthlyRevenue: 1500000,
//         totalExpenses: 720000,
//       },
//     };
//     setStats(dummy[timeRange]);
//   };

//   useEffect(() => {
//     fetchData();
//   }, [timeRange, branch, course, batch]);

//   const kpiCards = [
//     {
//       label: "Pending Fees",
//       value: `₹${stats.pendingFees || 0}`,
//       icon: <FaMoneyBillWave />,
//     },
//     {
//       label: "Upcoming Batches",
//       value: stats.upcomingBatches || 0,
//       icon: <FaCalendarAlt />,
//     },
//     { label: "Active Leads", value: stats.activeLeads || 0, icon: <FaUsers /> },
//     {
//       label: "Pending Tasks",
//       value: stats.pendingTasks || 0,
//       icon: <FaTasks />,
//     },
//     {
//       label: "Total Students",
//       value: stats.totalStudents || 0,
//       icon: <FaUserGraduate />,
//     },
//     {
//       label: "Total Courses",
//       value: stats.totalCourses || 0,
//       icon: <FaBook />,
//     },
//     {
//       label: "Monthly Revenue",
//       value: `₹${stats.monthlyRevenue || 0}`,
//       icon: <FaRupeeSign />,
//     },
//     {
//       label: "Total Expenses",
//       value: `₹${stats.totalExpenses || 0}`,
//       icon: <FaClipboardList />,
//     },
//   ];

//   const feeCollectionData = {
//     labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
//     datasets: [
//       {
//         label: "Fee Collection",
//         data: [20000, 40000, 30000, 50000],
//         borderColor: "rgba(75,192,192,1)",
//         backgroundColor: "rgba(75,192,192,0.2)",
//       },
//     ],
//   };

//   const leadConversionData = {
//     labels: ["Enquiries", "Leads", "Admissions"],
//     datasets: [
//       {
//         label: "Lead Conversion",
//         data: [50, 30, 20],
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//       },
//     ],
//   };

//   return (
//     <SAAdminLayout>
//       {" "}
//       <div className="p-6">
//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-6">
//           <div className="w-full">
//             <label className="text-sm text-gray-600 block mb-1 text-start">
//               Select Branch
//             </label>
//             <BranchSelector />
//           </div>
//           <select
//             className="border p-2"
//             value={course}
//             onChange={(e) => setCourse(e.target.value)}
//           >
//             <option>All Courses</option>
//             <option>Course A</option>
//             <option>Course B</option>
//           </select>
//           <select
//             className="border p-2"
//             value={batch}
//             onChange={(e) => setBatch(e.target.value)}
//           >
//             <option>All Batches</option>
//             <option>Batch 1</option>
//             <option>Batch 2</option>
//           </select>
//           <div className="ml-auto flex bg-gray-200 p-2 rounded-full gap-2">
//             {["daily", "weekly", "monthly"].map((range) => (
//               <button
//                 key={range}
//                 className={`px-6 py-3 text-lg font-medium transition-colors duration-200 ${
//                   timeRange === range
//                     ? "bg-blue-500 text-white rounded-full"
//                     : "bg-gray-200 hover:bg-gray-300 rounded-full"
//                 }`}
//                 onClick={() => setTimeRange(range)}
//               >
//                 {range.charAt(0).toUpperCase() + range.slice(1)}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* KPIs */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           {kpiCards.map((card, idx) => (
//             <div
//               key={idx}
//               className="bg-white p-4 rounded shadow flex items-center gap-4"
//             >
//               <div className="text-3xl text-blue-500">{card.icon}</div>
//               <div>
//                 <p className="text-sm text-gray-500">{card.label}</p>
//                 <h2 className="text-xl font-bold">{card.value}</h2>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Quick Actions */}
//         <div className="flex gap-4 mb-6">
//           <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2">
//             <FaPlusCircle /> Add Student
//           </button>
//           <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">
//             <FaPlusCircle /> Add Lead
//           </button>
//           <button className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center gap-2">
//             <FaPlusCircle /> Record Expense
//           </button>
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="font-bold mb-2">Fee Collection Trend</h3>
//             <Line data={feeCollectionData} />
//           </div>
//           <div className="bg-white p-4 rounded shadow">
//             <h3 className="font-bold mb-2">Lead Conversion</h3>
//             <Bar data={leadConversionData} />
//           </div>
//         </div>
//       </div>
//     </SAAdminLayout>
//   );
// }
