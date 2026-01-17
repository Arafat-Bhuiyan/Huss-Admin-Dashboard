import { Folder, SquarePen, Trash2, ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  useDeleteCategoryMutation,
  useGetCategoryListQuery,
} from "../../redux/api/authApi";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

export const Category = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // API query/mutation hooks
  const { data: categoryData, isLoading, isError } = useGetCategoryListQuery();

  // ✅ Pagination Logic
  const totalPages = Math.ceil((categoryData?.length || 0) / ITEMS_PER_PAGE);
  const paginatedData = categoryData?.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE,
  );
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleAddCategory = (newCategory) => {
    // TODO: Implement API call to add category
    console.log("Add category:", newCategory);
    setIsAddModalOpen(false);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedProduct) => {
    // TODO: Implement API call to update product
    console.log("Update product:", updatedProduct);
    setIsEditModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="font-medium text-gray-800">
            Are you sure you want to delete this category?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                try {
                  toast.dismiss(t.id);
                  const loadingToast = toast.loading("Deleting category...");
                  await deleteCategory(id).unwrap();
                  toast.dismiss(loadingToast);
                  toast.success("Category deleted successfully");
                } catch (err) {
                  toast.error(
                    err?.data?.message || "Failed to delete category",
                  );
                }
              }}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
        style: {
          minWidth: "300px",
          padding: "16px",
        },
      },
    );
  };

  return (
    <div className="py-8 flex flex-col gap-5 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <div className="justify-start text-[#363636] text-3xl font-semibold font-inter mb-2">
            Categories Management
          </div>
          <div className="justify-start text-[#363636] text-xl font-normal font-inter">
            Organize your products into categories
          </div>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-56 h-12 p-2.5 bg-[#FFBA07] rounded-[10px] inline-flex justify-center items-center gap-2.5 hover:bg-yellow-500 transition"
        >
          <span className="text-white text-xl font-semibold leading-snug">
            + Add Category
          </span>
        </button>
      </div>

      {/* Cards */}
      <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFBA07]"></div>
          </div>
        ) : isError ? (
          <div className="col-span-full text-center text-red-500 py-10">
            Failed to load categories.
          </div>
        ) : (
          paginatedData?.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-[#F9EFD5] shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
            >
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#F3E8FF] overflow-hidden">
                  {item.image ? (
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}${item.image}`}
                      alt={item.category_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Folder color="#FFBA07" className="w-6 h-6" />
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <SquarePen size={16} color="#FFBA07" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Trash2 size={16} color="#E7000B" />
                  </button>
                </div>
              </div>
              {/* Title */}
              <h1 className="text-[#101828] font-bold text-xl pt-4 truncate">
                {item.category_name}
              </h1>
              {/* Subtitle */}
              <p className="text-[#4A5565] font-normal text-base pt-1.5 pb-3">
                {item.description || "No description available"}
              </p>
              <div className="mt-auto">
                <div className="w-full border-b border-[#E5E7EB]" />
                <div className="flex justify-between items-center py-2">
                  <p className="text-[#4A5565] font-normal text-base">
                    0 Products
                  </p>
                  <div className="text-xs px-2 py-1 rounded-full flex items-center justify-center font-normal text-[#008236] bg-[#DCFCE7]">
                    active
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {categoryData?.length > 0 && (
        <div className="flex justify-between mt-5">
          <p className="text-black font-medium text-xl">
            Showing{" "}
            {categoryData.length === 0
              ? 0
              : (activePage - 1) * ITEMS_PER_PAGE + 1}{" "}
            to {Math.min(activePage * ITEMS_PER_PAGE, categoryData.length)} of{" "}
            {categoryData.length} categories
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

      {isAddModalOpen && (
        <AddCategoryModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddCategory}
        />
      )}
      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditCategoryModal
          category={selectedProduct}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
