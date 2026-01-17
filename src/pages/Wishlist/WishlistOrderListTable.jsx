"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetWishlistQuery } from "../../redux/api/authApi";

export default function WishlistOrdersTable() {
  const { data: wishlistData = [], isLoading } = useGetWishlistQuery();
  const navigate = useNavigate();

  const handleDelete = (orderIdToDelete) => {
    if (
      window.confirm(
        `Are you sure you want to delete product ID "${orderIdToDelete}"?`,
      )
    ) {
      // Logic for product deletion via API would go here
      console.log("Deleting product:", orderIdToDelete);
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
                  Product ID
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Product Name
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
              {isLoading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    Loading wishlist...
                  </td>
                </tr>
              ) : wishlistData.length > 0 ? (
                wishlistData.map((item) => (
                  <tr
                    key={item.prod_id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-center text-base font-medium text-[#363636] ">
                      {item.prod_id}
                    </td>
                    <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                      {item.product_name}
                    </td>
                    <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                      {item.wishlist_user_count}
                    </td>
                    <td className="px-6 py-4 text-sm flex items-center justify-center gap-3">
                      <button
                        className="px-4 py-1 bg-[#FFBA07] text-white rounded-lg text-sm font-medium hover:bg-yellow-500 transition-colors"
                        onClick={() =>
                          navigate(`/wishlistUserListTable/${item.prod_id}`, {
                            state: { product_name: item.product_name },
                          })
                        }
                      >
                        View
                      </button>
                      <button
                        className="px-4 py-1 bg-[#DB0000] text-white rounded-lg text-sm font-medium hover:bg-[#B50000] transition-colors"
                        onClick={() => handleDelete(item.prod_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No items found.
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
