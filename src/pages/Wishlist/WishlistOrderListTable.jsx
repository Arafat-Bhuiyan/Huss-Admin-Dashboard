import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useGetWishlistQuery } from "../../redux/api/authApi";

export default function WishlistOrdersTable() {
  const { data: wishlistData = [], isLoading } = useGetWishlistQuery();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // ✅ Pagination Logic
  const totalPages = Math.ceil(wishlistData.length / ITEMS_PER_PAGE);
  const paginatedData = wishlistData.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE,
  );

  const handleDelete = (orderIdToDelete) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-gray-900">
            Are you sure you want to delete product ID{" "}
            <b>"{orderIdToDelete}"</b> from wishlist?
          </p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                // API call to delete product from wishlist would go here
                console.log("Deleting product:", orderIdToDelete);
                toast.success("Product deleted successfully!");
              }}
              className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
        style: {
          minWidth: "300px",
        },
      },
    );
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
              ) : paginatedData.length > 0 ? (
                paginatedData.map((item) => (
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

      {wishlistData.length > 0 && (
        <div className="flex justify-between mt-5">
          <p className="text-black font-medium text-xl">
            Showing{" "}
            {wishlistData.length === 0
              ? 0
              : (activePage - 1) * ITEMS_PER_PAGE + 1}{" "}
            to {Math.min(activePage * ITEMS_PER_PAGE, wishlistData.length)} of{" "}
            {wishlistData.length} items
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
