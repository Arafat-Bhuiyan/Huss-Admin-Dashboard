import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  useAddProductMutation,
  useGetCategoryListQuery,
} from "../../redux/api/authApi";

const AddProductModal = ({ product, onClose, onSave }) => {
  const { data: categoryData } = useGetCategoryListQuery();
  const [productName, setProductName] = useState(product?.productName || "");
  const [category, setCategory] = useState(product?.category || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [discount, setDiscount] = useState(product?.discount || 0);
  const [stockQty, setStockQty] = useState(product?.stock || "");
  const [stockStatus, setStockStatus] = useState(
    product?.stockStatus || "In Stock",
  );
  const [image, setImage] = useState(null);

  // API mutation hook
  const [addProduct, { isLoading }] = useAddProductMutation();

  // Categories were previously static, now using categoryData from API

  const stockStatuses = ["In Stock", "Out of Stock"];

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = async (isPublished = false) => {
    try {
      // Create FormData object to send file and other data
      const formData = new FormData();

      formData.append("product_name", productName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock_quantity", stockQty);
      formData.append("is_published", isPublished);

      // Append image file if selected
      if (image) {
        formData.append("image", image);
      }

      // Append category (you may need to map category name to category ID)
      // For now, sending category as text - adjust based on your backend requirements
      formData.append("category", category);

      // Console log FormData contents
      console.log("=== FormData Contents ===");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Check category type
      console.log("Category ID:", category);
      console.log("Category type:", typeof category);

      // Call the mutation
      const response = await addProduct(formData).unwrap();

      // Success handling
      console.log("Product added successfully:", response);

      // Call onSave callback if provided
      if (onSave) {
        onSave(response);
      }

      // Close modal
      onClose();
    } catch (err) {
      // Error handling
      console.error("Failed to add product:", err);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[700px] rounded-xl p-6 relative">
        {/* Modal Header */}
        {/* Modal Header */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute left-0 top-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Add New Product
            </h2>
            <p className="text-sm text-gray-500">
              Enter the details of the new product you want to add to your
              store.
            </p>
          </div>
        </div>

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
              <option value="">Select Category</option>
              {categoryData?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
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
              Upload a high-quality image for the product.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => handleSave(true)}
            disabled={isLoading}
            className={`bg-yellow-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-yellow-600 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Saving..." : "Save Product"}
          </button>
          <button
            onClick={() => handleSave(false)}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            Save as draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
