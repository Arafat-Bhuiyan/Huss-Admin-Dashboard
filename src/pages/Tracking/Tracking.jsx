// Tracking main page
import { Search, ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { useGetOrderListQuery } from "../../redux/api/authApi";
import TrackingModal from "./TrackingModal";

export const Tracking = () => {
  const { data: orders = [], isLoading, isError } = useGetOrderListQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const handleDelete = (orderId) => {
    if (
      window.confirm("Are you sure you want to delete this tracking entry?")
    ) {
      // API call for delete would go here
      console.log("Delete order:", orderId);
    }
  };

  // Edit button
  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Add button
  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  // Save / Update from modal
  const handleSave = (data) => {
    // API call for save/update would go here
    console.log("Save/Update tracking data:", data);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2]">
      <div className="py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          {/* Search Bar */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#363636] h-12">
            <Search className="w-5 h-5 text-[#363636]" />
            <input
              type="text"
              placeholder="Search by Order ID or Name..."
              className="outline-none text-[#363636] placeholder-[#363636] w-96 bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Add Button */}
          <button
            className="w-80 h-12 p-2.5 bg-[#FFBA07] rounded-[10px] inline-flex justify-center items-center gap-2.5 hover:bg-yellow-500 transition"
            onClick={handleAdd}
          >
            <span className="text-white text-xl font-semibold leading-snug">
              + Add Tracking Number
            </span>
          </button>
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
                    Tracking Number
                  </th>
                  <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                    Date
                  </th>
                  <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6">
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFBA07]"></div>
                        <span className="ml-2 text-gray-500">
                          Loading tracking data...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-red-500">
                      Error loading tracking data.
                    </td>
                  </tr>
                ) : (
                  (() => {
                    const filteredOrders = orders.filter(
                      (order) =>
                        searchTerm === "" ||
                        order.order_id_display
                          ?.toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        order.customer_name
                          ?.toLowerCase()
                          .includes(searchTerm.toLowerCase()),
                    );

                    const totalPages = Math.ceil(
                      filteredOrders.length / ITEMS_PER_PAGE,
                    );
                    const paginatedOrders = filteredOrders.slice(
                      (activePage - 1) * ITEMS_PER_PAGE,
                      activePage * ITEMS_PER_PAGE,
                    );

                    return (
                      <>
                        {paginatedOrders.length > 0 ? (
                          paginatedOrders.map((order, idx) => (
                            <tr
                              key={order.id || idx}
                              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-6 py-4 text-center">
                                {order.order_id_display}
                              </td>
                              <td className="px-6 py-4 text-center">
                                {order.customer_name}
                              </td>
                              <td className="px-6 py-4 text-center">
                                {order.tracking_number || "N/A"}
                              </td>
                              <td
                                className={`px-6 py-4 text-center font-semibold capitalize ${
                                  order.status === "delivered"
                                    ? "text-[#22C55E]"
                                    : order.status === "pending"
                                      ? "text-[#EA580C]"
                                      : order.status === "shipped"
                                        ? "text-[#9333EA]"
                                        : "text-[#363636]"
                                }`}
                              >
                                {order.status}
                              </td>
                              <td className="px-6 py-4 text-center">
                                {order.created_at}
                              </td>
                              <td className="px-6 py-4 flex items-center justify-center gap-3">
                                <button
                                  onClick={() => handleOpenModal(order)}
                                  className="px-4 py-1 bg-[#FFBA07] text-white rounded-lg text-sm font-medium hover:bg-yellow-500"
                                >
                                  Edit
                                </button>
                                <button
                                  className="px-4 py-1 bg-[#DB0000] text-white rounded-lg text-sm font-medium hover:bg-[#B50000]"
                                  onClick={() => handleDelete(order.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="6"
                              className="text-center py-6 text-gray-500"
                            >
                              No tracking data found.
                            </td>
                          </tr>
                        )}
                        {/* Render pagination outside of tbody requires a different structure, let's keep it clean */}
                      </>
                    );
                  })()
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section */}
        {(() => {
          const filteredOrdersCount = orders.filter(
            (order) =>
              searchTerm === "" ||
              order.order_id_display
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              order.customer_name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()),
          ).length;

          const totalPages = Math.ceil(filteredOrdersCount / ITEMS_PER_PAGE);

          return filteredOrdersCount > 0 ? (
            <div className="flex justify-between mt-5">
              <p className="text-black font-medium text-xl">
                Showing {(activePage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                {Math.min(activePage * ITEMS_PER_PAGE, filteredOrdersCount)} of{" "}
                {filteredOrdersCount} tracking entries
              </p>
              <div>
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
                      setActivePage((prev) =>
                        prev < totalPages ? prev + 1 : prev,
                      )
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
          ) : null;
        })()}
      </div>

      <TrackingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSave={handleSave}
      />
    </div>
  );
};
