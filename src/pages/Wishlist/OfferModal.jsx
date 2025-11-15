import { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function OfferModal({ isOpen, onClose, user }) {
  const [discountAmount, setDiscountAmount] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setDiscountAmount(""); // Reset discount amount when modal closes
    }
  }, [isOpen]);

  if (!isOpen || !user) return null;

  const handleMakeOffer = () => {
    toast.success("Offer created successfully!");
    onClose(); // Close the modal
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div
        className="bg-white rounded-[30px] p-8 relative"
        style={{ width: "505px", height: "568px" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <h2 className="text-[#363636] font-semibold text-[32px] leading-none mb-10">
          Create offer
        </h2>

        {/* Form Fields */}
        <div className="space-y-6 text-[#363636]">
          {/* Product ID */}
          <div>
            <label className="block text-[#363636] font-semibold text-2xl leading-none mb-3">
              Product Id
            </label>
            <input
              type="text"
              readOnly
              value={user.productId}
              className="w-full p-3  border border-[#C1C1C1] rounded-lg text-base font-normal leading-none"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-[#363636] font-semibold text-2xl leading-none mb-3">
              Product name
            </label>
            <input
              type="text"
              readOnly
              value={user.productName}
              className="w-full p-3  border border-[#C1C1C1] rounded-lg text-base font-normal leading-none"
            />
          </div>

          {/* Discount Amount */}
          <div>
            <label className="block text-[#363636] font-semibold text-2xl leading-none mb-3">
              Discount Amount
            </label>
            <input
              type="text"
              placeholder="Enter discount amount"
              value={discountAmount}
              onChange={(e) => setDiscountAmount(e.target.value)}
              className="w-full p-3 border border-[#C1C1C1] rounded-lg text-base font-normal leading-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-8 left-8 right-8 flex items-center gap-[10px]">
          <button
            onClick={handleMakeOffer}
            disabled={!discountAmount.trim()}
            className="w-full bg-[#FFBA07] text-white rounded-[8px] p-[10px] font-semibold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Make Offer
          </button>
          <button
            onClick={onClose}
            className="w-full bg-[#FAF8F2] text-[#363636] border border-[#C1C1C1] rounded-[8px] p-[10px] font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
