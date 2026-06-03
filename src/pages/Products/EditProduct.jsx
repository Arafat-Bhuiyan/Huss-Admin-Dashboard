import { useState, useEffect } from "react";
import { ChevronLeft, Trash2 } from "lucide-react";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useGetCategoryListQuery,
} from "../../Redux/api/authApi";
import toast from "react-hot-toast";
import QuillEditor from "../../components/Common/QuillEditor";

const FIXED_SPECIFICATION_KEYS = [
  "Material",
  "Color",
  "Weight",
  "Warranty",
  "Country of Origin",
];

const getInitialSpecifications = (product) => {
  const defaultSpecifications = FIXED_SPECIFICATION_KEYS.map((key) => ({
    key,
    value: "",
  }));

  if (!product?.specifications) {
    return defaultSpecifications;
  }

  const parsedSpecifications = Array.isArray(product.specifications)
    ? product.specifications
    : [];

  return defaultSpecifications.map((defaultSpecification) => {
    const existingSpecification = parsedSpecifications.find(
      (specification) => specification.key === defaultSpecification.key,
    );

    return {
      ...defaultSpecification,
      value: existingSpecification?.value || "",
    };
  });
};

const getProductImages = (product) => {
  const detailImages = Array.isArray(product?.images) ? product.images : [];
  const normalizedImages = detailImages
    .map((image, index) => {
      if (typeof image === "string") {
        return {
          id: null,
          url: image,
          key: `image-${index}-${image}`,
        };
      }

      const url = image?.image || image?.url;

      if (!url) {
        return null;
      }

      return {
        id: image.id ?? null,
        url,
        key: image.id ? `image-${image.id}` : `image-${index}-${url}`,
      };
    })
    .filter(Boolean);

  if (product?.image) {
    return [
      {
        id: product.image_id ?? null,
        url: product.image,
        key: product.image_id ? `image-${product.image_id}` : "primary-image",
      },
      ...normalizedImages,
    ];
  }

  return normalizedImages;
};

const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return "";
  }

  if (imageUrl.startsWith("http") || imageUrl.startsWith("blob:")) {
    return imageUrl;
  }

  return `${import.meta.env.VITE_BASE_URL_MEDIA.split("/api/v1")[0]}${imageUrl}`;
};

