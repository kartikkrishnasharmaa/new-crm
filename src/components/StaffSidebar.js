import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaTachometerAlt,
  FaTools,
  FaChevronDown,
  FaChevronUp,
  FaGift,
  FaUsers,
  FaWallet,
  FaUserTie,
  FaMoneyBillWave,
  FaHome,
  FaReceipt,
  FaFileAlt,
  FaUserFriends,
  FaLayerGroup,
} from "react-icons/fa";

const StaffSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);

  const toggleSubCategory = (category) => {
    setOpenMenu(openMenu === category ? null : category);
  };

  const handleNavigation = (link, e) => {
    if (!link || link === "/") {
      e.preventDefault();
      alert("This page is under construction and will be available soon!");
      return;
    }
    toggleSidebar();
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      link: selectedBranch
        ? `/staff/dashboard?branchId=${selectedBranch}`
        : "/staff/dashboard",
    },
    // {
    //   name: "Branch Management",
    //   icon: <FaHome />,
    //    subMenu: [
    //     { name: "All Branch", link: "/staff/branch" },
    //   ],
    // },
    // {
    //   name:"Staff Management",
    //   icon: <FaUsers />,
    //   subMenu:[
    //     {name:"All Staff" ,link:"/staff/staff"},
    //   ]
    // },
    // {
    //   name: "Student Management",
    //   icon: <FaUsers />,
    //   subMenu: [
    //     { name: "All Student", link: "/staff/students" },
    //     { name: "Admission Process", link: "/staff/student-management/admission" },
    //     { name:"ID Card", link: "/staff/student-management/id-card" },
    //   ],
    // },
    // {
    //   name: "Courses & Batches",
    //   icon: <FaLayerGroup />,
    //    subMenu: [
    //     { name: "Courses", link: "/staff/courses" },
    //     { name: "Batches", link: "/staff/student-management/admission" },
    //     { name:"Assign Student", link: "/staff/student-management/id-card" },
    //   ],    },
    // {
    //   name: "Fee Management",
    //   icon: <FaMoneyBillWave />,
    //   link: "/staff/fees",
    // },
    // {
    //   name: "Attendance",
    //   icon: <FaUserFriends />,
    //   link: "/staff/attendance",
    // },
    // {
    //   name: "Lead Management",
    //   icon: <FaUserTie />,
    //   link: "/staff/leads",
    // },
    // {
    //   name: "Expense Management",
    //   icon: <FaReceipt />,
    //   link: "/staff/expenses",
    // },
    // {
    //   name: "Salary Management",
    //   icon: <FaWallet />,
    //   link: "/staff/salary",
    // },
    // {
    //   name: "Invoice Management",
    //   icon: <FaFileAlt />,
    //   link: "/staff/invoice",
    // },
    // {
    //   name: "Access Management",
    //   icon: <FaWallet />,
    //   link: "/staff/access",
    // },
    // {
    //   name: "Campaigns",
    //   icon: <FaGift />,
    //   link: "/staff/campaign",
    // },
    // {
    //   name: "Reports & Analytics",
    //   icon: <FaFileAlt />,
    //   subMenu: [
    //     { name: "Fee Report", link: "/staff/reports" },
    //     {
    //       name: "Attendance Report",
    //       link: "/staff/reports-analytics/attendance",
    //     },
    //   ],
    // },
    {
      name: "Settings",
      icon: <FaTools />,
      link: "/staff/settings",
    },
  ];

  return (
    <aside
      className={`fixed bg-white inset-y-0 text-black left-0 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out w-80 p-4 z-30 shadow-lg md:relative overflow-y-auto max-h-screen`}
    >
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.subMenu ? (
                <>
                  <div
                    className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-300 rounded-lg"
                    onClick={() => toggleSubCategory(item.name)}
                  >
                    <div className="flex items-center gap-4">
                      {item.icon}
                      <span className="text-lg font-medium">{item.name}</span>
                    </div>
                    {openMenu === item.name ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </div>
                  {openMenu === item.name && (
                    <ul className="pl-8 space-y-2">
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={subItem.link || "#"}
                            className={({ isActive }) =>
                              `flex items-center mt-3 gap-4 py-2 px-4 rounded-lg transition-all duration-200 ease-in-out ${
                                isActive
                                  ? "bg-gray-300 text-white shadow-lg"
                                  : subItem.link && subItem.link !== "/"
                                  ? "hover:bg-gray-300 hover:text-black"
                                  : "opacity-50 cursor-not-allowed"
                              }`
                            }
                            onClick={(e) => handleNavigation(subItem.link, e)}
                          >
                            <span className="text-sm font-medium">
                              {subItem.name}
                            </span>
                            {(!subItem.link || subItem.link === "/") && (
                              <span className="text-xs ml-auto bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                Coming Soon
                              </span>
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.link || "#"}
                  className={({ isActive }) =>
                    `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${
                      isActive
                        ? "bg-gray-600 border-1 border-white text-white shadow-2xl"
                        : item.link && item.link !== "/"
                        ? "hover:bg-gray-800 hover:text-white"
                        : "opacity-50 cursor-not-allowed"
                    }`
                  }
                  onClick={(e) => handleNavigation(item.link, e)}
                >
                  {item.icon}
                  <span className="text-lg font-medium">{item.name}</span>
                  {(!item.link || item.link === "/") && (
                    <span className="text-xs ml-auto bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default StaffSidebar;
