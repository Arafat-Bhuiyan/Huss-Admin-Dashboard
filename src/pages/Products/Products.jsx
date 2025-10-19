import Active from "../../assets/images/active.svg";
import Orders from "../../assets/images/orders.svg";
import Unsold from "../../assets/images/unsold.svg";
import Sold from "../../assets/images/sold.svg";

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
  return (
    <div className="py-8 flex flex-col gap-8">
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
      <div className="flex justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-[#363636]">All Products</h2>
        <a
          href="#"
          className="text-[#FFBA07] font-semibold hover:text-yellow-600 text-sm underline"
        >
          See All
        </a>
      </div>
    </div>
  );
}
