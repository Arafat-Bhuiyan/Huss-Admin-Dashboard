import { useState } from "react";
import { useUpdateProductMutation } from "../../redux/api/authApi";

const EditProductModal = ({ product, onClose, onSave }) => {
  const [productName, setProductName] = useState(product?.product_name || "");
  const [category, setCategory] = useState(String(product?.category) || "5");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [discount, setDiscount] = useState(product?.discount_percent || 0);
  const [stockQty, setStockQty] = useState(product?.stock_quantity || "");
  const [stockStatus, setStockStatus] = useState(
    product?.stock_status === "in_stock" ? "In Stock" : "Out of Stock"
  );
  const [image, setImage] = useState(null);

  // API mutation hook
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  // Categories with correct Backend IDs (Matches AddProduct.jsx)
  const categories = [
    { id: "5", name: "Survey Equipment" },
    { id: "7", name: "Gaming Equipment" },
    { id: "8", name: "Testing & Lab Equipment" },
    { id: "9", name: "Electronics Equipment" },
    { id: "10", name: "Accessories Equipment" },
    { id: "11", name: "Industrial Tools" },
  ];

  const discountTypes = [
    "Flat 20% off",
    "Percentage off",
    "Buy One Get One Free",
  ];
  const stockStatuses = ["In Stock", "Out of Stock"];

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("product_name", productName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock_quantity", stockQty);
      formData.append("category", category);

      // Only append image if a new one is selected
      if (image) {
        formData.append("image", image);
      }

      // Console log for debugging
      console.log("=== Update FormData Contents ===");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Call the mutation with ID and data
      const response = await updateProduct({
        id: product.id,
        data: formData,
      }).unwrap();

      console.log("Product updated successfully:", response);

      if (onSave) {
        onSave(response);
      }
      onClose();
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[700px] rounded-xl p-6 relative">
        {/* Modal Header */}
        <h2 className="text-lg font-semibold text-gray-900 mb-1 text-center">
          Edit Product
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Update details for the selected product.
        </p>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">
          {/* Product Name */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter product name"
            />
          </div>

          {/* Category */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter product description"
            ></textarea>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Percent
            </label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Stock Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              value={stockQty}
              onChange={(e) => setStockQty(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Stock Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Status
            </label>
            <select
              value={stockStatus}
              onChange={(e) => setStockStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {stockStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Product Image */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Upload a new image to replace the current one.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={`bg-yellow-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-600 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Saving..." : "Save Product"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
