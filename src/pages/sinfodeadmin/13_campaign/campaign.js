import SAAdminLayout from "../../../layouts/Sinfodeadmin";
import AllCoupans from "./allcoupan";
import { useState } from "react";
function AddCoupan(){
  const [couponCode, setCouponCode] = useState("");
  const [discountType, setDiscountType] = useState("Percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validUntil, setValidUntil] = useState("");

  return (
    <div className="items-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Create New Coupon
        </h1>

        {/* Coupon Code */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Coupon Code
          </label>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="DISCOUNT2024"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Discount Type and Value */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Discount Type
            </label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="Percentage">Percentage</option>
              <option value="Fixed">Fixed Amount</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Discount Value
            </label>
            <input
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder="10"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Date fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Valid From
            </label>
            <input
              type="date"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Valid Until
            </label>
            <input
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-700 transition duration-200">
          Create Coupon
        </button>
      </div>
    </div>
  );
}

export default function Campaign() {
    const [activeTab, setActiveTab] = useState("addStudent");
  
  return (
    <SAAdminLayout>
      <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-60 bg-white rounded-xl shadow-md p-4 space-y-3">
              <button
                onClick={() => setActiveTab("addCoupan")}
                className={`block w-full text-left px-4 py-5 rounded-lg ${
                  activeTab === "addCoupan"
                    ? "bg-blue-100 text-black"
                    : "hover:bg-blue-100 text-black"
                }`}
              >
                ➕ Add Coupan
              </button>
    
              <button
                onClick={() => setActiveTab("coupanList")}
                className={`block w-full text-left px-4 py-5 rounded-lg ${
                  activeTab === "coupanList"
                    ? "bg-blue-100 text-black"
                    : "hover:bg-blue-100 text-black"
                }`}
              >
                📋 All Coupans
              </button>
               
            </div>
    
            {/* Content */}
            <div className="flex-1 rounded-lg p-6 overflow-y-auto">
              {activeTab === "addCoupan" && <AddCoupan />}
              {activeTab === "coupanList" && <AllCoupans />}
            </div>
          </div>
    </SAAdminLayout>
  );
}