const EditProductModal = ({ product, onClose, onSave }) => {
  const { data: categoryData } = useGetCategoryListQuery();
  const { data: productDetails } = useGetProductDetailsQuery(product?.id, {
    skip: !product?.id,
  });
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [stockQty, setStockQty] = useState("");
  const [stockStatus, setStockStatus] = useState("In Stock");
  const [isPublished, setIsPublished] = useState(false);
  const [specifications, setSpecifications] = useState(() =>
    getInitialSpecifications(product),
  );
  const [existingImages, setExistingImages] = useState(() =>
    getProductImages(product),
  );
  const [deletedImageIds, setDeletedImageIds] = useState([]);
  const [images, setImages] = useState([]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // API mutation hook
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const stockStatuses = ["In Stock", "Out of Stock"];

  useEffect(() => {
    const currentProduct = productDetails || product;

    if (!currentProduct) {
      return;
    }

    setProductName(currentProduct.product_name || "");
    setCategory(
      currentProduct.category?.id ? String(currentProduct.category.id) : "",
    );
    setDescription(currentProduct.description || "");
    setPrice(currentProduct.price || "");
    setDiscount(currentProduct.discount_percent || 0);
    setStockQty(currentProduct.stock_quantity || "");
    setStockStatus(
      currentProduct.stock_status === "out_of_stock"
        ? "Out of Stock"
        : "In Stock",
    );
    setIsPublished(Boolean(currentProduct.is_published));
    setSpecifications(getInitialSpecifications(currentProduct));
    setExistingImages(getProductImages(currentProduct));
    setDeletedImageIds([]);
  }, [product, productDetails]);

  const handleFileChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    setImages((currentImages) => {
      const newImages = selectedImages.filter(
        (selectedImage) =>
          !currentImages.some(
            (currentImage) =>
              currentImage.name === selectedImage.name &&
              currentImage.size === selectedImage.size &&
              currentImage.lastModified === selectedImage.lastModified,
          ),
      );
      const nextImages = [...currentImages, ...newImages];

      if (nextImages.length > 30) {
        toast.error("You can select up to 30 images.");
        return currentImages;
      }

      return nextImages;
    });

    e.target.value = "";
  };

  const handleRemoveImage = (index) => {
    setImages((currentImages) =>
      currentImages.filter((_, imageIndex) => imageIndex !== index),
    );
  };

  const handleDeleteExistingImage = (image) => {
    if (!image.id) {
      toast.error("This image cannot be deleted because it has no image ID.");
      return;
    }

    setExistingImages((currentImages) =>
      currentImages.filter((currentImage) => currentImage.key !== image.key),
    );
    setDeletedImageIds((currentImageIds) =>
      currentImageIds.includes(image.id)
        ? currentImageIds
        : [...currentImageIds, image.id],
    );
  };

  const handleSpecificationChange = (index, value) => {
    setSpecifications((currentSpecifications) =>
      currentSpecifications.map((specification, specificationIndex) =>
        specificationIndex === index
          ? { ...specification, value }
          : specification,
      ),
    );
  };

  const handleSave = async () => {
    try {
      const formattedSpecifications = specifications.map((specification) => ({
        key: specification.key,
        value: specification.value.trim(),
      }));

      const hasEmptySpecification = formattedSpecifications.some(
        (specification) => !specification.value,
      );

      if (hasEmptySpecification) {
        toast.error("Please fill all specifications.");
        return;
      }

      const formData = new FormData();
      formData.append("product_name", productName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount_percent", discount);
      formData.append("stock_quantity", stockQty);
      formData.append(
        "stock_status",
        stockStatus === "In Stock" ? "in_stock" : "out_of_stock",
      );
      formData.append("category", category);
      formData.append("is_published", isPublished);
      formData.append(
        "specifications",
        JSON.stringify(formattedSpecifications),
      );
      deletedImageIds.forEach((imageId) => {
        formData.append("delete_image_ids", imageId);
      });

      // Only append new image files if selected.
      if (images.length) {
        images.forEach((selectedImage) => {
          formData.append("uploaded_images", selectedImage);
        });
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
      toast.error("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-[700px] rounded-xl p-6 relative max-h-[90vh] overflow-y-auto">
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
              Edit Product
            </h2>
            <p className="text-sm text-gray-500">
              Update details for the selected product.
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
            <QuillEditor
              value={description}
              onChange={setDescription}
              placeholder="Enter product description"
            />
          </div>

          {/* Specifications */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specifications
            </label>

            <div className="space-y-2">
              {specifications.map((specification, index) => (
                <div
                  key={specification.key}
                  className="grid grid-cols-[180px_1fr] gap-2 items-center"
                >
                  <div className="border border-gray-200 bg-gray-50 rounded-md px-3 py-2 text-sm font-medium text-gray-700">
                    {specification.key}
                  </div>
                  <input
                    type="text"
                    value={specification.value}
                    onChange={(e) =>
                      handleSpecificationChange(index, e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder={`Enter ${specification.key}`}
                    required
                  />
                </div>
              ))}
            </div>
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

          {/* Product Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Status
            </label>
            <select
              value={isPublished}
              onChange={(e) => setIsPublished(e.target.value === "true")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="true">Published</option>
              <option value="false">Not Published</option>
            </select>
          </div>

          {/* Product Image */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images
            </label>
            {existingImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {existingImages.map((existingImage) => (
                  <div key={existingImage.key} className="relative group">
                    <img
                      src={getImageUrl(existingImage.url)}
                      alt="Current product"
                      className="w-16 h-16 object-cover rounded-md border border-gray-200"
                    />
                    {existingImage.id && (
                      <button
                        type="button"
                        onClick={() => handleDeleteExistingImage(existingImage)}
                        className="absolute -top-2 -right-2 h-6 w-6 inline-flex items-center justify-center rounded-full bg-red-600 text-white shadow hover:bg-red-700"
                        aria-label="Delete existing image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Upload up to 30 new images for the product.
            </p>
            {images.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-500">
                  {images.length} new image{images.length > 1 ? "s" : ""}{" "}
                  selected.
                </p>
                <div className="max-h-28 overflow-y-auto rounded-md border border-gray-200">
                  {images.map((selectedImage, index) => (
                    <div
                      key={`${selectedImage.name}-${selectedImage.lastModified}`}
                      className="flex items-center justify-between gap-2 px-3 py-2 text-xs text-gray-600 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="truncate">{selectedImage.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="shrink-0 text-gray-400 hover:text-red-500"
                        aria-label="Remove selected image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
