import { useState } from "react";
import { useAddProductMutation } from "../../redux/api/authApi";

const EditCategoryModal = ({ category, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState(
    category?.categoryName || ""
  );
  const [description, setDescription] = useState(category?.description || "");
  const [image, setImage] = useState(null);

  // API mutation hook
  const [addProduct, { isLoading, isSuccess, isError, error }] =
    useAddProductMutation();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      // Create FormData object to send file and other data
      const formData = new FormData();

      formData.append("product_name", categoryName);
      formData.append("description", description);

      // Append image file if selected
      if (image) {
        formData.append("image", image);
      }

      // Console log FormData contents
      console.log("=== FormData Contents ===");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Call the mutation
      const response = await addProduct(formData).unwrap();

      // Success handling
      console.log("Category added successfully:", response);

      // Call onSave callback if provided
      if (onSave) {
        onSave(response);
      }

      // Close modal
      onClose();
    } catch (err) {
      // Error handling
      console.error("Failed to add category:", err);
      alert("Failed to add category. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[700px] rounded-xl p-6 relative">
        {/* Modal Header */}
        <h2 className="text-lg font-semibold text-gray-900 mb-1 text-center">
          Edit Category
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Update the details of the category you want to edit.
        </p>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">
          {/* Category Name */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter category name"
            />
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
              placeholder="Enter category description"
            ></textarea>
          </div>

          {/* Category Image */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Upload a high-quality image for the category.
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
            {isLoading ? "Saving..." : "Save Category"}
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

export default EditCategoryModal;
