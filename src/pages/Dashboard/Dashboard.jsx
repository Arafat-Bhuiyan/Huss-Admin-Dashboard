import up from "../../assets/images/up.svg";
import Revenue from "../../assets/images/revenue.svg";
import Orders from "../../assets/images/orders.svg";
import Customers from "../../assets/images/customers.svg";
import Products from "../../assets/images/products.svg";
import ChartsSection from "./ChartsSection";

// statsData.js
const statsData = [
  {
    title: "Total Revenue",
    value: "$24,589.32",
    change: "12.5%",
    comparison: "vs last month",
    iconBg: "#FFF0C8",
    icon: "Revenue",
  },
  {
    title: "Total Orders",
    value: "1,243",
    change: "8.2%",
    comparison: "vs last month",
    iconBg: "#FDD2D2",
    icon: "Orders",
  },
  {
    title: "Total Products",
    value: "156",
    change: "4.7%",
    comparison: "vs last month",
    iconBg: "#F3E8FF",
    icon: "Products",
  },
  {
    title: "Total Customers",
    value: "843",
    change: "6.8%",
    comparison: "vs last month",
    iconBg: "#DCFCE7",
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
    <div className="py-8 px-28 flex flex-col gap-8">
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
              <div className="flex items-center gap-1">
                <img src={up} alt="" className="w-3" />
                <span className="text-[#FFBA07] text-xl font-medium font-inter">
                  {item.change}
                </span>
                <span className="text-[#363636] text-xl font-medium font-inter">
                  {item.comparison}
                </span>
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
    </div>
  );
};
