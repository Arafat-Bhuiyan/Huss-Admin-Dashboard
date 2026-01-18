import { useState, useEffect } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useUpdateTrackingMutation } from "../../redux/api/authApi";

export default function TrackingModal({ isOpen, onClose, user, onSave }) {
  const [updateTracking, { isLoading: isUpdating }] =
    useUpdateTrackingMutation();
  // We might still need create if "Add" functionality existed, but user asked to remove add button.
  // So likely this modal is now exclusively for editing existing tracking.
  const [form, setForm] = useState({
    id: "",
    tracking_number: "",
    status: "pending",
    date: "",
    customer_name: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        ...user,
        id: user.id || "",
        tracking_number: user.tracking_number || "",
        status: user.status || "pending",
      });
    } else {
      setForm({
        id: "",
        tracking_number: "",
        status: "pending",
        date: "",
        customer_name: "",
      });
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    // validation
    if (!form.id || !form.tracking_number || !form.status) {
      toast.error("All fields are required");
      return;
    }

    const payload = {
      order_id: form.id,
      tracking_number: form.tracking_number,
      status: form.status,
    };

    try {
      await updateTracking({
        id: user.id,
        data: payload,
      }).unwrap();

      toast.success("Updated successfully!");
      onSave(form);
      onClose();
    } catch (err) {
      console.error("Update failed", err);
      toast.error(err?.data?.message || "Something went wrong!");
    }
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
              value={form.id}
              disabled // Order ID should typically not be editable during tracking update if it links to an order
              className="w-full p-3 border border-[#C1C1C1] rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Tracking Number */}
          <div>
            <label className="block text-[#363636] font-semibold text-2xl mb-3">
              Tracking Number
            </label>
            <input
              type="text"
              value={form.tracking_number}
              onChange={(e) =>
                setForm({ ...form, tracking_number: e.target.value })
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
              onChange={(e) =>
                setForm({ ...form, status: e.target.value.toLowerCase() })
              }
              className="w-full p-3 border border-[#C1C1C1] rounded-lg capitalize"
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 right-8 flex items-center gap-[10px]">
          <button
            onClick={handleSubmit}
            disabled={isUpdating}
            className={`w-full bg-[#FFBA07] text-white rounded-[8px] p-[10px] font-semibold flex items-center justify-center gap-2 ${
              isUpdating ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isUpdating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              "Save"
            )}
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
