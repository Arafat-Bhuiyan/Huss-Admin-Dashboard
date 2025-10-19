"use client"

import { useState, useEffect } from "react"

export default function PromotionModal({ promotion, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    discountType: "Flat 20% off",
    discountAmount: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  useEffect(() => {
    if (promotion) {
      setFormData({
        name: promotion.name,
        discountType: promotion.discountType,
        discountAmount: promotion.discountAmount,
        startDate: promotion.startDate,
        endDate: promotion.endDate,
        description: promotion.description || "",
      })
    }
  }, [promotion])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {promotion ? "Edit Promotion" : "Create New Promotion"}
        </h2>
        <p className="text-gray-600 mb-6">
          {promotion
            ? "Update the promotion details below."
            : "Fill out the form below to create a new promotion for your store."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Promotion Name</label>
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

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Discount Type</label>
            <select
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option>Flat 20% off</option>
              <option>Percentage off</option>
              <option>Buy One Get One Free</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Discount Amount</label>
            <input
              type="text"
              name="discountAmount"
              value={formData.discountAmount}
              onChange={handleChange}
              placeholder="Enter Amount"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Promotion Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter any additional details about the promotion (optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
              rows="3"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#FFBA07] text-white font-semibold rounded transition-colors"
            >
              {promotion ? "Save Changes" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-[#FAF8F2] border text-gray-900 font-semibold rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
