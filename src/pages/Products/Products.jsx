import Active from "../../assets/images/active.svg";
import Orders from "../../assets/images/orders.svg";
import Unsold from "../../assets/images/unsold.svg";
import Sold from "../../assets/images/sold.svg";
import { useState } from "react";
import { ChevronDown, Search, ChevronLeft } from "lucide-react";
import EditProductModal from "./EditProduct";
import AddProductModal from "./AddProduct";
import {
  useGetProductsListQuery,
  useDeleteProductMutation,
  useGetCategoryListQuery,
} from "../../Redux/api/authApi";
import { toast } from "react-hot-toast";

export default function ProductsPage() {
  // Fetch products and categories from API
  const { data: products = [], isLoading, error } = useGetProductsListQuery();
  const { data: categoryData = [] } = useGetCategoryListQuery();
  console.log("Products:", products);

  // Mutation for deleting product
  const [deleteProduct] = useDeleteProductMutation();
  const [selectedStatus, setSelectedStatus] = useState("All Categories");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPublishStatus, setSelectedPublishStatus] = useState("Status");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);
  const PRODUCTS_PER_PAGE = 10;

  const statuses = [
    "All Categories",
    ...categoryData.map((cat) => cat.category_name),
  ];
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // ✅ Filter Logic (Search + Category + Status)
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedStatus === "All Categories" ||
      product.category?.category_name === selectedStatus;

    const matchesPublishStatus =
      selectedPublishStatus === "Status" ||
      (selectedPublishStatus === "Published"
        ? product.is_published
        : !product.is_published);

    const matchesSearch =
      searchTerm === "" ||
      product.product_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase().trim());

    return matchesCategory && matchesSearch && matchesPublishStatus;
  });

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (activePage - 1) * PRODUCTS_PER_PAGE,
    activePage * PRODUCTS_PER_PAGE,
  );

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

  const handleDelete = (product) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-gray-900">
            Are you sure you want to delete <b>"{product.product_name}"</b>?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const deletePromise = deleteProduct(product.id).unwrap();

                toast.promise(deletePromise, {
                  loading: "Deleting product...",
                  success: "Product deleted successfully!",
                  error: (err) =>
                    `Error: ${err?.data?.message || "Failed to delete"}`,
                });

                try {
                  await deletePromise;
                  console.log("Deleted product successfully:", product.id);
                } catch (err) {
                  console.error("Failed to delete product:", err);
                }
              }}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
        position: "top-center",
        style: {
          minWidth: "300px",
          padding: "16px",
        },
      },
    );
  };

  const handleAddProduct = (newProduct) => {
    // TODO: Implement API call to add product
    console.log("Add product:", newProduct);
    setIsAddModalOpen(false);
  };

  console.log("Products 2.0:", products);
  return (
    <div className="py-8 flex flex-col gap-5 min-h-screen">
      <div>
        <div className="w-44 justify-start text-[#363636] text-3xl font-semibold font-inter mb-2">
          Dashboard
        </div>
        <div className="w-[645px] justify-start text-[#363636] text-xl font-normal font-inter">
          Welcome back, Alex! Here's what's happening with your store today.
        </div>
      </div>

      {/* Cards */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-2xl flex items-start justify-between"
          >
            <div className="flex flex-col justify-center gap-2">
              <div className="text-[#363636] text-xl font-medium font-inter">
                {item.title}
              </div>
              <div className="text-[#363636] text-3xl font-semibold font-inter">
                {item.value}
              </div>
            </div>
            <div
              className="p-3 rounded-[10px]"
              style={{ backgroundColor: item.iconBg }}
            >
              <img src={icons[item.icon]} alt={item.title} />
            </div>
          </div>
        ))}
      </div> */}

      {/* Order List Title */}
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-[#363636]">All Products</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-56 h-12 p-2.5 bg-[#FFBA07] rounded-[10px] inline-flex justify-center items-center gap-2.5 hover:bg-yellow-500 transition"
        >
          <span className="text-white text-xl font-semibold leading-snug">
            + Add Product
          </span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex justify-between items-center gap-4">
        {/* Filter Selection - Left Side */}
        <div className="flex items-center gap-4">
          <div className="relative">
            {/* Category Filter Button */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="w-52 h-10 pl-4 pr-3 py-2.5 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-[#BEBBBB] inline-flex justify-between items-center gap-2.5"
            >
              <span className="text-neutral-700 text-sm font-semibold leading-snug">
                {selectedStatus === "Status"
                  ? "All Categories"
                  : `${selectedStatus}`}
              </span>
              <ChevronDown
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Category Dropdown Menu */}
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
                      selectedStatus === status
                        ? "bg-gray-100 font-semibold"
                        : ""
                    }`}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            {/* Status Filter Button */}
            <button
              onClick={() => setIsStatusOpen((prev) => !prev)}
              className="w-52 h-10 pl-4 pr-3 py-2.5 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-[#BEBBBB] inline-flex justify-between items-center gap-2.5"
            >
              <span className="text-neutral-700 text-sm font-semibold leading-snug">
                {selectedPublishStatus}
              </span>
              <ChevronDown
                className={`transition-transform duration-200 ${
                  isStatusOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Status Dropdown Menu */}
            {isStatusOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-md outline outline-1 outline-[#BEBBBB] z-50">
                {["Status", "Published", "Not Published"].map((status) => (
                  <div
                    key={status}
                    onClick={() => {
                      setSelectedPublishStatus(status);
                      setIsStatusOpen(false);
                    }}
                    className={`px-4 py-2 text-sm text-neutral-700 cursor-pointer hover:bg-gray-100 ${
                      selectedPublishStatus === status
                        ? "bg-gray-100 font-semibold"
                        : ""
                    }`}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search - Right Side */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none text-gray-700 placeholder-gray-400 w-48"
          />
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-lg font-medium">Loading products...</div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <div className="text-lg font-medium">Error loading products</div>
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
                    Image
                  </th>
                  <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                    Price
                  </th>
                  <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                    Category
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
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-center">
                        <img
                          src={`${import.meta.env.VITE_BASE_URL.split("/api/v1")[0]}${product.image}`}
                          alt={product.product_name}
                          className="w-16 h-16 object-cover rounded-md mx-auto"
                        />
                      </td>
                      <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                        {product.product_name}
                      </td>
                      <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                        ${parseFloat(product.price).toLocaleString()}
                      </td>
                      <td
                        className={`px-6 py-4 text-center text-base font-medium ${
                          product.stock_status === "in_stock"
                            ? "text-green-500"
                            : "text-orange-600"
                        }`}
                      >
                        {product.stock_quantity}
                      </td>
                      <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                        {product.category?.category_name || "N/A"}
                      </td>
                      <td
                        className={`px-6 py-4 text-center text-base font-medium ${
                          product.is_published
                            ? "text-[#22C55E]"
                            : "text-[#6B7280]"
                        }`}
                      >
                        {product.is_published ? "Published" : "Not Published"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2 h-full">
                          <button
                            onClick={() => handleEdit(product)}
                            className="px-4 py-1 bg-[#FFBA07] text-white rounded-md text-sm font-medium hover:bg-yellow-500 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            className="px-4 py-1 bg-[#DB0000] text-white rounded-md text-sm font-medium hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-6 text-gray-500 text-sm"
                    >
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <div className="flex justify-between mt-5">
          <p className="text-black font-medium text-xl">
            Showing{" "}
            {filteredProducts.length === 0
              ? 0
              : (activePage - 1) * PRODUCTS_PER_PAGE + 1}{" "}
            to{" "}
            {Math.min(activePage * PRODUCTS_PER_PAGE, filteredProducts.length)}{" "}
            of {filteredProducts.length} products
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

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}

      {isAddModalOpen && (
        <AddProductModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddProduct}
        />
      )}
    </div>
  );
}
