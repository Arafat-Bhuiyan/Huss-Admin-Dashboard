import { useState } from "react";
import toast from "react-hot-toast";
import { useUpdateCategoryMutation } from "../../redux/api/authApi";

const EditCategoryModal = ({ category, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState(
    category?.category_name || "",
  );
  const [description, setDescription] = useState(category?.description || "");
  const [image, setImage] = useState(null);

  // API mutation hook
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("category_name", categoryName);
      formData.append("description", description || "");

      // Append image file if a new one is selected
      if (image) {
        formData.append("image", image);
      }

      // Call the mutation with id and data
      const response = await updateCategory({
        id: category.id,
        data: formData,
      }).unwrap();

      toast.success("Category updated successfully");

      if (onSave) {
        onSave(response);
      }
      onClose();
    } catch (err) {
      console.error("Failed to update category:", err);
      toast.error(err?.data?.message || "Failed to update category");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-[600px] rounded-xl p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <h2 className="text-xl font-bold text-gray-900 mb-1 text-center font-inter">
          Edit Category
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8 font-inter">
          Update the details of the category you want to edit.
        </p>

        {/* Form */}
        <div className="space-y-5">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-semibold text-[#344054] mb-1.5 font-inter">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 transition-all font-inter"
              placeholder="Enter category name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-[#344054] mb-1.5 font-inter">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 focus:outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 transition-all font-inter resize-none"
              placeholder="Enter category description"
            ></textarea>
          </div>

          {/* Category Image */}
          <div>
            <label className="block text-sm font-semibold text-[#344054] mb-1.5 font-inter">
              Category Image
            </label>

            {/* Show current image if available */}
            {category?.image && !image && (
              <div className="mb-3 relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={`${import.meta.env.VITE_BASE_URL.split("/api/v1")[0]}${category.image}`}
                  alt="Current"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <p className="text-[10px] text-white font-medium">Current</p>
                </div>
              </div>
            )}

            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-yellow-500 transition-colors">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500">
                    <span>Change image</span>
                    <input
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1 text-[#475467]">or drag and drop</p>
                </div>
                <p className="text-xs text-[#475467]">
                  PNG, JPG, GIF up to 10MB
                </p>
                {image && (
                  <p className="mt-2 text-sm text-green-600 font-medium">
                    New: {image.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-[#344054] font-semibold rounded-lg hover:bg-gray-50 transition-all font-inter"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-[#FFBA07] text-white font-semibold rounded-lg hover:bg-yellow-600 transition-all font-inter disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Updating...
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
