// Tracking main page
import { Search } from "lucide-react";
import React, { useState } from "react";
import trackingOrders from "../../../public/tracking.json";
import TrackingModal from "./TrackingModal";

export const Tracking = () => {
    // Delete row
    const handleDelete = (orderId) => {
      if (window.confirm('Are you sure you want to delete this tracking entry?')) {
        setUsers(users.filter((u) => u.orderId !== orderId));
      }
    };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(trackingOrders);
  const [searchTerm, setSearchTerm] = useState("");

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
    if (selectedUser) {
      // Update
      const updated = users.map((u) =>
        u.orderId === selectedUser.orderId ? { ...u, ...data } : u
      );
      setUsers(updated);
    } else {
      // Add New
      setUsers([...users, data]);
    }
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
              onChange={e => setSearchTerm(e.target.value)}
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
                {users.filter(user =>
                  searchTerm === "" ||
                  user.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.customer.toLowerCase().includes(searchTerm.toLowerCase())
                ).length > 0 ? (
                  users.filter(user =>
                    searchTerm === "" ||
                    user.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.customer.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((user, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-center">{user.orderId}</td>
                      <td className="px-6 py-4 text-center">{user.customer}</td>
                      <td className="px-6 py-4 text-center">{user.trackingNumber}</td>
                      <td className="px-6 py-4 text-center">{user.status}</td>
                      <td className="px-6 py-4 text-center">{user.date}</td>
                      <td className="px-6 py-4 flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleOpenModal(user)}
                          className="px-4 py-1 bg-[#FFBA07] text-white rounded-lg text-sm font-medium hover:bg-yellow-500"
                        >
                          Edit
                        </button>
                        <button
                          className="px-4 py-1 bg-[#DB0000] text-white rounded-lg text-sm font-medium hover:bg-[#B50000]"
                          onClick={() => handleDelete(user.orderId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No users found for this order.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
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
