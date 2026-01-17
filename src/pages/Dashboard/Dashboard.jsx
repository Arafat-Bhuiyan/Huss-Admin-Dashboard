import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetDashboardDataQuery } from "../../redux/api/authApi";
import Revenue from "../../assets/images/revenue.svg";
import Orders from "../../assets/images/orders.svg";
import Customers from "../../assets/images/customers.png";
import Products from "../../assets/images/products.svg";
import ChartsSection from "./ChartsSection";
import plus from "../../assets/icons/plusIcon.png";
import promotion from "../../assets/icons/promotionIcon.png";

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
    title: "Total Users",
    value: "843",
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
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useGetDashboardDataQuery();

  // Map API summary data to stats cards
  const summary = dashboardData?.summary;

  const dynamicStatsData = [
    {
      title: "Total Revenue",
      value: summary ? `$${summary.total_revenue.toLocaleString()}` : "$0",
      iconBg: "#FFF0C8",
      icon: "Revenue",
    },
    {
      title: "Total Orders",
      value: summary ? summary.total_orders.toString() : "0",
      iconBg: "#FDD2D2",
      icon: "Orders",
    },
    {
      title: "Total Products",
      value: summary ? summary.total_products.toString() : "0",
      iconBg: "#F3E8FF",
      icon: "Products",
    },
    {
      title: user?.role === "Admin" ? "Active Users" : "Total Users",
      value: summary ? summary.total_users.toString() : "0",
      iconBg: user?.role === "Admin" ? "#CBD6CE" : "#DCFCE7",
      icon: "Customers",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F2] flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600 animate-pulse">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#FAF8F2] flex items-center justify-center">
        <div className="text-2xl font-semibold text-red-600">
          Error loading dashboard data.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F2]">
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
          {dynamicStatsData.map((item, index) => (
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

        <ChartsSection analytics={dashboardData?.analytics} />

        {user?.role !== "Admin" && (
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
              <div
                onClick={() => navigate("/products")}
                className="w-full h-12 p-2.5 bg-yellow-500 rounded-md inline-flex justify-center items-center gap-2.5 cursor-pointer hover:bg-yellow-600 transition-colors"
              >
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
                Set up discounts, coupon codes, or special offers for your
                products.
              </div>
              <div
                onClick={() => navigate("/promotions")}
                className="w-full h-12 p-2.5 bg-rose-400 rounded-md inline-flex justify-center items-center gap-2.5 cursor-pointer hover:bg-rose-500 transition-colors"
              >
                <div className="text-white text-base font-bold leading-snug">
                  Create Offer
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
