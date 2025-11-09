import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search, EllipsisVertical } from "lucide-react";
import users from "../../../public/users.json";

export default function UserTable({ onEdit, onDelete }) {
  const [selectedStatus, setSelectedStatus] = useState("All Users");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [userList, setUserList] = useState(users); // Using mock data for now
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [isBulkActionOpen, setIsBulkActionOpen] = useState(false);
  const headerCheckboxRef = useRef();

  const statuses = ["All Users", "Active", "Disabled", "Suspended"];

  const getBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "text-[#22C55E]";
      case "inactive": // Fallback for any remaining data
        return "text-gray-500";
      case "disabled":
        return "text-[#5C3723]";
      case "suspended":
        return "text-[#DB0000]";
      default:
        return "text-gray-700";
    }
  };

  const filteredUsers = userList.filter((user) => {
    const matchesStatus =
      selectedStatus === "All Users" ||
      user.status.toLowerCase() === selectedStatus.toLowerCase();

    const matchesSearch =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase().trim());

    return matchesStatus && matchesSearch;
  });

  useEffect(() => {
    if (headerCheckboxRef.current) {
      const allFilteredIds = filteredUsers.map((u) => u.id);
      const allVisibleSelected = selectedUserIds.filter((id) => allFilteredIds.includes(id)).length;
      headerCheckboxRef.current.checked = allVisibleSelected > 0 && allVisibleSelected === filteredUsers.length;
      headerCheckboxRef.current.indeterminate =
        allVisibleSelected > 0 && allVisibleSelected < filteredUsers.length;
    }
  }, [selectedUserIds, filteredUsers]);

  const handleStatusChange = (userId, newStatus) => {
    setUserList((prevList) =>
      prevList.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    setOpenMenuId(null); // Close menu after selection
  };

  const handleDeleteUser = (user) => {
    if (
      window.confirm(`Are you sure you want to delete user "${user.name}"?`)
    ) {
      setUserList(userList.filter((u) => u.id !== user.id));
      // Also call parent onDelete if provided
      if (onDelete) {
        onDelete(user.id);
      }
    }
    setOpenMenuId(null);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allUserIds = filteredUsers.map((user) => user.id);
      setSelectedUserIds(allUserIds);
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkAction = (action) => {
    const targetIds = selectedUserIds.length > 0 ? selectedUserIds : openMenuId ? [openMenuId] : [];
    if (targetIds.length === 0) return;

    if (action === "Delete") {
      if (window.confirm(`Are you sure you want to delete ${targetIds.length} user(s)?`)) {
        setUserList(userList.filter(user => !targetIds.includes(user.id)));
        setSelectedUserIds([]);
      }
    } else {
      setUserList(userList.map(user =>
        targetIds.includes(user.id) ? { ...user, status: action } : user
      ));
    }
    setIsBulkActionOpen(false);
    setOpenMenuId(null);
  };

  const isAnySelected = selectedUserIds.length > 0;

  return (
    <div className="py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#363636] mb-2">
          User Management
        </h1>
        <p className="text-xl font-normal text-[#363636]">
          Manage your store's users here.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex justify-between items-center mb-5 gap-4">
        {/* Filter Selection - Left Side */}
        <div className="relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-48 h-10 pl-4 pr-3 py-2.5 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-[#BEBBBB] inline-flex justify-between items-center gap-2.5"
          >
            <span className="text-neutral-700 text-sm font-semibold leading-snug">
              {selectedStatus === "All Users"
                ? "Filter by Status"
                : `Filter by ${selectedStatus}`}
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

        {/* Search - Right Side */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none text-gray-700 placeholder-gray-400 w-48"
          />
        </div>
      </div>

      {/* User List Title */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-[#363636]">User List</h2>
        <div>
          {isAnySelected && (
            <span className="text-sm text-gray-600 mr-4">
              {selectedUserIds.length} user(s) selected
            </span>
          )}
          <a
            href="#"
            className="text-[#FFBA07] font-semibold hover:text-yellow-600 text-sm underline"
          >
            See All
          </a>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    ref={headerCheckboxRef}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                  />
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Name
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Email
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Registration Date
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Total Orders
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xl font-medium text-[#363636]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedUserIds.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                      />
                    </td>
                    <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-center text-base font-medium text-gray-700">
                      {user.registrationDate}
                    </td>
                    <td className="px-6 py-4 text-center text-base font-medium text-[#363636]">
                      {user.totalOrders}
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      <span className={`text-base font-medium ${getBadgeColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="relative flex justify-center">
                        <button onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}>
                          <EllipsisVertical className="w-5 h-5" />
                        </button>
                        {openMenuId === user.id && (
                          <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-md shadow-lg border z-10">
                            <ul>
                              <li
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleBulkAction("Active")}
                              >
                                Active
                              </li>
                              <li
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleBulkAction("Disabled")}
                              >
                                Disabled
                              </li>
                              <li
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleBulkAction("Suspended")}
                              >
                                Suspended
                              </li>
                              <li
                                className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleBulkAction("Delete")}
                              >
                                Delete Account
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
