import { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

export default function TrackingModal({ isOpen, onClose, user, onSave }) {
  const [form, setForm] = useState({
    orderId: "",
    trackingNumber: "",
    status: "Pending",
    date: "",
    customer: "",
  });

  useEffect(() => {
    if (user) {
      setForm(user);
    } else {
      setForm({
        orderId: "",
        trackingNumber: "",
        status: "Pending",
        date: "",
        customer: "",
      });
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!form.orderId || !form.trackingNumber || !form.status) {
      toast.error("All fields are required");
      return;
    }

    onSave(form);
    onClose();
    toast.success(user ? "Updated successfully!" : "Added successfully!");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-[30px] p-8 relative"
        style={{ width: "505px", height: "568px" }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        <h2 className="text-[#363636] font-semibold text-[32px] leading-none mb-10">
          {user ? "Edit Tracking Number" : "Add Tracking Number"}
        </h2>

        <div className="space-y-6 text-[#363636]">
          {/* Order ID */}
          <div>
            <label className="block text-[#363636] font-semibold text-2xl mb-3">
              Order ID
            </label>
            <input
              type="text"
              value={form.orderId}
              onChange={(e) => setForm({ ...form, orderId: e.target.value })}
              className="w-full p-3 border border-[#C1C1C1] rounded-lg"
            />
          </div>

          {/* Tracking Number */}
          <div>
            <label className="block text-[#363636] font-semibold text-2xl mb-3">
              Tracking Number
            </label>
            <input
              type="text"
              value={form.trackingNumber}
              onChange={(e) =>
                setForm({ ...form, trackingNumber: e.target.value })
              }
              className="w-full p-3 border border-[#C1C1C1] rounded-lg"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-[#363636] font-semibold text-2xl mb-3">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full p-3 border border-[#C1C1C1] rounded-lg"
            >
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 right-8 flex items-center gap-[10px]">
          <button
            onClick={handleSubmit}
            className="w-full bg-[#FFBA07] text-white rounded-[8px] p-[10px] font-semibold"
          >
            Save
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
