import Active from "../../assets/images/active.svg";
import Orders from "../../assets/images/orders.svg";
import Unsold from "../../assets/images/unsold.svg";
import Sold from "../../assets/images/sold.svg";
import { useState } from "react";
import orders from "../../../public/orders.json";
import { ChevronDown, Search } from "lucide-react";

// statsData.js
const statsData = [
  {
    title: "Total Orders",
    value: "120",
    iconBg: "#FDD2D2",
    icon: "Orders",
  },
  {
    title: "Active Order",
    value: "50",
    iconBg: "#FFF0C8",
    icon: "Active",
  },
  {
    title: "Sold ",
    value: "100",
    iconBg: "#F3E8FF",
    icon: "Sold",
  },
  {
    title: "Unsold",
    value: "20",
    iconBg: "#DCFCE7",
    icon: "Unsold",
  },
];

const icons = {
  Active,
  Orders,
  Unsold,
  Sold,
};
export default function ProductsPage() {
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const statuses = ["Status", "Shipped", "Pending", "Delivered"];

  // ✅ Filter Logic (Search + Status)
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatus === "Status" ||
      order.status.toLowerCase() === selectedStatus.toLowerCase();

    // 🔹 Only check orderId against searchTerm
    const matchesSearch =
      searchTerm === "" ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase().trim());

    return matchesStatus && matchesSearch;
  });
  return (
    <div className="py-8 flex flex-col gap-5">
      <div>
        <div className="w-44 justify-start text-[#363636] text-3xl font-semibold font-inter mb-2">
          Dashboard
        </div>
        <div className="w-[645px] justify-start text-[#363636] text-xl font-normal font-inter">
          Welcome back, Alex! Here's what's happening with your store today.
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-2xl flex items-start justify-between"
          >
            <div className="flex flex-col justify-center gap-2">
              <div className="text-[#363636] text-xl font-medium font-inter">
                {item.title}
              </div>
              <div className="text-[#363636] text-3xl font-semibold font-inter">
                {item.value}
              </div>
            </div>
            <div
              className="p-3 rounded-[10px]"
              style={{ backgroundColor: item.iconBg }}
            >
              <img src={icons[item.icon]} alt={item.title} />
            </div>
          </div>
        ))}
      </div>

      {/* Order List Title */}
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-[#363636]">All Products</h2>
        <button className="w-56 h-12 p-2.5 bg-[#FFBA07] rounded-[10px] inline-flex justify-center items-center gap-2.5 hover:bg-yellow-500 transition">
          <span className="text-white text-xl font-semibold leading-snug">
            + Add Product
          </span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex justify-between items-center gap-4">
        {/* Filter Selection - Left Side */}
        <div className="relative">
          {/* Filter Button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-48 h-10 pl-4 pr-3 py-2.5 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-[#BEBBBB] inline-flex justify-between items-center gap-2.5"
          >
            <span className="text-neutral-700 text-sm font-semibold leading-snug">
              {selectedStatus === "Status"
                ? "Filter by Status"
                : `Filter by ${selectedStatus}`}
            </span>
            <ChevronDown
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-md outline outline-1 outline-[#BEBBBB] z-50">
              {statuses.map((status) => (
                <div
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 text-sm text-neutral-700 cursor-pointer hover:bg-gray-100 ${
                    selectedStatus === status ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {status}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search - Right Side */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none text-gray-700 placeholder-gray-400 w-48"
          />
        </div>
      </div>
    </div>
  );
}
