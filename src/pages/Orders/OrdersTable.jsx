"use client";

import { ChevronDown, Search, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useGetOrderListQuery } from "../../Redux/api/authApi";

export default function OrdersTable({ onViewDetails }) {
  // Fetch orders from API
  const { data: orders = [], isLoading, error } = useGetOrderListQuery();

  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);
  const statuses = ["Status", "Shipped", "Pending", "Delivered"];
  const ORDERS_PER_PAGE = 10;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
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
      order.status?.toLowerCase() === selectedStatus.toLowerCase();

    // 🔹 Search by Order ID Display
    const matchesSearch =
      searchTerm === "" ||
      order.order_id_display
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase().trim());

    return matchesStatus && matchesSearch;
  });

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (activePage - 1) * ORDERS_PER_PAGE,
    activePage * ORDERS_PER_PAGE,
  );

  return (
    <div className="py-8">
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
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-lg font-medium">Loading orders...</div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <div className="text-lg font-medium">Error loading orders</div>
            <div className="text-sm mt-2">
              {error?.data?.message || "Please try again later"}
            </div>
          </div>
        ) : (
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
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-center text-base font-medium text-[#363636] ">
                        {order.order_id_display}
                      </td>
                      <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                        {order.customer_name}
                      </td>
                      <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                        {order.items?.[0]?.product_name || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                        {order.created_at}
                      </td>
                      <td className="px-6 py-4 text-center text-base font-medium text-[#363636]">
                        ${parseFloat(order.total_amount).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            order.status,
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
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {filteredOrders.length > 0 && (
        <div className="flex justify-between mt-5">
          <p className="text-black font-medium text-xl">
            Showing{" "}
            {filteredOrders.length === 0
              ? 0
              : (activePage - 1) * ORDERS_PER_PAGE + 1}{" "}
            to {Math.min(activePage * ORDERS_PER_PAGE, filteredOrders.length)}{" "}
            of {filteredOrders.length} orders
          </p>
          <div>
            {/* Interactive Pagination */}
            <div className="flex items-center" style={{ gap: "10px" }}>
              {/* Left Arrow */}
              <button
                className="py-[6px] px-[7px] border border-black rounded-md"
                style={{ display: "flex", alignItems: "center" }}
                aria-label="Previous Page"
                onClick={() =>
                  setActivePage((prev) => (prev > 1 ? prev - 1 : prev))
                }
                disabled={activePage === 1}
              >
                <ChevronLeft size={16} />
              </button>
              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`py-[2px] px-[8px] border border-black rounded-md font-semibold ${
                      activePage === page
                        ? "bg-[#343F4F] text-white"
                        : "text-black"
                    }`}
                    style={{ minWidth: "32px" }}
                    onClick={() => setActivePage(page)}
                  >
                    {page}
                  </button>
                ),
              )}
              {/* Right Arrow */}
              <button
                className="py-[6px] px-[7px] border border-black rounded-md"
                style={{ display: "flex", alignItems: "center" }}
                aria-label="Next Page"
                onClick={() =>
                  setActivePage((prev) => (prev < totalPages ? prev + 1 : prev))
                }
                disabled={activePage === totalPages || totalPages === 0}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 4l4 4-4 4"
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
