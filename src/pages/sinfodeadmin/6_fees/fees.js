import SAAdminLayout from "../../../layouts/Sinfodeadmin";
import { useState } from "react";
import Dashboard from "./dashboard";
import FeesStructure from "./structure";
import Collection from "./collection";

export default function Fees() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <SAAdminLayout>
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-60 bg-white rounded-xl shadow-md p-4 space-y-3">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`block w-full text-left px-4 py-5 rounded-lg ${
              activeTab === "dashboard"
                ? "bg-blue-100 text-black"
                : "hover:bg-blue-100 text-black"
            }`}
          >
            📋 Dashboard
          </button>
          <button
            onClick={() => setActiveTab("fees")}
            className={`block w-full text-left px-4 py-5 rounded-lg ${
              activeTab === "fees"
                ? "bg-blue-100 text-black"
                : "hover:bg-blue-100 text-black"
            }`}
          >
            💰 Fees Structure
          </button>
           <button
            onClick={() => setActiveTab("collection")}
            className={`block w-full text-left px-4 py-5 rounded-lg ${
              activeTab === "collection"
                ? "bg-blue-100 text-black"
                : "hover:bg-blue-100 text-black"
            }`}
          >
            💰 Fees Collection
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 rounded-lg p-6 overflow-y-auto">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "fees" && <FeesStructure />}
          {activeTab === "collection" && <Collection />}
        </div>
      </div>
    </SAAdminLayout>
  );
}
