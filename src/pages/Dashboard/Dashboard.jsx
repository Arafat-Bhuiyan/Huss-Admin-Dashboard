import up from "../../assets/images/up.svg";
import Revenue from "../../assets/images/revenue.svg";
import Orders from "../../assets/images/orders.svg";
import Customers from "../../assets/images/customers.svg";
import Products from "../../assets/images/products.svg";
import ChartsSection from "./ChartsSection";
import plus from "../../assets/icons/plusIcon.png";
import promotion from "../../assets/icons/promotionIcon.png";
import plus2 from "../../assets/icons/plusIcon2.svg";

// statsData.js
const statsData = [
  {
    title: "Total Revenue",
    value: "$24,589.32",
    iconBg: "#FFF0C8",
    icon: "Revenue",
  },
  {
    title: "Total Orders",
    value: "1,243",
    iconBg: "#FDD2D2",
    icon: "Orders",
  },
  {
    title: "Total Products",
    value: "156",
    iconBg: "#F3E8FF",
    icon: "Products",
  },
  {
    title: "Total Customers",
    value: "843",
    iconBg: "",
    icon: "Customers",
  },
];

const icons = {
  Revenue,
  Orders,
  Customers,
  Products,
};

export const Dashboard = () => {
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

      <ChartsSection />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Add Product */}
        <div className="p-4 bg-white rounded-2xl flex flex-col items-start justify-between gap-4">
          <div className="flex items-center justify-start gap-5">
            <img src={plus} />
            <h1 className="text-zinc-800 text-xl font-semibold leading-snug">
              Add New Product
            </h1>
          </div>
          <div className="text-zinc-800 text-base font-normal leading-snug">
            Quickly add a new product to your inventory with all details.
          </div>
          <div className="w-full h-12 p-2.5 bg-yellow-500 rounded-md inline-flex justify-center items-center gap-2.5">
            <img src={plus2} alt="" />
            <div className="text-white text-base font-bold leading-snug">
              Add Product
            </div>
          </div>
        </div>

        {/* Promotion */}
        <div className="p-4 bg-white rounded-2xl flex flex-col items-start justify-between gap-4">
          <div className="flex items-center justify-start gap-5">
            <img src={promotion} />
            <h1 className="text-zinc-800 text-xl font-semibold leading-snug">
              Create Promotion
            </h1>
          </div>
          <div className="text-zinc-800 text-base font-normal leading-snug">
            Set up discounts, coupon codes, or special offers for your products.
          </div>
          <div className="w-full h-12 p-2.5 bg-rose-400 rounded-md inline-flex justify-center items-center gap-2.5">
            <div className="text-white text-base font-bold leading-snug">
              Create Offer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
