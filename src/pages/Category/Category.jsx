import { Folder, SquarePen, Trash2 } from "lucide-react";
import React from "react";

export const Category = () => {
  const categories = [
    {
      title: "Electronics Equipment",
      subtitle: "Premium quality items",
      products: 10,
      status: "active",
    },
    {
      title: "Fashion & Apparel",
      subtitle: "Latest urban trends",
      products: 25,
      status: "active",
    },
    {
      title: "Home & Kitchen",
      subtitle: "Modern living essentials",
      products: 15,
      status: "suspended",
    },
    {
      title: "Beauty & Personal Care",
      subtitle: "Luxury skincare products",
      products: 30,
      status: "active",
    },
    {
      title: "Sports & Outdoors",
      subtitle: "High-performance gear",
      products: 12,
      status: "active",
    },
    {
      title: "Books & Stationery",
      subtitle: "Academic and leisure reads",
      products: 50,
      status: "suspended",
    },
  ];

  return (
    <div className="py-8 flex flex-col gap-5 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <div className="justify-start text-[#363636] text-3xl font-semibold font-inter mb-2">
            Categories Management
          </div>
          <div className="justify-start text-[#363636] text-xl font-normal font-inter">
            Organize your products into categories
          </div>
        </div>
        <button className="bg-[#FFBA07] text-white font-normal text-base px-6 py-2.5 rounded-[10px]">
          + Add Category
        </button>
      </div>

      {/* Cards */}
      <div className="py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-[#F9EFD5] shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#F3E8FF]">
                <Folder color="#FFBA07" className="w-6 h-6" />
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <SquarePen size={16} color="#FFBA07" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Trash2 size={16} color="#E7000B" />
                </button>
              </div>
            </div>
            {/* Title */}
            <h1 className="text-[#101828] font-bold text-xl pt-4">
              {item.title}
            </h1>
            {/* Subtitle */}
            <p className="text-[#4A5565] font-normal text-base pt-1.5 pb-3">
              {item.subtitle}
            </p>
            <div className="w-full border-b border-[#E5E7EB]" />
            <div className="flex justify-between items-center py-2">
              <p className="text-[#4A5565] font-normal text-base">
                {item.products} Products
              </p>
              <div
                className={`text-xs px-2 py-1 rounded-full flex items-center justify-center font-normal ${
                  item.status === "active"
                    ? "text-[#008236] bg-[#DCFCE7]"
                    : "text-[#B42318] bg-[#FEE4E2]"
                }`}
              >
                {item.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
