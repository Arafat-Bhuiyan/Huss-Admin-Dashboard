import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useGetSingleWishlistDetailQuery } from "../../redux/api/authApi";
import OfferModal from "./OfferModal";

export default function WishlistUserListTable() {
  const { orderId } = useParams();
  const location = useLocation();
  const productName = location.state?.product_name || "N/A";
  const {
    data: users = [],
    isLoading,
    isError,
  } = useGetSingleWishlistDetailQuery(orderId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const headerCheckboxRef = useRef();

  useEffect(() => {
    if (headerCheckboxRef.current) {
      const allFilteredIds = users.map((u) => u.user_id);
      const allVisibleSelected = selectedUserIds.filter((id) =>
        allFilteredIds.includes(id),
      ).length;
      headerCheckboxRef.current.checked =
        allVisibleSelected > 0 && allVisibleSelected === users.length;
      headerCheckboxRef.current.indeterminate =
        allVisibleSelected > 0 && allVisibleSelected < users.length;
    }
  }, [selectedUserIds, users]);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (userIdToDelete) => {
    if (window.confirm(`Are you sure you want to delete this user?`)) {
      // API call to delete user from wishlist would go here
      console.log("Deleting user from wishlist:", userIdToDelete);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allUserIds = users.map((user) => user.user_id);
      setSelectedUserIds(allUserIds);
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const isAnySelected = selectedUserIds.length > 0;

  return (
    <div className="min-h-screen bg-[#FAF8F2]">
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
                  <th className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      ref={headerCheckboxRef}
                      onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                    User ID
                  </th>
                  <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                    User Name
                  </th>
                  <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                    User Email
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
                      colSpan="5"
                      className="text-center py-6 text-gray-500 text-sm"
                    >
                      Loading users...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-red-500 text-sm"
                    >
                      Error loading users for this product.
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user.user_id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedUserIds.includes(user.user_id)}
                          onChange={() => handleSelectUser(user.user_id)}
                          className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                        />
                      </td>
                      <td className="px-6 py-4 text-center text-base font-medium text-[#363636] ">
                        {user.user_id}
                      </td>
                      <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                        {user.user_name || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                        {user.user_email}
                      </td>

                      <td className="px-6 py-4 text-sm flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleOpenModal(user)}
                          className="px-4 py-1 bg-[#FFBA07] text-white rounded-lg text-sm font-medium hover:bg-yellow-500 transition-colors"
                        >
                          Offer
                        </button>
                        <button
                          className="px-4 py-1 bg-[#DB0000] text-white rounded-lg text-sm font-medium hover:bg-[#B50000] transition-colors"
                          onClick={() => handleDelete(user.user_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-500 text-sm"
                    >
                      No users found for this product.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <OfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        productId={orderId}
        productName={productName}
      />
    </div>
  );
}
