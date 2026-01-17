"use client";

import { useState, useEffect } from "react";

export default function PromotionModal({ promotion, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    discount_type: "percentage",
    discount_amount: "",
    start_date: "",
    end_date: "",
    description: "",
    status: "active",
  });

  useEffect(() => {
    if (promotion) {
      setFormData({
        name: promotion.name || "",
        discount_type: promotion.discount_type || "percentage",
        discount_amount: promotion.discount_amount || "",
        start_date: promotion.start_date || "",
        end_date: promotion.end_date || "",
        description: promotion.description || "",
        status: promotion.status || "active",
      });
    }
  }, [promotion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "discount_amount" ? parseFloat(value) || "" : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {promotion ? "Edit Promotion" : "Create New Promotion"}
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          {promotion
            ? "Update the promotion details below."
            : "Fill out the form below to create a new promotion for your store."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Promotion Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Discount Type
              </label>
              <input
                type="text"
                name="discount_type"
                value={formData.discount_type}
                onChange={handleChange}
                placeholder="e.g. percentage"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Discount Amount
              </label>
              <input
                type="number"
                step="0.01"
                name="discount_amount"
                value={formData.discount_amount}
                onChange={handleChange}
                placeholder="Enter Amount"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter promotion description..."
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#FFBA07] text-white font-semibold rounded hover:bg-[#e5a706] transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-[#FAF8F2] border text-gray-900 font-semibold rounded hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
