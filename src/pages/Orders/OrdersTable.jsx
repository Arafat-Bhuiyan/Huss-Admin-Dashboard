"use client";

import { ChevronDown, Search } from "lucide-react";
import orders from "../../../public/orders.json";
import { useState } from "react";

export default function OrdersTable({ onViewDetails }) {
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const statuses = ["Status", "Shipped", "Pending", "Delivered"];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "shipped":
        return "bg-[#8B5CF6] text-white";
      case "pending":
        return "bg-[#F59E0B] text-white";
      case "delivered":
        return "bg-[#22C55E] text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ✅ Filter Logic (Search + Status)
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatus === "Status" ||
      order.status.toLowerCase() === selectedStatus.toLowerCase();

    // 🔹 Only check orderId against searchTerm
    const matchesSearch =
      searchTerm === "" ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase().trim());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#363636] mb-2">
          Dashboard
        </h1>
        <p className="text-xl font-normal text-[#363636]">
          Welcome back, Alex! Here's what's happening with your store today.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex justify-between items-center mb-5 gap-4">
        {/* Filter Selection - Left Side */}
        <div className="relative">
          {/* Filter Button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-48 h-10 pl-4 pr-3 py-2.5 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-[#BEBBBB] inline-flex justify-between items-center gap-2.5"
          >
            <span className="text-neutral-700 text-sm font-semibold leading-snug">
              {selectedStatus === "Status"
                ? "Filter by Status"
                : `Filter by ${selectedStatus}`}
            </span>
            <ChevronDown
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-md outline outline-1 outline-[#BEBBBB] z-50">
              {statuses.map((status) => (
                <div
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 text-sm text-neutral-700 cursor-pointer hover:bg-gray-100 ${
                    selectedStatus === status ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {status}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search - Right Side */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none text-gray-700 placeholder-gray-400 w-48"
          />
        </div>
      </div>

      {/* Order List Title */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-[#363636]">Order List</h2>
        <a
          href="#"
          className="text-[#FFBA07] font-semibold hover:text-yellow-600 text-sm underline"
        >
          See All
        </a>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Order ID
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Customer
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Product
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Date
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Amount
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-center text-base font-medium text-[#363636] ">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 text-center text-base font-medium text-[#363636]">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex items-center justify-center">
                      <button
                        onClick={() => onViewDetails(order)}
                        className="px-4 py-1 bg-[#FFBA07] text-white rounded-lg text-sm font-medium hover:bg-yellow-500 transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No orders found for this Order ID.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
