"use client";

import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";
import { useState } from "react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const ChartsSection = () => {
  // ✅ Dashboard Data
  const [dashboardData] = useState({
    salesAnalytics: [1000, 1800, 1500, 1900, 1700, 3000, 2800],
    topCategories: [
      { label: "Survey Equipment", value: 25, color: "#FFC98F" },
      { label: "Testing & Lab Equipment", value: 20, color: "#EAE2B7" },
      { label: "Gaming Equipment", value: 15, color: "#FF8C8C" },
      { label: "Electronics Equipment", value: 25, color: "#F59E0B" },
      { label: "Accessories Equipment", value: 15, color: "#A9A9A9" },
    ],
  });

  // ✅ Line Chart Data
  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue",
        data: dashboardData.salesAnalytics,
        borderColor: "#FFBA07",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(255, 186, 7, 0.5)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0.5)");
          return gradient;
        },
        pointBackgroundColor: "#FFBA07",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
      },
    ],
  };

  // ✅ Line Chart Options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#111827",
        bodyColor: "#111827",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#F3F4F6" },
        ticks: { color: "#6B7280" },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280" },
      },
    },
  };

  // ✅ Pie Chart Data
  const pieChartData = {
    labels: dashboardData.topCategories.map((item) => item.label),
    datasets: [
      {
        data: dashboardData.topCategories.map((item) => item.value),
        backgroundColor: dashboardData.topCategories.map(
          (item) => item.color
        ),
        borderWidth: 0,
      },
    ],
  };

  // ✅ Pie Chart Options
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          padding: 20,
          boxWidth: 10,
          color: "#374151",
          font: { size: 13 },
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#111827",
        bodyColor: "#111827",
        borderColor: "#E5E7EB",
        borderWidth: 1,
      },
    },
  };

  // ✅ JSX Layout
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Line Chart */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-md font-semibold text-gray-900">Sales Analytics</h3>
          <div className="flex space-x-3 text-sm">
            <button className="bg-[#0EA5E9] text-white px-3 py-1 rounded-full">
              Weekly
            </button>
            <button className="text-gray-500">Monthly</button>
            <button className="text-gray-500">Yearly</button>
          </div>
        </div>
        <div className="h-64">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h3 className="text-md font-semibold text-gray-900 mb-4">
          Top Categories
        </h3>
        <div className="h-64">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
