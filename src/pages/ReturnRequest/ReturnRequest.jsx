import { useState } from "react";
import { ChevronDown, Search, ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import {
  useGetReturnRequestListQuery,
  useUpdateReturnRequestMutation,
} from "../../Redux/api/authApi";

const StatusUpdateDropdown = ({ id, currentStatus }) => {
  const [updateStatus] = useUpdateReturnRequestMutation();

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    if (newStatus === currentStatus) return;

    const loadingToast = toast.loading("Updating status...");
    try {
      await updateStatus({
        id,
        data: { status: newStatus },
      }).unwrap();
      toast.success(`Return request ${newStatus} successfully`, {
        id: loadingToast,
      });
    } catch (err) {
      console.error("Failed to update status", err);
      toast.error("Failed to update status", { id: loadingToast });
    }
  };

  const getBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]";
      case "pending":
        return "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]";
      case "rejected":
        return "text-[#DB0000] bg-[#DB0000]/10 border-[#DB0000]";
      default:
        return "text-gray-700 bg-gray-100 border-gray-300";
    }
  };

  return (
    <select
      value={currentStatus}
      onChange={handleStatusChange}
      className={`px-3 py-1 rounded-full text-xs font-semibold border outline-none cursor-pointer appearance-none text-center ${getBadgeColor(currentStatus)}`}
      style={{
        textAlignLast: "center", // For centering text in select
        WebkitAppearance: "none", // Remove default arrow in some browsers to look like a badge
        MozAppearance: "none",
      }}
    >
      <option value="pending" className="text-gray-700 bg-white">
        Pending
      </option>
      <option value="approved" className="text-gray-700 bg-white">
        Approved
      </option>
      <option value="rejected" className="text-gray-700 bg-white">
        Rejected
      </option>
    </select>
  );
};

export const ReturnRequest = () => {
  const {
    data: returnRequests = [],
    isLoading,
    isError,
  } = useGetReturnRequestListQuery();

  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [isOpen, setIsOpen] = useState(false);

  const ITEMS_PER_PAGE = 10;
  const statuses = ["All Status", "Pending", "Approved", "Rejected"];

  // Filter Logic
  const filteredRequests = returnRequests.filter((item) => {
    const matchesStatus =
      selectedStatus === "All Status" ||
      item.status?.toLowerCase() === selectedStatus.toLowerCase();

    const matchesSearch =
      searchTerm === "" ||
      item.order_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customer_name?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const paginatedRequests = filteredRequests.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE,
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#363636] mb-2">
          Return Requests
        </h1>
        <p className="text-xl font-normal text-[#363636]">
          Manage return requests from customers.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex justify-between items-center mb-5 gap-4">
        {/* Filter Selection */}
        <div className="relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-48 h-10 pl-4 pr-3 py-2.5 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-[#BEBBBB] inline-flex justify-between items-center gap-2.5"
          >
            <span className="text-neutral-700 text-sm font-semibold leading-snug">
              {selectedStatus === "All Status"
                ? "Filter by Status"
                : selectedStatus}
            </span>
            <ChevronDown
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
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

        {/* Search */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Order or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none text-gray-700 placeholder-gray-400 w-56"
          />
        </div>
      </div>

      {/* List Title */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-[#363636]">All Requests</h2>
        <div className="text-sm text-gray-600">
          {filteredRequests.length} requests found
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Order ID
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Product
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Customer
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Reason
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Date
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    Loading data...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-red-500 text-sm"
                  >
                    Error loading data.
                  </td>
                </tr>
              ) : paginatedRequests.length > 0 ? (
                paginatedRequests.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                      {item.order_id}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">
                          {item.product_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                      {item.customer_name}
                    </td>
                    <td
                      className="px-6 py-4 text-center text-sm text-gray-600 max-w-xs truncate"
                      title={item.reason}
                    >
                      {item.reason}
                    </td>
                    <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusUpdateDropdown
                        id={item.id}
                        currentStatus={item.status}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No return requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-5">
        <p className="text-black font-medium text-xl">
          Showing{" "}
          {filteredRequests.length === 0
            ? 0
            : (activePage - 1) * ITEMS_PER_PAGE + 1}{" "}
          to {Math.min(activePage * ITEMS_PER_PAGE, filteredRequests.length)} of{" "}
          {filteredRequests.length} entries
        </p>

        <div className="flex items-center" style={{ gap: "10px" }}>
          <button
            className="py-[6px] px-[7px] border border-black rounded-md flex items-center"
            onClick={() =>
              setActivePage((prev) => (prev > 1 ? prev - 1 : prev))
            }
            disabled={activePage === 1}
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`py-[2px] px-[8px] border border-black rounded-md font-semibold ${
                activePage === page ? "bg-[#343F4F] text-white" : "text-black"
              }`}
              style={{ minWidth: "32px" }}
              onClick={() => setActivePage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="py-[6px] px-[7px] border border-black rounded-md flex items-center"
            onClick={() =>
              setActivePage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={activePage === totalPages || totalPages === 0}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 4l4 4-4 4"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
