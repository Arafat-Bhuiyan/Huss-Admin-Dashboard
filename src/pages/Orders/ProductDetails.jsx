"use client";

import { ArrowLeft } from "lucide-react";
import productImage from "../../assets/images/product_image.png";

export default function ProductDetailsModal({ product: order, onClose }) {
  const item = order?.items?.[0] || {};

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return productImage;
    if (imagePath.startsWith("http")) return imagePath;

    // Get base URL from env and remove /api/v1
    const baseUrl = import.meta.env.VITE_BASE_URL || "";
    const origin = baseUrl.split("/api/v1")[0];
    return `${origin}${imagePath}`;
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "shipped":
        return "bg-[#8B5CF6] text-white";
      case "pending":
        return "bg-[#F59E0B] text-white";
      case "delivered":
        return "bg-[#22C55E] text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-neutral-700 text-2xl font-semibold">
              Product Details
            </h2>
          </div>
          <button onClick={onClose} className="flex items-center gap-2">
            <ArrowLeft color="#FFBA07" size={20} />
            <span className="text-yellow-500 text-xl font-medium">
              Back to Dashboard
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="w-full flex items-center justify-between gap-8 ">
            {/* Product Image */}
            <div className="w-1/2 flex items-center justify-center">
              <div className="w-full aspect-square bg-gray-100 rounded-[20px] overflow-hidden">
                <img
                  src={getFullImageUrl(item.product_image)}
                  alt={item.product_name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6 w-1/2">
              <div>
                <h3 className="text-neutral-700 text-2xl font-semibold mb-2">
                  {item.product_name || "N/A"}
                </h3>
                <p className="text-neutral-700 text-base font-normal">
                  Category: {item.category_name || "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-neutral-700 text-base font-normal mb-1">
                    Price
                  </p>
                  <p className="text-[#FFBA07] text-xl font-medium">
                    ${item.price || order.total_amount}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-700 text-base font-normal mb-1">
                    Quantity
                  </p>
                  <p className="text-neutral-700 text-xl font-medium">
                    {item.quantity || 1} Units
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-neutral-700 text-base font-normal mb-1">
                    Order ID
                  </p>
                  <p className="text-neutral-700 text-base font-medium">
                    {order.order_id_display}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-700 text-base font-normal mb-1">
                    Status
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={onClose}
                className="w-80 h-11 p-2.5 bg-yellow-500 rounded-lg inline-flex justify-center items-center gap-2.5 hover:bg-yellow-600 transition-colors"
              >
                <span className="text-white text-xl font-bold leading-snug">
                  Cancel
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
