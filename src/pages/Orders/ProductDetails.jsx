"use client";

import { X, ArrowLeft } from "lucide-react";

export default function ProductDetailsModal({ product, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.product}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.product}
                </h3>
                <p className="text-gray-600">Category: Gaming Equipment</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Description:
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The Nintendo Switch handheld console provides an immersive
                  gaming experience with its innovative hybrid design, allowing
                  you to play games in handheld, tabletop, and docked modes.
                  Perfect for gaming on the go, at home, or anywhere in between.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Price</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {product.amount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Stock</p>
                  <p className="text-lg font-semibold text-gray-900">
                    15 Units
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">SKU</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {product.orderId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
