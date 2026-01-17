import { Plus } from "lucide-react";
import { useState } from "react";
import PromotionModal from "./PromotionModal";
import {
  useGetPromotionsQuery,
  useCreatePromotionsMutation,
  useUpdatePromotionsMutation,
  useDeletePromotionsMutation,
} from "../../redux/api/authApi";

const mockPromotions = [
  {
    id: 1,
    name: "Summer Sale",
    discountType: "Flat 20% off",
    discountAmount: "20",
    startDate: "2025-07-01",
    endDate: "2025-07-31",
    description: "Summer sale promotion",
    status: "Active",
  },
];

export function Promotions() {
  const { data: promotions = [], isLoading, isError } = useGetPromotionsQuery();
  const [createPromotion] = useCreatePromotionsMutation();
  const [updatePromotion] = useUpdatePromotionsMutation();
  const [deletePromotion] = useDeletePromotionsMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);

  const handleAddPromotion = async (formData) => {
    try {
      await createPromotion(formData).unwrap();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to create promotion:", err);
      alert("Failed to create promotion. Please try again.");
    }
  };

  const handleEditPromotion = async (formData) => {
    try {
      await updatePromotion({
        id: editingPromotion.id,
        data: formData,
      }).unwrap();
      setEditingPromotion(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to update promotion:", err);
      alert("Failed to update promotion. Please try again.");
    }
  };

  const handleDeletePromotion = async (id) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      try {
        await deletePromotion(id).unwrap();
      } catch (err) {
        console.error("Failed to delete promotion:", err);
        alert("Failed to delete promotion. Please try again.");
      }
    }
  };

  const handleOpenAddModal = () => {
    setEditingPromotion(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (promotion) => {
    setEditingPromotion(promotion);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPromotion(null);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-900">Promotions</h1>
      </div>

      {/* Main Content */}
      <div className="px-8">
        {/* Promotions Section Header */}
        <div className="mb-8 bg-white p-4 rounded space-y-2">
          <h2 className="text-lg font-semibold text-gray-900">Promotions</h2>
          <button
            onClick={handleOpenAddModal}
            className="bg-amber-400 hover:bg-amber-500 text-white flex items-center p-2 px-4 rounded-lg font-medium"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Offer
          </button>
        </div>

        {/* Active Promotions Section */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="mb-6 text-base font-semibold text-gray-900">
            Active Promotions
          </h3>

          {/* Table */}
          <div className="overflow-x-auto rounded bg-[#FAF8F2]">
            <table className="w-full">
              <thead>
                <tr className="">
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                    Promotion Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                    Discount Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                    Start Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                    End Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {promotions.map((promotion) => (
                  <tr
                    key={promotion.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {promotion.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {promotion.description}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {promotion.discount_type} ({promotion.discount_amount}%)
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {promotion.start_date}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {promotion.end_date}
                    </td>
                    <td className="py-4">
                      <div
                        className={`inline px-4 text-center rounded-full py-1 capitalize ${
                          promotion.status === "active"
                            ? "bg-[#B7FFD0] text-black"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {promotion.status}
                      </div>
                    </td>
                    <td className="px-4 py-4 flex gap-2">
                      <button
                        onClick={() => handleOpenEditModal(promotion)}
                        className="bg-amber-400 hover:bg-amber-500 text-white py-1 px-2 rounded border-0 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePromotion(promotion.id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded border-0 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && (
            <PromotionModal
              promotion={editingPromotion}
              onSave={
                editingPromotion ? handleEditPromotion : handleAddPromotion
              }
              onClose={handleCloseModal}
            />
          )}
          {/* Loading & Empty States */}
          {isLoading && (
            <div className="py-12 text-center text-gray-500">
              Loading promotions...
            </div>
          )}
          {isError && (
            <div className="py-12 text-center text-red-500">
              Error loading promotions data.
            </div>
          )}
          {!isLoading && promotions.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">
                No active promotions yet. Create one to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
