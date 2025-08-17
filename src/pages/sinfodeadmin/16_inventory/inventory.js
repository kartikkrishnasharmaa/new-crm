import React, { useState } from "react";
import SAAdminLayout from "../../../layouts/Sinfodeadmin";
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
  FaList,
  FaThLarge,
  FaTimes,
} from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi"; // 3 dots icon
export default function Course() {
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: "Laptop", category: "Electronics", quantity: 5, price: 55000 },
    { id: 2, name: "Chairs", category: "Furniture", quantity: 20, price: 1500 },
    { id: 3, name: "Electricity Bill", category: "Utilities", quantity: 1, price: 5000 },
    { id: 4, name: "Rent", category: "Office Expense", quantity: 1, price: 20000 },
    { id: 5, name: "Laptop", category: "Electronics", quantity: 3, price: 60000 },
  ]);
  const [openMenuId, setOpenMenuId] = useState(null); // har staff ka menu control karne ke liye

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });

  const totalQuantity = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = inventoryItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const monthlyExpenses = inventoryItems
    .filter(item => item.category.toLowerCase().includes("expense") || item.category.toLowerCase().includes("utilities"))
    .reduce((sum, item) => sum + item.price, 0);

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || !newItem.quantity || !newItem.price) {
      alert("Please fill all fields");
      return;
    }

    const id = inventoryItems.length ? inventoryItems[inventoryItems.length - 1].id + 1 : 1;
    setInventoryItems([...inventoryItems, { ...newItem, id, quantity: Number(newItem.quantity), price: Number(newItem.price) }]);
    setNewItem({ name: "", category: "", quantity: "", price: "" });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== id));
  };

  return (
    <SAAdminLayout>
      <div className="p-6">
        {/* Create Asset Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[30px] font-nunito">Assets List ({inventoryItems.length})</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#3F8CFF] hover:bg-blue-700 text-white px-4 py-2 rounded-3xl flex items-center gap-2"
          >
            + Create Asset
          </button>
        </div>
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-gray-500">Total Items</p>
            <h2 className="text-2xl font-bold">{inventoryItems.length}</h2>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-gray-500">Total Quantity</p>
            <h2 className="text-2xl font-bold">{totalQuantity}</h2>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-gray-500">Total Value (₹)</p>
            <h2 className="text-2xl font-bold">₹{totalValue.toLocaleString()}</h2>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-gray-500">Monthly Expenses</p>
            <h2 className="text-2xl font-bold">₹{monthlyExpenses.toLocaleString()}</h2>
          </div>
        </div>



        <div className="space-y-3">
  {inventoryItems.map((item, index) => (
    <div
      key={item.id}
      className="bg-white shadow-sm hover:shadow-md transition rounded-xl px-5 py-4 flex items-center"
    >
      {/* Left: Item Icon + Name */}
      <div className="flex items-center gap-4 flex-1">
        {/* Dummy Icon (replace with item image if available) */}
        <img
          src={
            item.image ||
            "https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
          }
          alt={item.name}
          className="w-12 h-12 rounded-lg object-cover border"
        />

        <div>
          <h3 className="font-semibold text-gray-800 text-lg">
            {item.name}
          </h3>
          <p className="text-gray-500 text-sm">{item.category}</p>
        </div>
      </div>

      {/* Middle: Extra Info */}
      <div className="hidden md:flex flex-col text-sm text-gray-600 text-center w-24">
        <span className="font-medium">Qty</span>
        <span>{item.quantity}</span>
      </div>

      <div className="hidden md:flex flex-col text-sm text-gray-600 text-center w-24">
        <span className="font-medium">Price</span>
        <span>₹{item.price}</span>
      </div>

      {/* Right: 3 dots action menu */}
      <div className="relative">
        <button
          onClick={() =>
            setOpenMenuId(openMenuId === item.id ? null : item.id)
          }
          className="menu-toggle p-2 hover:bg-gray-100 rounded-full"
        >
          <HiDotsVertical size={20} />
        </button>

        {openMenuId === item.id && (
          <div
            className="menu-container absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 py-2 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
            //   onClick={() => handleEdit(item)}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-blue-600"
            >
              <FaEdit size={16} /> Edit
            </button>

            <button
              onClick={() => handleDelete(item.id)}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
            >
              <FaTrash size={16} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  ))}
</div>


        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4">Create Asset</h2>
              <input
                type="text"
                placeholder="Item Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="text"
                placeholder="Category"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                className="w-full border p-2 mb-3 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="w-full border p-2 mb-3 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItem}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SAAdminLayout>
  );
}