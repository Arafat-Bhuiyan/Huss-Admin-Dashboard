import { useSelector } from "react-redux";
("use client");

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
  Filler,
);

const ChartsSection = ({ analytics }) => {
  // Get user role from redux
  const { user } = useSelector((state) => state.auth);
  // ✅ Fallback and Dynamic Data
  const salesOverTime = analytics?.sales_over_time || {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    data: [0, 0, 0, 0, 0, 0, 0],
  };

  const categoryDist = analytics?.category_distribution || {
    labels: [],
    data: [],
  };

  const colors = [
    "#FFBA07",
    "#0EA5E9",
    "#10B981",
    "#F43F5E",
    "#8B5CF6",
    "#F59E0B",
    "#3B82F6",
    "#10B981",
    "#EC4899",
    "#6366F1",
    "#F97316",
    "#06B6D4",
    "#22C55E",
    "#D946EF",
    "#A855F7",
  ];

  const [selectedView, setSelectedView] = useState("monthly");
  const [hiddenLabels, setHiddenLabels] = useState([]);

  const toggleLabel = (label) => {
    setHiddenLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  // ✅ Dynamic line chart data based on selectedView
  const lineChartData = {
    labels: salesOverTime.labels,
    datasets: [
      {
        label: "Revenue",
        data: salesOverTime.data,
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
    labels: categoryDist.labels.filter(
      (label) => !hiddenLabels.includes(label),
    ),
    datasets: [
      {
        data: categoryDist.data.filter(
          (_, i) => !hiddenLabels.includes(categoryDist.labels[i]),
        ),
        backgroundColor: categoryDist.labels
          .map((label, i) => ({ label, color: colors[i % colors.length] }))
          .filter((item) => !hiddenLabels.includes(item.label))
          .map((item) => item.color),
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
        display: false,
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
    <div
      className={`grid grid-cols-1${user?.role !== "Admin" ? " lg:grid-cols-2" : ""} gap-8`}
    >
      {/* Line Chart */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-md font-semibold text-gray-900">
            Sales Analytics
          </h3>
          <div className="flex space-x-3 text-sm">
            <button
              onClick={() => setSelectedView("monthly")}
              className={`px-3 py-1 rounded-full ${
                selectedView === "monthly"
                  ? "bg-[#0EA5E9] text-white"
                  : "text-gray-500"
              }`}
            >
              Weekly
            </button>
            {/* <button
              onClick={() => setSelectedView("yearly")}
              className={`px-3 py-1 rounded-full ${
                selectedView === "yearly"
                  ? "bg-[#0EA5E9] text-white"
                  : "text-gray-500"
              }`}
            >
              Monthly
            </button> */}
          </div>
        </div>
        <div className="h-64">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      {/* Pie Chart: only show if not Admin */}
      {user?.role !== "Admin" && (
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="text-md font-semibold text-gray-900 mb-4">
            Top Categories
          </h3>
          <div className="h-64 flex items-center justify-between gap-4">
            <div className="w-[45%] h-full">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
            <div className="w-[55%] grid grid-cols-2 gap-x-2 gap-y-3 overflow-y-auto max-h-full pr-2 custom-scrollbar">
              {categoryDist.labels.map((label, i) => {
                const isHidden = hiddenLabels.includes(label);
                return (
                  <div
                    key={i}
                    onClick={() => toggleLabel(label)}
                    className={`flex items-center gap-2 cursor-pointer transition-opacity duration-200 ${isHidden ? "opacity-30" : "opacity-100"}`}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: colors[i % colors.length] }}
                    />
                    <span
                      className={`text-[11px] font-medium text-gray-600 truncate ${isHidden ? "line-through" : ""}`}
                      title={label}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartsSection;
