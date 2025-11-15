"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import orders from "../../../public/wishlistOrders.json";

export default function WishlistOrdersTable() {
  const [orderList, setOrderList] = useState(orders);
  const navigate = useNavigate();

  const handleDelete = (orderIdToDelete) => {
    if (window.confirm(`Are you sure you want to delete order ID "${orderIdToDelete}"?`)) {
      setOrderList((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== orderIdToDelete)
      );
    }
  };

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
                  Total user
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orderList.length > 0 ? (
                orderList.map((order) => (
                  <tr
                    key={order.orderId}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-center text-base font-medium text-[#363636] ">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                      {order.totalUsers}
                    </td>
                    <td className="px-6 py-4 text-sm flex items-center justify-center gap-3">
                      <button
                        className="px-4 py-1 bg-[#FFBA07] text-white rounded-lg text-sm font-medium hover:bg-yellow-500 transition-colors"
                        onClick={() => navigate(`/wishlistUserListTable/${order.orderId}`)}
                      >
                        View
                      </button>
                      <button
                        className="px-4 py-1 bg-[#DB0000] text-white rounded-lg text-sm font-medium hover:bg-[#B50000] transition-colors"
                        onClick={() => handleDelete(order.orderId)}
                      >
                        Delete
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
      </div>
    </div>
  );
}
